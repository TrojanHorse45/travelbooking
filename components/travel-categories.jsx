"use client"

import { motion } from "framer-motion"
import { Plane, Hotel, Train, Package, Map, Compass, Umbrella, Mountain } from "lucide-react"
import Link from "next/link"

export default function TravelCategories() {
  const categories = [
    {
      name: "Hotels",
      icon: <Hotel className="w-6 h-6" />,
      href: "/hotels",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Flights",
      icon: <Plane className="w-6 h-6" />,
      href: "/flights",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Trains",
      icon: <Train className="w-6 h-6" />,
      href: "/trains",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Packages",
      icon: <Package className="w-6 h-6" />,
      href: "/packages",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Itinerary",
      icon: <Map className="w-6 h-6" />,
      href: "/itinerary",
      color: "from-emerald-500 to-teal-500",
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
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
    >
      {categories.map((category) => (
        <motion.div key={category.name} variants={itemVariants}>
          <Link href={category.href}>
            <div className="relative overflow-hidden transition-all duration-300 rounded-xl group hover:shadow-lg hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-80`}></div>
              <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-cyan-500 to-indigo-500 transition-opacity duration-300 group-hover:opacity-90"></div>
              <div className="relative flex flex-col items-center justify-center p-6 text-white">
                <div className="p-3 mb-3 rounded-full bg-white/20 backdrop-blur-sm">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
