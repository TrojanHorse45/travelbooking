"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, Hotel, Train, Package, Map, ShoppingCart, User, Menu, X, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { Badge } from "@/components/ui/badge"
import AuthModal from "@/components/auth-modal"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState("signin")
  const { cartItems } = useCart()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAuthClick = (type) => {
    setAuthType(type)
    setShowAuthModal(true)
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { name: "Hotels", href: "/hotels", icon: <Hotel className="w-4 h-4" /> },
    { name: "Flights", href: "/flights", icon: <Plane className="w-4 h-4" /> },
    { name: "Trains", href: "/trains", icon: <Train className="w-4 h-4" /> },
    { name: "Packages", href: "/packages", icon: <Package className="w-4 h-4" /> },
    { name: "Itinerary", href: "/itinerary", icon: <Map className="w-4 h-4" /> },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/10 backdrop-blur-lg border-b border-white/10 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500">
              <Plane className="absolute w-5 h-5 transform -rotate-45 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xl font-bold text-white">TravelVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-white/80 transition-all hover:text-white group"
              >
                <span className="flex items-center gap-1.5">
                  {link.icon}
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-white">
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-indigo-500 text-white">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="ghost" className="text-white">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={signOut}
                  className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => handleAuthClick("signin")} className="text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  onClick={() => handleAuthClick("signup")}
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-16 bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-indigo-800/95 backdrop-blur-lg md:hidden"
          >
            <div className="container flex flex-col h-full px-4 py-8 mx-auto">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white rounded-lg bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/cart"
                  className="flex items-center justify-between px-4 py-3 text-lg font-medium text-white rounded-lg bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                  </div>
                  {cartItems.length > 0 && (
                    <Badge className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white">
                      {cartItems.length}
                    </Badge>
                  )}
                </Link>

                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-white rounded-lg bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Profile
                    </Link>
                    <Button
                      onClick={() => {
                        signOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="mt-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 mt-2">
                    <Button
                      onClick={() => handleAuthClick("signin")}
                      variant="outline"
                      className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button
                      onClick={() => handleAuthClick("signup")}
                      className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          type={authType}
          onSwitchType={(type) => setAuthType(type)}
        />
      )}
    </>
  )
}
