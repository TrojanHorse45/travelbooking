"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

export default function AuthModal({ isOpen, onClose, type = "signin", onSwitchType }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn, signUp } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (type === "signin") {
        await signIn(formData.email, formData.password)
      } else {
        await signUp(formData.name, formData.email, formData.password)
      }
      onClose()
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="relative w-full max-w-md p-6 overflow-hidden rounded-2xl glass-card"
          >
            <Button variant="ghost" size="icon" className="absolute text-white right-4 top-4" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>

            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white">{type === "signin" ? "Welcome Back" : "Create Account"}</h2>
              <p className="mt-2 text-white/70">
                {type === "signin" ? "Sign in to access your account" : "Sign up to start your journey"}
              </p>
            </div>

            {error && <div className="p-3 mb-4 text-sm text-white bg-red-500/20 rounded-lg">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {type === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
              >
                {isLoading ? "Processing..." : type === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  onClick={() => onSwitchType(type === "signin" ? "signup" : "signin")}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {type === "signin" ? "Sign Up" : "Sign In"}
                </Button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
