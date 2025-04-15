"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, CreditCard, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const { user } = useAuth()
  const [checkoutStep, setCheckoutStep] = useState(1)

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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        <div className="container px-4 py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md p-8 mx-auto text-center rounded-xl glass-card"
          >
            <h1 className="text-2xl font-bold text-white">Your Cart is Empty</h1>
            <p className="mt-2 text-white/70">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <Button className="mt-6 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0">
                Explore Destinations
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-white md:text-4xl">Your Cart</h1>
          <p className="mt-2 text-white/70">Review your items and proceed to checkout</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          {checkoutStep === 1 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2">
              {cartItems.map((item) => (
                <motion.div key={`${item.id}-${item.type}`} variants={itemVariants}>
                  <div className="p-4 mb-4 overflow-hidden rounded-xl glass-card">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative w-full h-32 overflow-hidden rounded-lg sm:w-32 shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                            <p className="text-sm text-white/70">
                              Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id, item.type)}
                            className="text-white/70 hover:text-white hover:bg-white/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8 text-white border-white/30 bg-white/10"
                              onClick={() => updateQuantity(item.id, item.type, Math.max(1, (item.quantity || 1) - 1))}
                              disabled={(item.quantity || 1) <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-white">{item.quantity || 1}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8 text-white border-white/30 bg-white/10"
                              onClick={() => updateQuantity(item.id, item.type, (item.quantity || 1) + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-lg font-bold text-white">${item.price * (item.quantity || 1)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
                >
                  Clear Cart
                </Button>
              </div>
            </motion.div>
          )}

          {/* Checkout Form */}
          {checkoutStep === 2 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2">
              <div className="p-6 rounded-xl glass-card">
                <h2 className="mb-6 text-xl font-semibold text-white">Personal Information</h2>
                <div className="grid gap-4 mb-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue={user?.name?.split(" ")[0] || ""}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      defaultValue={user?.name?.split(" ")[1] || ""}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email || ""}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone
                    </Label>
                    <Input id="phone" type="tel" className="bg-white/10 border-white/20 text-white" />
                  </div>
                </div>

                <h2 className="mb-6 text-xl font-semibold text-white">Billing Address</h2>
                <div className="grid gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Street Address
                    </Label>
                    <Input id="address" className="bg-white/10 border-white/20 text-white" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">
                        City
                      </Label>
                      <Input id="city" className="bg-white/10 border-white/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-white">
                        State/Province
                      </Label>
                      <Input id="state" className="bg-white/10 border-white/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className="text-white">
                        Zip/Postal Code
                      </Label>
                      <Input id="zip" className="bg-white/10 border-white/20 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCheckoutStep(1)}
                    className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
                  >
                    Back to Cart
                  </Button>
                  <Button
                    onClick={() => setCheckoutStep(3)}
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Payment Form */}
          {checkoutStep === 3 && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2">
              <div className="p-6 rounded-xl glass-card">
                <h2 className="mb-6 text-xl font-semibold text-white">Payment Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-white">
                      Name on Card
                    </Label>
                    <Input id="cardName" className="bg-white/10 border-white/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-white">
                      Card Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="1234 5678 9012 3456"
                      />
                      <CreditCard className="absolute w-5 h-5 text-white/50 right-3 top-3" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expMonth" className="text-white">
                        Expiration Month
                      </Label>
                      <Input id="expMonth" className="bg-white/10 border-white/20 text-white" placeholder="MM" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expYear" className="text-white">
                        Expiration Year
                      </Label>
                      <Input id="expYear" className="bg-white/10 border-white/20 text-white" placeholder="YYYY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-white">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        type="password"
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCheckoutStep(2)}
                    className="text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      alert("Order placed successfully!")
                      clearCart()
                      setCheckoutStep(1)
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                  >
                    Complete Order
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="p-6 rounded-xl glass-card">
              <h2 className="mb-6 text-xl font-semibold text-white">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`summary-${item.id}-${item.type}`} className="flex justify-between">
                    <div className="text-white">
                      {item.name} <span className="text-white/70">x{item.quantity || 1}</span>
                    </div>
                    <div className="font-medium text-white">${item.price * (item.quantity || 1)}</div>
                  </div>
                ))}
                <Separator className="my-4 bg-white/20" />
                <div className="flex justify-between">
                  <div className="text-white">Subtotal</div>
                  <div className="font-medium text-white">${getCartTotal()}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-white">Taxes</div>
                  <div className="font-medium text-white">${(getCartTotal() * 0.1).toFixed(2)}</div>
                </div>
                <Separator className="my-4 bg-white/20" />
                <div className="flex justify-between">
                  <div className="text-lg font-semibold text-white">Total</div>
                  <div className="text-lg font-bold text-white">${(getCartTotal() * 1.1).toFixed(2)}</div>
                </div>
              </div>

              {checkoutStep === 1 && (
                <Button
                  onClick={() => setCheckoutStep(2)}
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white border-0"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
