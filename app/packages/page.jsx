"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Calendar, Users, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export default function PackagesPage() {
  const { addToCart } = useCart()
  const [priceRange, setPriceRange] = useState([500, 3000])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    family: false,
    adventure: false,
    luxury: false,
    beach: false,
  })

  const packages = [
    {
      id: 1,
      name: "European Adventure",
      location: "Multiple Countries",
      description: "Explore the best of Europe with this 14-day package covering 5 countries.",
      price: 2499,
      duration: "14 days",
      groupSize: "Up to 12",
      rating: 4.8,
      reviews: 245,
      tags: ["adventure", "cultural"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      name: "Asian Explorer",
      location: "Thailand, Vietnam, Cambodia",
      description: "Discover the wonders of Asia with this 10-day journey through 3 countries.",
      price: 1899,
      duration: "10 days",
      groupSize: "Up to 10",
      rating: 4.9,
      reviews: 189,
      tags: ["adventure", "cultural"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      name: "Caribbean Family Getaway",
      location: "Jamaica",
      description: "Relax on pristine beaches and explore tropical islands for 7 unforgettable days.",
      price: 1299,
      duration: "7 days",
      groupSize: "Up to 8",
      rating: 4.7,
      reviews: 156,
      tags: ["family", "beach", "luxury"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      name: "African Safari",
      location: "Kenya, Tanzania",
      description: "Experience the wildlife of Africa with this premium safari package.",
      price: 2799,
      duration: "10 days",
      groupSize: "Up to 8",
      rating: 4.9,
      reviews: 210,
      tags: ["adventure", "luxury"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 5,
      name: "Mediterranean Cruise",
      location: "Italy, Greece, Croatia",
      description: "Sail the Mediterranean Sea and visit beautiful coastal cities.",
      price: 1599,
      duration: "8 days",
      groupSize: "Up to 20",
      rating: 4.6,
      reviews: 178,
      tags: ["family", "luxury", "beach"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 6,
      name: "South American Expedition",
      location: "Peru, Bolivia, Chile",
      description: "Explore ancient ruins and breathtaking landscapes in South America.",
      price: 2199,
      duration: "12 days",
      groupSize: "Up to 10",
      rating: 4.8,
      reviews: 132,
      tags: ["adventure", "cultural"],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const handleFilterChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const filteredPackages = packages.filter((pkg) => {
    // Filter by price range
    if (pkg.price < priceRange[0] || pkg.price > priceRange[1]) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by package type
    if (filters.family && !pkg.tags.includes("family")) {
      return false
    }
    if (filters.adventure && !pkg.tags.includes("adventure")) {
      return false
    }
    if (filters.luxury && !pkg.tags.includes("luxury")) {
      return false
    }
    if (filters.beach && !pkg.tags.includes("beach")) {
      return false
    }

    return true
  })

  const handleAddToCart = (pkg) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      type: "package",
    })
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
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="container px-4 py-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-white md:text-4xl">Travel Packages</h1>
          <p className="mt-2 text-white/70">All-inclusive packages for hassle-free travel experiences</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-xl glass-card"
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-semibold text-white">Filters</h2>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-white">Search</label>
              <div className="relative">
                <Search className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                <Input
                  type="text"
                  placeholder="Package name or destination"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-white">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                defaultValue={priceRange}
                min={500}
                max={3000}
                step={100}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-white">Package Type</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="family" checked={filters.family} onCheckedChange={() => handleFilterChange("family")} />
                  <label htmlFor="family" className="text-sm font-medium text-white cursor-pointer">
                    Family-friendly
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="adventure"
                    checked={filters.adventure}
                    onCheckedChange={() => handleFilterChange("adventure")}
                  />
                  <label htmlFor="adventure" className="text-sm font-medium text-white cursor-pointer">
                    Adventure
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="luxury" checked={filters.luxury} onCheckedChange={() => handleFilterChange("luxury")} />
                  <label htmlFor="luxury" className="text-sm font-medium text-white cursor-pointer">
                    Luxury
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="beach" checked={filters.beach} onCheckedChange={() => handleFilterChange("beach")} />
                  <label htmlFor="beach" className="text-sm font-medium text-white cursor-pointer">
                    Beach & Coastal
                  </label>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setPriceRange([500, 3000])
                setSearchQuery("")
                setFilters({
                  family: false,
                  adventure: false,
                  luxury: false,
                  beach: false,
                })
              }}
              variant="outline"
              className="w-full text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
            >
              Reset Filters
            </Button>
          </motion.div>

          {/* Package Listings */}
          <div className="lg:col-span-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <motion.div key={pkg.id} variants={itemVariants}>
                    <div className="overflow-hidden transition-all duration-300 rounded-xl glass-card hover:shadow-lg h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-4">
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

                        <p className="mt-3 text-sm text-white/70">{pkg.description}</p>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="flex items-center text-sm text-white/70">
                            <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-white/70">
                            <Users className="w-4 h-4 mr-2 text-cyan-400" />
                            <span>{pkg.groupSize}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {pkg.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-white/10 text-white">
                              {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4">
                          <div>
                            <div className="text-2xl font-bold text-white">${pkg.price}</div>
                            <div className="text-xs text-white/70">per person</div>
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
                ))
              ) : (
                <div className="col-span-3 p-8 text-center rounded-xl glass-card">
                  <h3 className="text-xl font-semibold text-white">No packages found</h3>
                  <p className="mt-2 text-white/70">Try adjusting your filters to find more options</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
