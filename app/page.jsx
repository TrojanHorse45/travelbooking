"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import FeaturedDestinations from "@/components/featured-destinations"
import SearchBar from "@/components/search-bar"
import TravelCategories from "@/components/travel-categories"
import PopularPackages from "@/components/popular-packages"
import Testimonials from "@/components/testimonials"
import AuthModal from "@/components/auth-modal"

export default function Home() {
  const { cartItems } = useCart()
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState("signin") // "signin" or "signup"

  const handleAuthClick = (type) => {
    setAuthType(type)
    setShowAuthModal(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Discover Your Next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Adventure
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-white/80">
              Explore the world with our seamless booking experience. Find the best hotels, flights, and travel
              packages.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
              >
                Explore Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
              >
                View Packages
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="container px-4 mx-auto">
          <SearchBar />
        </div>
      </section>

      {/* Travel Categories */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={itemVariants} className="mb-12 text-3xl font-bold text-center text-white">
              Travel Categories
            </motion.h2>
            <TravelCategories />
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="container px-4 mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={itemVariants} className="mb-12 text-3xl font-bold text-center text-white">
              Featured Destinations
            </motion.h2>
            <FeaturedDestinations />
          </motion.div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={itemVariants} className="mb-12 text-3xl font-bold text-center text-white">
              Popular Packages
            </motion.h2>
            <PopularPackages />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="container px-4 mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={itemVariants} className="mb-12 text-3xl font-bold text-center text-white">
              What Our Travelers Say
            </motion.h2>
            <Testimonials />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 text-center rounded-2xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 backdrop-blur-md border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white">Ready for Your Next Journey?</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-white/80">
              Sign up today and get exclusive access to our best deals and personalized travel recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button
                size="lg"
                onClick={() => handleAuthClick("signup")}
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
              >
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleAuthClick("signin")}
                className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          type={authType}
          onSwitchType={(type) => setAuthType(type)}
        />
      )}
    </div>
  )
}
