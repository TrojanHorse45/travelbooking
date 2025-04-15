"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plane, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export default function FlightsPage() {
  const { addToCart } = useCart()
  const [priceRange, setPriceRange] = useState([100, 1500])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    nonstop: false,
    morning: false,
    evening: false,
    refundable: false,
  })

  const flights = [
    {
      id: 1,
      airline: "Sky Airways",
      from: "New York",
      to: "London",
      departureTime: "08:30 AM",
      arrivalTime: "9:45 PM",
      duration: "7h 15m",
      price: 549,
      date: "Oct 15, 2023",
      nonstop: true,
      refundable: true,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 2,
      airline: "Global Airlines",
      from: "Los Angeles",
      to: "Tokyo",
      departureTime: "11:20 AM",
      arrivalTime: "4:30 PM",
      duration: "12h 10m",
      price: 899,
      date: "Oct 18, 2023",
      nonstop: false,
      refundable: false,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 3,
      airline: "Ocean Pacific",
      from: "San Francisco",
      to: "Sydney",
      departureTime: "9:15 PM",
      arrivalTime: "6:30 AM",
      duration: "14h 15m",
      price: 1099,
      date: "Oct 20, 2023",
      nonstop: true,
      refundable: true,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 4,
      airline: "Euro Express",
      from: "Chicago",
      to: "Paris",
      departureTime: "2:45 PM",
      arrivalTime: "7:30 AM",
      duration: "8h 45m",
      price: 649,
      date: "Oct 22, 2023",
      nonstop: false,
      refundable: true,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 5,
      airline: "Asia Connect",
      from: "Seattle",
      to: "Bangkok",
      departureTime: "1:30 AM",
      arrivalTime: "5:45 PM",
      duration: "16h 15m",
      price: 799,
      date: "Oct 25, 2023",
      nonstop: false,
      refundable: false,
      image: "/placeholder.svg?height=80&width=200",
    },
    {
      id: 6,
      airline: "Atlantic Wings",
      from: "Boston",
      to: "Madrid",
      departureTime: "7:20 PM",
      arrivalTime: "10:05 AM",
      duration: "7h 45m",
      price: 579,
      date: "Oct 28, 2023",
      nonstop: true,
      refundable: true,
      image: "/placeholder.svg?height=80&width=200",
    },
  ]

  const handleFilterChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const filteredFlights = flights.filter((flight) => {
    // Filter by price range
    if (flight.price < priceRange[0] || flight.price > priceRange[1]) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !flight.airline.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !flight.from.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !flight.to.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by nonstop
    if (filters.nonstop && !flight.nonstop) {
      return false
    }

    // Filter by refundable
    if (filters.refundable && !flight.refundable) {
      return false
    }

    // Filter by time of day
    const hour = Number.parseInt(flight.departureTime.split(":")[0])
    if (filters.morning && !(hour >= 5 && hour < 12)) {
      return false
    }
    if (filters.evening && !(hour >= 17 || hour < 5)) {
      return false
    }

    return true
  })

  const handleAddToCart = (flight) => {
    addToCart({
      id: flight.id,
      name: `Flight: ${flight.from} to ${flight.to}`,
      price: flight.price,
      image: flight.image,
      type: "flight",
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
          <h1 className="text-3xl font-bold text-white md:text-4xl">Find Your Flight</h1>
          <p className="mt-2 text-white/70">Discover the best flight deals to your destination</p>
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
                  placeholder="Airline, origin or destination"
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
                min={100}
                max={1500}
                step={50}
                onValueChange={setPriceRange}
                className="mt-2"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-white">Flight Options</label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nonstop"
                    checked={filters.nonstop}
                    onCheckedChange={() => handleFilterChange("nonstop")}
                  />
                  <label htmlFor="nonstop" className="text-sm font-medium text-white cursor-pointer">
                    Non-stop flights only
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="evening"
                    checked={filters.evening}
                    onCheckedChange={() => handleFilterChange("evening")}
                  />
                  <label htmlFor="evening" className="text-sm font-medium text-white cursor-pointer">
                    Evening departures
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="refundable"
                    checked={filters.refundable}
                    onCheckedChange={() => handleFilterChange("refundable")}
                  />
                  <label htmlFor="refundable" className="text-sm font-medium text-white cursor-pointer">
                    Refundable tickets
                  </label>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setPriceRange([100, 1500])
                setSearchQuery("")
                setFilters({
                  nonstop: false,
                  morning: false,
                  evening: false,
                  refundable: false,
                })
              }}
              variant="outline"
              className="w-full text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
            >
              Reset Filters
            </Button>
          </motion.div>

          {/* Flight Listings */}
          <div className="lg:col-span-3">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              {filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                  <motion.div key={flight.id} variants={itemVariants}>
                    <div className="overflow-hidden transition-all duration-300 rounded-xl glass-card hover:shadow-lg">
                      <div className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 overflow-hidden rounded-lg shrink-0">
                              <Image
                                src={flight.image || "/placeholder.svg"}
                                alt={flight.airline}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{flight.airline}</h3>
                              <div className="flex items-center mt-1 text-white/70">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span className="text-sm">{flight.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="text-lg font-medium text-white">{flight.departureTime}</div>
                            <div className="text-sm text-white/70">{flight.from}</div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                              <div className="w-20 h-px bg-white/30"></div>
                              <Plane className="w-4 h-4 text-white" />
                              <div className="w-20 h-px bg-white/30"></div>
                              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                            </div>
                            <div className="flex items-center mt-1 text-white/70">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm">{flight.duration}</span>
                            </div>
                            {flight.nonstop ? (
                              <Badge className="mt-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white border-0">
                                Non-stop
                              </Badge>
                            ) : (
                              <span className="mt-1 text-xs text-white/50">1 stop</span>
                            )}
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="text-lg font-medium text-white">{flight.arrivalTime}</div>
                            <div className="text-sm text-white/70">{flight.to}</div>
                          </div>

                          <div className="flex flex-col items-end">
                            <div className="text-2xl font-bold text-white">${flight.price}</div>
                            <div className="text-xs text-white/70 mb-2">per person</div>
                            <Button
                              onClick={() => handleAddToCart(flight)}
                              className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center rounded-xl glass-card">
                  <h3 className="text-xl font-semibold text-white">No flights found</h3>
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
