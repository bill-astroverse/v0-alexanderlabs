"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CreditCard, Landmark, Phone, ShoppingBag } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isLoading } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [deliveryLocation, setDeliveryLocation] = useState("nairobi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const deliveryLocations = [
    { id: "nairobi", name: "Nairobi", fee: 500 },
    { id: "mombasa", name: "Mombasa", fee: 1500 },
    { id: "kisumu", name: "Kisumu", fee: 1200 },
    { id: "nakuru", name: "Nakuru", fee: 800 },
    { id: "eldoret", name: "Eldoret", fee: 1000 },
  ]

  const banks = [
    { id: "kcb", name: "KCB Bank" },
    { id: "equity", name: "Equity Bank" },
    { id: "im", name: "I&M Bank" },
    { id: "coop", name: "Co-operative Bank" },
  ]

  const selectedLocation = deliveryLocations.find((loc) => loc.id === deliveryLocation) || deliveryLocations[0]
  const deliveryFee = selectedLocation.fee
  const subtotal = totalPrice
  const tax = subtotal * 0.16
  const total = subtotal + tax + deliveryFee

  // Format price in KES with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setIsProcessing(true)

    if (!user) {
      setFormError("You must be signed in to complete your purchase")
      setIsProcessing(false)
      return
    }

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Add some products to your cart before proceeding to checkout.</p>
          <Button
            asChild
            className="bg-gradient-to-r from-green-600 via-blue-600 to-red-600 hover:from-green-700 hover:via-blue-700 hover:to-red-700"
          >
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {!user && (
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <span className="font-medium">You are not signed in.</span> Please{" "}
            <Link href="/auth/sign-in" className="underline">
              sign in
            </Link>{" "}
            or{" "}
            <Link href="/auth/sign-up" className="underline">
              create an account
            </Link>{" "}
            to save your order history.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
                <CardDescription>Enter your delivery details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required className="auth-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+254 700 000 000" required className="auth-input" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    defaultValue={user?.email || ""}
                    required
                    className="auth-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Delivery Location</Label>
                  <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
                    <SelectTrigger className="auth-input">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryLocations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name} - {formatPrice(location.fee)} delivery fee
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address"
                    required
                    className="auth-input min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions for delivery"
                    className="auth-input min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="mpesa">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Phone className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="font-medium">Pay with M-Pesa</h3>
                          <p className="text-sm text-muted-foreground">
                            You will receive an STK push to complete the payment
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                        <Input
                          id="mpesa-number"
                          placeholder="07XX XXX XXX"
                          required={paymentMethod === "mpesa"}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="card">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-medium">Pay with Card</h3>
                          <p className="text-sm text-muted-foreground">Secure payment via credit or debit card</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="XXXX XXXX XXXX XXXX"
                          required={paymentMethod === "card"}
                          className="auth-input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            required={paymentMethod === "card"}
                            className="auth-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="XXX"
                            required={paymentMethod === "card"}
                            className="auth-input"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="bank">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Landmark className="h-8 w-8 text-purple-600" />
                        <div>
                          <h3 className="font-medium">Pay with Bank Transfer</h3>
                          <p className="text-sm text-muted-foreground">Transfer the amount to our bank account</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank">Select Bank</Label>
                        <Select defaultValue={banks[0].id}>
                          <SelectTrigger className="auth-input">
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {banks.map((bank) => (
                              <SelectItem key={bank.id} value={bank.id}>
                                {bank.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="p-4 bg-secondary rounded-md">
                        <p className="font-medium mb-2">Bank Transfer Instructions:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>Transfer the exact amount: {formatPrice(total)}</li>
                          <li>Use your email as the reference</li>
                          <li>Upload the payment receipt below</li>
                        </ol>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="receipt">Upload Payment Receipt</Label>
                        <Input id="receipt" type="file" required={paymentMethod === "bank"} className="auth-input" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                {formError && (
                  <Alert variant="destructive" className="mb-4 w-full">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-red-600 hover:from-green-700 hover:via-blue-700 hover:to-red-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay ${formatPrice(total)}`}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {items.length} {items.length === 1 ? "item" : "items"} in your cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-medium">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (16%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({selectedLocation.name})</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
