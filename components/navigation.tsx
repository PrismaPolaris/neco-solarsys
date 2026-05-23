'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Navigation() {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
            <span className="text-xl font-bold text-primary">Cosmic</span>
          </Link>

          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition">
              Home
            </Link>
            <Link href="/explore" className="text-foreground/80 hover:text-foreground transition">
              Explore
            </Link>
            <Link href="/merchandise" className="text-foreground/80 hover:text-foreground transition">
              Shop
            </Link>
            <Link href="/company" className="text-foreground/80 hover:text-foreground transition">
              Company
            </Link>
          </div>

          <div className="hidden md:flex gap-2">
            {user ? (
              <>
                <span className="text-foreground text-sm py-2 px-3">{user.username}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {showMobileMenu && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="text-foreground/80 hover:text-foreground">
              Home
            </Link>
            <Link href="/explore" className="text-foreground/80 hover:text-foreground">
              Explore
            </Link>
            <Link href="/merchandise" className="text-foreground/80 hover:text-foreground">
              Shop
            </Link>
            <Link href="/company" className="text-foreground/80 hover:text-foreground">
              Company
            </Link>
            {user ? (
              <Button variant="outline" size="sm" onClick={logout} className="w-full">
                Logout
              </Button>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
