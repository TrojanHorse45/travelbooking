"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SearchBar() {
  const [date, setDate] = useState(null)

  const searchButtonClasses =
    "bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0 px-4 py-2 h-[42px] w-full flex items-center justify-center"

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-4 rounded-xl glass-card"
    >
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/10">
          <TabsTrigger value="hotels" className="data-[state=active]:bg-white/20">Hotels</TabsTrigger>
          <TabsTrigger value="flights" className="data-[state=active]:bg-white/20">Flights</TabsTrigger>
          <TabsTrigger value="trains" className="data-[state=active]:bg-white/20">Trains</TabsTrigger>
        </TabsList>

        {/* Shared UI Section */}
        {["hotels", "flights", "trains"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="grid gap-4 md:grid-cols-4">
              {/* From / Destination */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  {tab === "hotels" ? "Destination" : "From"}
                </label>
                <div className="relative">
                  <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                  <Input
                    placeholder={tab === "hotels" ? "Where are you going?" : "Departure location"}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* To (for flights and trains only) */}
              {tab !== "hotels" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">To</label>
                  <div className="relative">
                    <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                    <Input
                      placeholder="Arrival location"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
              )}

              {/* Date Picker */}
              <div className="space-y-2 col-span-1">
                <label className="text-sm font-medium text-white">
                  {tab === "hotels" ? "Check-in" : "Date"}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-center items-center flex gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 h-[42px]"
                    >
                      <Calendar className="w-4 h-4 text-white/50" />
                      {date ? date.toDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="rounded-md border border-gray-200 bg-white shadow-md p-4"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests (only for hotels) */}
              {tab === "hotels" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Guests</label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white h-[42px]">
                      <SelectValue placeholder="Number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Search Button */}
              <div className="flex items-end">
                <Button className={searchButtonClasses}>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  )
}
