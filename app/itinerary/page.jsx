"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Plus, Trash2, Save, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"

export default function ItineraryPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("create")
  const [itineraryName, setItineraryName] = useState("")
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [activities, setActivities] = useState([
    { id: 1, day: 1, time: "09:00", activity: "Breakfast at hotel", location: "" },
    { id: 2, day: 1, time: "10:30", activity: "Visit local museum", location: "City Center" },
    { id: 3, day: 1, time: "13:00", activity: "Lunch at local restaurant", location: "Downtown" },
  ])
  const [newActivity, setNewActivity] = useState({
    day: 1,
    time: "",
    activity: "",
    location: "",
  })
  const [savedItineraries, setSavedItineraries] = useState([
    {
      id: 1,
      name: "Summer in Paris",
      destination: "Paris, France",
      startDate: "2023-06-15",
      endDate: "2023-06-22",
      activities: [
        { id: 1, day: 1, time: "09:00", activity: "Eiffel Tower", location: "Champ de Mars" },
        { id: 2, day: 1, time: "13:00", activity: "Lunch at Le Jules Verne", location: "Eiffel Tower" },
        { id: 3, day: 1, time: "15:00", activity: "Louvre Museum", location: "Rue de Rivoli" },
        { id: 4, day: 2, time: "10:00", activity: "Notre-Dame Cathedral", location: "Île de la Cité" },
      ],
    },
    {
      id: 2,
      name: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      startDate: "2023-09-10",
      endDate: "2023-09-18",
      activities: [
        { id: 1, day: 1, time: "08:00", activity: "Tsukiji Fish Market", location: "Chuo City" },
        { id: 2, day: 1, time: "12:00", activity: "Lunch at sushi restaurant", location: "Ginza" },
        { id: 3, day: 1, time: "14:00", activity: "Senso-ji Temple", location: "Asakusa" },
        { id: 4, day: 2, time: "10:00", activity: "Tokyo Skytree", location: "Sumida" },
      ],
    },
  ])

  const handleAddActivity = () => {
    if (!newActivity.time || !newActivity.activity) return

    const id = activities.length ? Math.max(...activities.map((a) => a.id)) + 1 : 1
    setActivities([...activities, { ...newActivity, id }])
    setNewActivity({
      day: newActivity.day,
      time: "",
      activity: "",
      location: "",
    })
  }

  const handleRemoveActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  const handleSaveItinerary = () => {
    if (!itineraryName || !destination || !startDate || !endDate || activities.length === 0) {
      alert("Please fill in all required fields and add at least one activity.")
      return
    }

    const newItinerary = {
      id: savedItineraries.length ? Math.max(...savedItineraries.map((i) => i.id)) + 1 : 1,
      name: itineraryName,
      destination,
      startDate,
      endDate,
      activities: [...activities],
    }

    setSavedItineraries([...savedItineraries, newItinerary])
    setActiveTab("saved")

    // Reset form
    setItineraryName("")
    setDestination("")
    setStartDate("")
    setEndDate("")
    setActivities([])
  }

  const getDayCount = () => {
    if (!startDate || !endDate) return 1
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1
  }

  const dayCount = getDayCount()
  const days = Array.from({ length: dayCount }, (_, i) => i + 1)

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
          <h1 className="text-3xl font-bold text-white md:text-4xl">Trip Planner</h1>
          <p className="mt-2 text-white/70">Create and manage your travel itineraries</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10">
            <TabsTrigger value="create" className="data-[state=active]:bg-white/20">
              Create Itinerary
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-white/20">
              Saved Itineraries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Itinerary Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-white">Itinerary Details</CardTitle>
                    <CardDescription className="text-white/70">
                      Fill in the basic information for your trip
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="itinerary-name" className="text-white">
                        Itinerary Name
                      </Label>
                      <Input
                        id="itinerary-name"
                        placeholder="e.g., Summer Vacation 2023"
                        value={itineraryName}
                        onChange={(e) => setItineraryName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-white">
                        Destination
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                        <Input
                          id="destination"
                          placeholder="e.g., Paris, France"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date" className="text-white">
                          Start Date
                        </Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date" className="text-white">
                          End Date
                        </Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 glass-card">
                  <CardHeader>
                    <CardTitle className="text-white">Add Activity</CardTitle>
                    <CardDescription className="text-white/70">
                      Plan activities for each day of your trip
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="day" className="text-white">
                        Day
                      </Label>
                      <Select
                        value={newActivity.day.toString()}
                        onValueChange={(value) => setNewActivity({ ...newActivity, day: Number.parseInt(value) })}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day.toString()}>
                              Day {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-white">
                        Time
                      </Label>
                      <div className="relative">
                        <Clock className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                        <Input
                          id="time"
                          placeholder="e.g., 09:00"
                          value={newActivity.time}
                          onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="activity" className="text-white">
                        Activity
                      </Label>
                      <Textarea
                        id="activity"
                        placeholder="e.g., Visit Eiffel Tower"
                        value={newActivity.activity}
                        onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">
                        Location (Optional)
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute w-4 h-4 text-white/50 left-3 top-3" />
                        <Input
                          id="location"
                          placeholder="e.g., Champ de Mars, Paris"
                          value={newActivity.location}
                          onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleAddActivity}
                      className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Activities List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <Card className="glass-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Your Itinerary</CardTitle>
                      <CardDescription className="text-white/70">
                        {activities.length} activities planned
                      </CardDescription>
                    </div>
                    <Button
                      onClick={handleSaveItinerary}
                      className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Itinerary
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {activities.length === 0 ? (
                      <div className="p-8 text-center">
                        <p className="text-white/70">No activities added yet. Start planning your trip!</p>
                      </div>
                    ) : (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible">
                        {days.map((day) => {
                          const dayActivities = activities.filter((activity) => activity.day === day)
                          if (dayActivities.length === 0) return null

                          return (
                            <div key={day} className="mb-6">
                              <h3 className="mb-3 text-lg font-semibold text-white">Day {day}</h3>
                              <div className="space-y-3">
                                {dayActivities
                                  .sort((a, b) => a.time.localeCompare(b.time))
                                  .map((activity) => (
                                    <motion.div
                                      key={activity.id}
                                      variants={itemVariants}
                                      className="flex items-start p-3 rounded-lg bg-white/10"
                                    >
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <Clock className="w-4 h-4 text-cyan-400" />
                                          <span className="font-medium text-white">{activity.time}</span>
                                        </div>
                                        <div className="mt-1 text-white">{activity.activity}</div>
                                        {activity.location && (
                                          <div className="flex items-center mt-1 text-white/70">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            <span className="text-sm">{activity.location}</span>
                                          </div>
                                        )}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveActivity(activity.id)}
                                        className="text-white/70 hover:text-white hover:bg-white/10"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </motion.div>
                                  ))}
                              </div>
                            </div>
                          )
                        })}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2"
            >
              {savedItineraries.length === 0 ? (
                <div className="col-span-2 p-8 text-center rounded-xl glass-card">
                  <h3 className="text-xl font-semibold text-white">No saved itineraries</h3>
                  <p className="mt-2 text-white/70">Create your first itinerary to see it here</p>
                  <Button
                    onClick={() => setActiveTab("create")}
                    className="mt-4 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                  >
                    Create Itinerary
                  </Button>
                </div>
              ) : (
                savedItineraries.map((itinerary) => (
                  <motion.div key={itinerary.id} variants={itemVariants}>
                    <Card className="overflow-hidden glass-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-white">{itinerary.name}</CardTitle>
                            <CardDescription className="text-white/70">
                              <div className="flex items-center mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{itinerary.destination}</span>
                              </div>
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-white/70">
                              {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                              {new Date(itinerary.endDate).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-white/70">{itinerary.activities.length} activities</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {itinerary.activities.slice(0, 3).map((activity) => (
                            <div key={activity.id} className="p-3 rounded-lg bg-white/10">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-white/70">Day {activity.day}</span>
                                  <span className="text-sm font-medium text-white">{activity.time}</span>
                                </div>
                              </div>
                              <div className="mt-1 text-white">{activity.activity}</div>
                              {activity.location && (
                                <div className="flex items-center mt-1 text-white/70">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  <span className="text-sm">{activity.location}</span>
                                </div>
                              )}
                            </div>
                          ))}
                          {itinerary.activities.length > 3 && (
                            <div className="text-center text-white/70">
                              +{itinerary.activities.length - 3} more activities
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0">
                          Edit Itinerary
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
