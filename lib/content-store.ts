import fs from "fs/promises"
import path from "path"

/**
 * Where admin edits get saved.
 *
 *  - "local"  → writes straight to the /content folder on disk. Used automatically in
 *               development (pnpm dev), so edits show up instantly.
 *  - "github" → commits the file to your GitHub repo through the GitHub API. Used
 *               automatically in production, because a deployed site's disk is read-only.
 *               The commit triggers a redeploy, and the change goes live after it builds.
 *
 * Override with CONTENT_STORAGE=local or CONTENT_STORAGE=github in your env file.
 *
 * GitHub mode needs: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO (and optionally GITHUB_BRANCH,
 * default "main"). The token needs read/write access to "Contents" on that repo.
 */

const CONTENT_DIR = path.join(process.cwd(), "content")

type StorageMode = "local" | "github"

export function getStorageMode(): StorageMode {
  const explicit = process.env.CONTENT_STORAGE
  if (explicit === "local" || explicit === "github") return explicit
  return process.env.NODE_ENV === "production" ? "github" : "local"
}

/** Paths are always relative to /content, e.g. "services/web-development.json". */
function assertSafePath(relativePath: string) {
  const ok =
    /^[a-z0-9][a-z0-9/_-]*\.json$/i.test(relativePath) &&
    !relativePath.includes("..") &&
    !relativePath.includes("//")
  if (!ok) throw new Error(`Unsafe content path: ${relativePath}`)
}

// ---------- GitHub ----------

function githubEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `GitHub storage is active but ${name} is not set. ` +
        `Set GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO, or set CONTENT_STORAGE=local.`
    )
  }
  return value
}

function githubBranch() {
  return process.env.GITHUB_BRANCH || "main"
}

function githubContentsUrl(relativePath: string) {
  const owner = githubEnv("GITHUB_OWNER")
  const repo = githubEnv("GITHUB_REPO")
  return `https://api.github.com/repos/${owner}/${repo}/contents/content/${relativePath}`
}

async function githubFetch(url: string, init: RequestInit = {}) {
  return fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${githubEnv("GITHUB_TOKEN")}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  })
}

async function githubGetSha(relativePath: string): Promise<string | null> {
  const res = await githubFetch(`${githubContentsUrl(relativePath)}?ref=${githubBranch()}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub error ${res.status}: ${await res.text()}`)
  const data = (await res.json()) as { sha?: string }
  return data.sha ?? null
}

// ---------- Public API ----------

export async function contentFileExists(relativePath: string): Promise<boolean> {
  assertSafePath(relativePath)
  if (getStorageMode() === "github") {
    return (await githubGetSha(relativePath)) !== null
  }
  try {
    await fs.access(path.join(CONTENT_DIR, relativePath))
    return true
  } catch {
    return false
  }
}

export async function saveContentJson(
  relativePath: string,
  data: unknown,
  commitMessage: string
): Promise<void> {
  assertSafePath(relativePath)
  const body = JSON.stringify(data, null, 2) + "\n"

  if (getStorageMode() === "local") {
    const fullPath = path.join(CONTENT_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, body, "utf-8")
    return
  }

  const sha = await githubGetSha(relativePath)
  const res = await githubFetch(githubContentsUrl(relativePath), {
    method: "PUT",
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(body, "utf-8").toString("base64"),
      branch: githubBranch(),
      ...(sha ? { sha } : {}),
    }),
  })
  if (!res.ok) throw new Error(`GitHub error ${res.status}: ${await res.text()}`)
}

export async function deleteContentFile(
  relativePath: string,
  commitMessage: string
): Promise<void> {
  assertSafePath(relativePath)

  if (getStorageMode() === "local") {
    await fs.rm(path.join(CONTENT_DIR, relativePath), { force: true })
    return
  }

  const sha = await githubGetSha(relativePath)
  if (!sha) return
  const res = await githubFetch(githubContentsUrl(relativePath), {
    method: "DELETE",
    body: JSON.stringify({ message: commitMessage, sha, branch: githubBranch() }),
  })
  if (!res.ok) throw new Error(`GitHub error ${res.status}: ${await res.text()}`)
}