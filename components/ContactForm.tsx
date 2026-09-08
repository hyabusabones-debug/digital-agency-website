"use client"

import React, { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email"
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-8 animate-bounce-slow">
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-3xl font-bold text-foreground mb-4 tracking-tight">Message Received!</h3>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-10">
          Your inquiry has been successfully sent. Our strategy team will review your details and get back to you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false)
            setFormState({
              name: "",
              email: "",
              company: "",
              service: "",
              budget: "",
              message: "",
            })
          }}
          className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl transition-all"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-3">
          <label htmlFor="name" className="text-sm font-bold text-foreground/70 uppercase tracking-widest ml-1">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className={`w-full px-6 py-4 rounded-2xl border bg-muted/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
              errors.name ? "border-red-500/50" : "border-border/50 hover:border-primary/30"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold mt-1 ml-1">
               <AlertCircle className="w-3 h-3" />
               {errors.name}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label htmlFor="email" className="text-sm font-bold text-foreground/70 uppercase tracking-widest ml-1">
            Work Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className={`w-full px-6 py-4 rounded-2xl border bg-muted/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
              errors.email ? "border-red-500/50" : "border-border/50 hover:border-primary/30"
            }`}
            placeholder="john@company.com"
          />
          {errors.email && (
             <div className="flex items-center gap-2 text-red-500 text-xs font-bold mt-1 ml-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
             </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Company */}
        <div className="space-y-3">
          <label htmlFor="company" className="text-sm font-bold text-foreground/70 uppercase tracking-widest ml-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-2xl border border-border/50 bg-muted/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/30 transition-all"
            placeholder="Acme Inc."
          />
        </div>

        {/* Service */}
        <div className="space-y-3">
          <label htmlFor="service" className="text-sm font-bold text-foreground/70 uppercase tracking-widest ml-1">
            Interested In
          </label>
          <div className="relative">
             <select
               id="service"
               name="service"
               value={formState.service}
               onChange={handleChange}
               className="w-full px-6 py-4 rounded-2xl border border-border/50 bg-muted/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 hover:border-primary/30 transition-all appearance-none"
             >
               <option value="">Select a service</option>
               <option value="web-development">Web Development</option>
               <option value="digital-marketing">Digital Marketing</option>
               <option value="ui-ux-design">UI/UX Design</option>
               <option value="ecommerce">E-Commerce Solutions</option>
               <option value="mobile-app">Mobile App Development</option>
               <option value="other">Other</option>
             </select>
             <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <Send className="w-4 h-4 rotate-90" />
             </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-3">
        <label htmlFor="message" className="text-sm font-bold text-foreground/70 uppercase tracking-widest ml-1">
          Project Details <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-6 py-4 rounded-2xl border bg-muted/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
            errors.message ? "border-red-500/50" : "border-border/50 hover:border-primary/30"
          }`}
          placeholder="Tell us about your goals, timeline, and any specific requirements..."
        />
        {errors.message && (
           <div className="flex items-center gap-2 text-red-500 text-xs font-bold mt-1 ml-1">
              <AlertCircle className="w-3 h-3" />
              {errors.message}
           </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-3">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing Strategy...
          </span>
        ) : (
          <span className="flex items-center gap-3">
            <Send className="w-5 h-5" />
            Send Inquiry
          </span>
        )}
      </Button>
      
      <p className="text-center text-xs text-muted-foreground font-medium">
         By submitting this form, you agree to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
      </p>
    </form>
  )
}
