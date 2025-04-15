"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchBar() {
  const [date, setDate] = useState(null)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-4 rounded-xl glass-card"
    >
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/10">
          <TabsTrigger value="hotels" className="data-[state=active]:bg-white/20">
            Hotels
          </TabsTrigger>
          <TabsTrigger value="flights" className="data-[state=active]:bg-white/20">
            Flights
          </TabsTrigger>
          <TabsTrigger value="trains" className="data-[state=active]:bg-white/20">
            Trains
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hotels" className="mt-0">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Destination</label>
              <div className="relative">
                <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                <Input
                  placeholder="Where are you going?"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-white/50" />
                    {date ? date.toDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Guests</label>
              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
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

            <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="flights" className="mt-0">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">From</label>
              <div className="relative">
                <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                <Input
                  placeholder="Departure city"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">To</label>
              <div className="relative">
                <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                <Input
                  placeholder="Arrival city"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-white/50" />
                    {date ? date.toDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="trains" className="mt-0">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">From</label>
              <div className="relative">
                <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                <Input
                  placeholder="Departure station"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">To</label>
              <div className="relative">
                <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                <Input
                  placeholder="Arrival station"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-white/50" />
                    {date ? date.toDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
