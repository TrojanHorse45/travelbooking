"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Star, MapPin, Wifi, Car, Coffee, Tv } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/hooks/use-cart"

export default function HotelsPage() {
  const { addToCart } = useCart()
  const [priceRange, setPriceRange] = useState([50, 500])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    tv: false,
  })

  const hotels = [
    {
      id: 1,
      name: "Luxury Ocean Resort",
      location: "Maldives",
      price: 299,
      rating: 4.9,
      reviews: 245,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["wifi", "parking", "breakfast", "tv"],
    },
    {
      id: 2,
      name: "Mountain View Lodge",
      location: "Switzerland",
      price: 199,
      rating: 4.7,
      reviews: 189,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["wifi", "parking", "tv"],
    },
    {
      id: 3,
      name: "Urban Boutique Hotel",
      location: "New York",
      price: 249,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["wifi", "breakfast"],
    },
    {
      id: 4,
      name: "Seaside Retreat",
      location: "Greece",
      price: 179,
      rating: 4.8,
      reviews: 210,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["wifi", "parking", "breakfast", "tv"],
    },
    {
      id: 5,
      name: "Historic City Center Hotel",
      location: "Prague",
      price: 159,
      rating: 4.5,
      reviews: 178,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["wifi", "breakfast"],
    },
    {
      id: 6,
      name: "Desert Oasis Resort",
      location: "Dubai",
      price: 329,
      rating: 4.9,
      reviews: 267,
      image: "/placeholder.svg?height=400&width=600",
      amenities: ["wifi", "parking", "breakfast", "tv"],
    },
  ]

  const handleFilterChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const filteredHotels = hotels.filter((hotel) => {
    // Filter by price range
    if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by amenities
    for (const [key, value] of Object.entries(filters)) {
      if (value && !hotel.amenities.includes(key)) {
        return false
      }
    }

    return true
  })

  const handleAddToCart = (hotel) => {
    addToCart({
      id: hotel.id,
      name: hotel.name,
      price: hotel.price,
      image: hotel.image,
      type: "hotel",
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
          <h1 className="text-3xl font-bold text-white md:text-4xl">Find Your Perfect Stay</h1>
          <p className="mt-2 text-white/70">Discover amazing hotels and accommodations around the world</p>
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
                  placeholder="Hotel name or location"
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
                min={50}
                max={500}
                step={10}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-white">Amenities</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" checked={filters.wifi} onCheckedChange={() => handleFilterChange("wifi")} />
                  <label htmlFor="wifi" className="text-sm font-medium text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-cyan-400" />
                      WiFi
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={filters.parking}
                    onCheckedChange={() => handleFilterChange("parking")}
                  />
                  <label htmlFor="parking" className="text-sm font-medium text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-cyan-400" />
                      Parking
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="breakfast"
                    checked={filters.breakfast}
                    onCheckedChange={() => handleFilterChange("breakfast")}
                  />
                  <label htmlFor="breakfast" className="text-sm font-medium text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-cyan-400" />
                      Breakfast
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tv" checked={filters.tv} onCheckedChange={() => handleFilterChange("tv")} />
                  <label htmlFor="tv" className="text-sm font-medium text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Tv className="w-4 h-4 text-cyan-400" />
                      TV
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setPriceRange([50, 500])
                setSearchQuery("")
                setFilters({
                  wifi: false,
                  parking: false,
                  breakfast: false,
                  tv: false,
                })
              }}
              variant="outline"
              className="w-full text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
            >
              Reset Filters
            </Button>
          </motion.div>

          {/* Hotel Listings */}
          <div className="lg:col-span-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <motion.div key={hotel.id} variants={itemVariants}>
                    <div className="overflow-hidden transition-all duration-300 rounded-xl glass-card hover:shadow-lg">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={hotel.image || "/placeholder.svg"}
                          alt={hotel.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-white">{hotel.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-white">{hotel.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center mt-2 text-white/70">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {hotel.amenities.includes("wifi") && (
                            <div className="p-1 rounded-md bg-white/10">
                              <Wifi className="w-4 h-4 text-cyan-400" />
                            </div>
                          )}
                          {hotel.amenities.includes("parking") && (
                            <div className="p-1 rounded-md bg-white/10">
                              <Car className="w-4 h-4 text-cyan-400" />
                            </div>
                          )}
                          {hotel.amenities.includes("breakfast") && (
                            <div className="p-1 rounded-md bg-white/10">
                              <Coffee className="w-4 h-4 text-cyan-400" />
                            </div>
                          )}
                          {hotel.amenities.includes("tv") && (
                            <div className="p-1 rounded-md bg-white/10">
                              <Tv className="w-4 h-4 text-cyan-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-lg font-bold text-white">${hotel.price}</span>
                            <span className="text-xs text-white/70"> / night</span>
                          </div>
                          <Button
                            onClick={() => handleAddToCart(hotel)}
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
                  <h3 className="text-xl font-semibold text-white">No hotels found</h3>
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
