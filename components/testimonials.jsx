"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Travel Enthusiast",
      content:
        "TravelVerse made planning my European vacation so easy! The interface is beautiful and intuitive. I was able to book everything in one place and save money with their package deals.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Business Traveler",
      content:
        "As someone who travels frequently for work, I appreciate how streamlined the booking process is. The itinerary feature helps me keep track of all my trips in one place.",
      rating: 4,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Family Vacationer",
      content:
        "We booked our family trip to Bali through TravelVerse and couldn't be happier! The site made it easy to find family-friendly accommodations and activities.",
      rating: 5,
    },
  ]

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-3"
    >
      {testimonials.map((testimonial) => (
        <motion.div key={testimonial.id} variants={itemVariants}>
          <div className="relative h-full p-6 overflow-hidden transition-all duration-300 rounded-xl glass-card hover:shadow-lg">
            <Quote className="absolute w-24 h-24 -top-6 -right-6 text-white/5" />
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <p className="text-sm text-white/70">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}`}
                />
              ))}
            </div>
            <p className="text-white/80">{testimonial.content}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
