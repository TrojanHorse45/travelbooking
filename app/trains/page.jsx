"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Train, Clock, Calendar, Wifi, Coffee } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export default function TrainsPage() {
  const { addToCart } = useCart()
  const [priceRange, setPriceRange] = useState([20, 300])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    express: false,
    wifi: false,
    food: false,
    morning: false,
  })

  const trains = [
    {
      id: 1,
      name: "Express Rail",
      from: "Paris",
      to: "Lyon",
      departureTime: "08:15 AM",
      arrivalTime: "10:30 AM",
      duration: "2h 15m",
      price: 79,
      date: "Oct 15, 2023",
      express: true,
      wifi: true,
      food: true,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 2,
      name: "Central Line",
      from: "London",
      to: "Manchester",
      departureTime: "09:45 AM",
      arrivalTime: "12:15 PM",
      duration: "2h 30m",
      price: 65,
      date: "Oct 18, 2023",
      express: true,
      wifi: true,
      food: false,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 3,
      name: "Euro Transit",
      from: "Berlin",
      to: "Munich",
      departureTime: "11:30 AM",
      arrivalTime: "3:45 PM",
      duration: "4h 15m",
      price: 89,
      date: "Oct 20, 2023",
      express: false,
      wifi: true,
      food: true,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 4,
      name: "Alpine Express",
      from: "Zurich",
      to: "Milan",
      departureTime: "07:20 AM",
      arrivalTime: "10:50 AM",
      duration: "3h 30m",
      price: 95,
      date: "Oct 22, 2023",
      express: true,
      wifi: true,
      food: true,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 5,
      name: "Coastal Route",
      from: "Barcelona",
      to: "Valencia",
      departureTime: "2:15 PM",
      arrivalTime: "4:45 PM",
      duration: "2h 30m",
      price: 45,
      date: "Oct 25, 2023",
      express: false,
      wifi: false,
      food: true,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 6,
      name: "Nordic Rail",
      from: "Stockholm",
      to: "Gothenburg",
      departureTime: "10:00 AM",
      arrivalTime: "1:30 PM",
      duration: "3h 30m",
      price: 75,
      date: "Oct 28, 2023",
      express: true,
      wifi: true,
      food: false,
      image: "/placeholder.svg?height=80&width=200",
    },
  ]

  const handleFilterChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const filteredTrains = trains.filter((train) => {
    // Filter by price range
    if (train.price < priceRange[0] || train.price > priceRange[1]) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !train.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !train.from.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !train.to.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by express
    if (filters.express && !train.express) {
      return false
    }

    // Filter by wifi
    if (filters.wifi && !train.wifi) {
      return false
    }

    // Filter by food
    if (filters.food && !train.food) {
      return false
    }

    // Filter by morning departures
    const hour = Number.parseInt(train.departureTime.split(":")[0])
    if (filters.morning && !(hour >= 5 && hour < 12)) {
      return false
    }

    return true
  })

  const handleAddToCart = (train) => {
    addToCart({
      id: train.id,
      name: `Train: ${train.from} to ${train.to}`,
      price: train.price,
      image: train.image,
      type: "train",
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
          <h1 className="text-3xl font-bold text-white md:text-4xl">Find Your Train</h1>
          <p className="mt-2 text-white/70">Discover comfortable train journeys across Europe</p>
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
                  placeholder="Train name, origin or destination"
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
                min={20}
                max={300}
                step={5}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-white">Train Options</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="express"
                    checked={filters.express}
                    onCheckedChange={() => handleFilterChange("express")}
                  />
                  <label htmlFor="express" className="text-sm font-medium text-white cursor-pointer">
                    Express trains only
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" checked={filters.wifi} onCheckedChange={() => handleFilterChange("wifi")} />
                  <label htmlFor="wifi" className="text-sm font-medium text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-cyan-400" />
                      WiFi available
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="food" checked={filters.food} onCheckedChange={() => handleFilterChange("food")} />
                  <label htmlFor="food" className="text-sm font-medium text-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-cyan-400" />
                      Food service
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="morning"
                    checked={filters.morning}
                    onCheckedChange={() => handleFilterChange("morning")}
                  />
                  <label htmlFor="morning" className="text-sm font-medium text-white cursor-pointer">
                    Morning departures
                  </label>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setPriceRange([20, 300])
                setSearchQuery("")
                setFilters({
                  express: false,
                  wifi: false,
                  food: false,
                  morning: false,
                })
              }}
              variant="outline"
              className="w-full text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
            >
              Reset Filters
            </Button>
          </motion.div>

          {/* Train Listings */}
          <div className="lg:col-span-3">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              {filteredTrains.length > 0 ? (
                filteredTrains.map((train) => (
                  <motion.div key={train.id} variants={itemVariants}>
                    <div className="overflow-hidden transition-all duration-300 rounded-xl glass-card hover:shadow-lg">
                      <div className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 overflow-hidden rounded-lg shrink-0">
                              <Image
                                src={train.image || "/placeholder.svg"}
                                alt={train.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{train.name}</h3>
                              <div className="flex items-center mt-1 text-white/70">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span className="text-sm">{train.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="text-lg font-medium text-white">{train.departureTime}</div>
                            <div className="text-sm text-white/70">{train.from}</div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                              <div className="w-20 h-px bg-white/30"></div>
                              <Train className="w-4 h-4 text-white" />
                              <div className="w-20 h-px bg-white/30"></div>
                              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                            </div>
                            <div className="flex items-center mt-1 text-white/70">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm">{train.duration}</span>
                            </div>
                            {train.express && (
                              <Badge className="mt-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white border-0">
                                Express
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="text-lg font-medium text-white">{train.arrivalTime}</div>
                            <div className="text-sm text-white/70">{train.to}</div>
                          </div>

                          <div className="flex flex-col items-end">
                            <div className="text-2xl font-bold text-white">${train.price}</div>
                            <div className="text-xs text-white/70 mb-2">per person</div>
                            <Button
                              onClick={() => handleAddToCart(train)}
                              className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                          {train.wifi && (
                            <div className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-white/10">
                              <Wifi className="w-3 h-3 text-cyan-400" />
                              <span className="text-white">WiFi</span>
                            </div>
                          )}
                          {train.food && (
                            <div className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-white/10">
                              <Coffee className="w-3 h-3 text-cyan-400" />
                              <span className="text-white">Food Service</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center rounded-xl glass-card">
                  <h3 className="text-xl font-semibold text-white">No trains found</h3>
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
