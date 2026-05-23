'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items: cartItems, total, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-foreground/70 mb-8">Add some items to your cart before checking out.</p>
              <Link href="/merchandise">
                <Button className="bg-primary hover:bg-primary/90">
                  Return to Shop
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderPlaced(true);
    clearCart();
    setIsProcessing(false);
  };

  if (orderPlaced) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">✓</div>
              <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-foreground/70 mb-8">
                Thank you for your purchase. Your order has been placed successfully and will be shipped soon.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <div className="text-left space-y-2">
                <p><span className="font-bold">Name:</span> {formData.firstName} {formData.lastName}</p>
                <p><span className="font-bold">Email:</span> {formData.email}</p>
                <p><span className="font-bold">Shipping Address:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                <p><span className="font-bold">Order Total:</span> ${total.toFixed(2)}</p>
              </div>
            </div>

            <Link href="/merchandise">
              <Button className="bg-primary hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="md:col-span-2 bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-foreground/50"
                  />
                  <p className="text-foreground/50 text-sm mt-2">Use 4242 4242 4242 4242 for testing</p>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 py-3 text-lg"
                >
                  {isProcessing ? 'Processing...' : 'Complete Purchase'}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-border last:border-b-0">
                      {item.image && (
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-foreground/70 text-sm">Qty: {item.quantity}</p>
                        <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/merchandise" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    Back to Shop
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
