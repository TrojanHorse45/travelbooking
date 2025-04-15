"use client"

import { motion } from "framer-motion"
import { MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FeaturedDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.9,
      reviews: 1458,
    },
    {
      id: 2,
      name: "Bali, Indonesia",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.8,
      reviews: 1287,
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.7,
      reviews: 1124,
    },
    {
      id: 4,
      name: "Paris, France",
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.6,
      reviews: 986,
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
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {destinations.map((destination) => (
        <motion.div key={destination.id} variants={itemVariants}>
          <Link href={`/destinations/${destination.id}`}>
            <div className="overflow-hidden transition-all duration-300 rounded-xl glass-card hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-white">{destination.rating}</span>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-white/70">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{destination.reviews} reviews</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
