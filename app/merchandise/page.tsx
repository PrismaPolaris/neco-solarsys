'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Saturn Ring Model', price: 29.99, description: 'Detailed model of Saturn with its iconic rings' },
  { id: '2', name: 'Mars Mug', price: 14.99, description: 'Coffee mug featuring the red planet' },
  { id: '3', name: 'Space Poster Set', price: 24.99, description: 'Set of 6 high-quality space posters' },
  { id: '4', name: 'Meteorite Replica', price: 19.99, description: 'Authentic-looking meteorite specimen' },
  { id: '5', name: 'Galaxy Hoodie', price: 54.99, description: 'Comfortable hoodie with galaxy print' },
  { id: '6', name: 'Moon Lamp', price: 39.99, description: 'Decorative 3D printed moon lamp' },
  { id: '7', name: 'Planet Plushies', price: 34.99, description: 'Set of all 8 planets as cute plushies' },
  { id: '8', name: 'Star Map T-Shirt', price: 24.99, description: 'Vintage star map design on premium cotton' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function MerchandisePage() {
  const { items: cartItems, total, addToCart, removeFromCart, updateQuantity } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4 text-balance">Cosmic Merchandise</h1>
            <p className="text-xl text-white/90 text-balance">Celebrate your love for space with our exclusive collection</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-2 bg-primary hover:bg-primary/90 rounded text-primary-foreground"
            >
              🛒 Cart {cartItems.length > 0 && `(${cartItems.length})`}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SAMPLE_PRODUCTS.map(product => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition h-full flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-5xl">
                  {['🪐', '🌙', '🛸', '⭐', '🌍', '🔭', '🪐', '🌠'][Math.floor(Math.random() * 8)]}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-foreground/70 mb-4 flex-1">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
            <div className="bg-background w-full max-w-md h-screen overflow-y-auto">
              <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-background">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-2xl text-foreground/60 hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              {cartItems.length > 0 ? (
                <>
                  <div className="p-6 space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="bg-card border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-foreground/70">${item.price}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 bg-muted rounded hover:bg-muted/80"
                          >
                            −
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-muted rounded hover:bg-muted/80"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border p-6 sticky bottom-0 bg-background">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 mb-2">
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowCart(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-foreground/70 mb-4">Your cart is empty</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowCart(false)}
                  >
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
