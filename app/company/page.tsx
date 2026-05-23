'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function CompanyPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('about');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);

    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContactMessage('Thank you for your message! We will get back to you soon.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setContactMessage(''), 3000);
    } catch (error) {
      setContactMessage('Failed to send message. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4 text-balance">About Cosmic</h1>
            <p className="text-xl text-white/90 text-balance">Exploring the universe, one celestial discovery at a time</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Tabs */}
          <div className="flex gap-4 mb-12 border-b border-border">
            {['about', 'contact', user ? 'settings' : ''].filter(Boolean).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6 text-balance">
                  Cosmic is dedicated to inspiring curiosity and wonder about our solar system. We believe that by sharing knowledge about the cosmos, we can foster a deeper appreciation for the universe and our place within it.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed text-balance">
                  Through interactive exploration tools, merchandise, and community engagement, we make space science accessible and exciting for everyone.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: 'Exploration', icon: '🔭', desc: 'Deep dive into detailed information about planets, moons, and celestial phenomena.' },
                    { title: 'Merchandise', icon: '🎁', desc: 'Premium cosmic-themed products that celebrate your love for space and astronomy.' },
                    { title: 'Community', icon: '👥', desc: 'Connect with fellow space enthusiasts, share insights, and discuss the wonders of the cosmos.' },
                  ].map(item => (
                    <div key={item.title} className="bg-card border border-border rounded-lg p-8 text-center">
                      <div className="text-5xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-foreground/80 text-balance">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Our Team</h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6 text-balance">
                  Founded by space enthusiasts and astronomers, our team is passionate about making the cosmos accessible to everyone. We combine scientific accuracy with engaging storytelling to create an unforgettable experience.
                </p>
              </section>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

              {contactMessage && (
                <div className={`mb-6 p-4 rounded ${
                  contactMessage.includes('Thank you')
                    ? 'bg-green-500/20 border border-green-500 text-green-600'
                    : 'bg-destructive/20 border border-destructive text-destructive'
                }`}>
                  {contactMessage}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {contactLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>

              <div className="mt-12 p-8 bg-card border border-border rounded-lg">
                <h3 className="text-xl font-bold mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-2 text-foreground/80">
                  <p>Email: hello@cosmic.space</p>
                  <p>Phone: +1 (555) COSMIC-1</p>
                  <p>Address: 123 Star Lane, Galaxy City, UC 12345</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && user && (
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-8">Account Settings</h2>

              <div className="bg-card border border-border rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Username</label>
                    <input
                      type="text"
                      value={user.username}
                      disabled
                      className="w-full px-4 py-3 rounded bg-muted border border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-3 rounded bg-muted border border-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Role</label>
                    <input
                      type="text"
                      value={user.role}
                      disabled
                      className="w-full px-4 py-3 rounded bg-muted border border-border capitalize"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Danger Zone</h3>
                <p className="text-foreground/80 mb-6">Once you log out, you will need to log in again to access your account.</p>
                <Button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}

          {/* Login Prompt */}
          {activeTab === 'settings' && !user && (
            <div className="text-center py-12">
              <p className="text-xl text-foreground/80 mb-6">Sign in to access your account settings</p>
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
