"use client"

import { motion } from "framer-motion"
import { Clock, Users, Calendar, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export default function PopularPackages() {
  const { addToCart } = useCart()

  const packages = [
    {
      id: 1,
      name: "European Adventure",
      image: "https://source.unsplash.com/600x400/?europe,travel",
      duration: "10 days",
      people: "2-4",
      date: "All year",
      location: "Multiple Countries",
      price: 1299,
      rating: 4.8,
      reviews: 245,
      discount: true,
      oldPrice: 1499,
    },
    {
      id: 2,
      name: "Asian Explorer",
      image: "https://source.unsplash.com/600x400/?asia,temples",
      duration: "14 days",  
      people: "2-6",
      date: "Sep - Mar",
      location: "Thailand, Vietnam, Cambodia",
      price: 1599,
      rating: 4.9,
      reviews: 189,
      discount: false,
    },
    {
      id: 3,
      name: "African Safari",
      image: "https://source.unsplash.com/600x400/?safari,africa",
      duration: "7 days",
      people: "2-8",
      date: "Jun - Oct",
      location: "Kenya, Tanzania",
      price: 2199,
      rating: 4.7,
      reviews: 156,
      discount: true,
      oldPrice: 2499,
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

  const handleAddToCart = (pkg) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      type: "package",
    })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-3"
    >
      {packages.map((pkg) => (
        <motion.div key={pkg.id} variants={itemVariants}>
          <div className="overflow-hidden transition-all duration-300 rounded-xl glass-card hover:shadow-lg">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              {pkg.discount && (
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
                  Sale
                </Badge>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-white">{pkg.rating}</span>
                </div>
              </div>

              <div className="flex items-center mt-2 text-white/70">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{pkg.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/10">
                  <Clock className="w-4 h-4 mb-1 text-cyan-400" />
                  <span className="text-xs text-white">{pkg.duration}</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/10">
                  <Users className="w-4 h-4 mb-1 text-cyan-400" />
                  <span className="text-xs text-white">{pkg.people}</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/10">
                  <Calendar className="w-4 h-4 mb-1 text-cyan-400" />
                  <span className="text-xs text-white">{pkg.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  {pkg.discount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">${pkg.price}</span>
                      <span className="text-sm line-through text-white/50">${pkg.oldPrice}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-white">${pkg.price}</span>
                  )}
                  <span className="text-xs text-white/70"> / per person</span>
                </div>
                <Button
                  onClick={() => handleAddToCart(pkg)}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
