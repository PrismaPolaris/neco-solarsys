'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

interface ExploreItem {
  id: string;
  name: string;
  description: string;
  details: string;
  articleId: string;
}

interface Comment {
  _id: string;
  itemId: string;
  username: string;
  text: string;
  createdAt: string;
}

const SAMPLE_ITEMS: ExploreItem[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    description:
      'The smallest and fastest planet in our solar system, Mercury races around the Sun in just 88 Earth days. Despite being the closest planet to the Sun, it is not the hottest — its lack of atmosphere means heat escapes rapidly into space, creating dramatic temperature swings between scorching days and freezing nights.',
    details:
      'Mercury is a terrestrial planet with a heavily cratered surface, similar in appearance to the Moon. Its iron core makes up about 85% of its radius, giving it a powerful magnetic field despite its small size. Mercury has been visited by NASA\'s Mariner 10 and MESSENGER spacecraft, revealing a world of extremes shaped by billions of years of solar bombardment.',
    articleId: 'mercury',
  },
  {
    id: 'venus',
    name: 'Venus',
    description:
      'The brightest natural object in the night sky after the Moon, Venus is a world of extremes hidden beneath a thick veil of clouds. Often called Earth\'s twin due to its similar size and mass, Venus is in reality a hellish landscape defined by crushing pressure, sulfuric acid clouds, and temperatures that exceed those on Mercury.',
    details:
      'Venus has a runaway greenhouse effect caused by its dense carbon dioxide atmosphere, trapping heat and pushing surface temperatures to around 465°C — hot enough to melt lead. Its surface is dominated by volcanic plains, highland continents, and shield volcanoes. Venus rotates so slowly and in the opposite direction to most planets that the Sun rises in the west and sets in the east.',
    articleId: 'venus',
  },
  {
    id: 'earth',
    name: 'Earth',
    description:
      'Our extraordinary home is the only known planet to harbor life, liquid water on its surface, and a breathable atmosphere. Earth sits in the "Goldilocks zone" of our solar system — just the right distance from the Sun to maintain conditions that have allowed life to flourish and evolve for billions of years.',
    details:
      'Earth is a geologically active world shaped by plate tectonics, volcanism, and the constant cycle of erosion and renewal. Its protective magnetic field shields life from harmful solar radiation. The Moon, formed from a giant impact early in Earth\'s history, stabilizes our planet\'s axial tilt and drives the ocean tides that have rhythmically shaped coastlines and ecosystems.',
    articleId: 'earth',
  },
  {
    id: 'mars',
    name: 'Mars',
    description:
      'The Red Planet has captivated human imagination for centuries, and today it stands as the most explored world beyond Earth. Mars bears the scars of an ancient past — towering volcanoes, a canyon system stretching across a continent, and dried riverbeds that hint at a warmer, wetter world that existed billions of years ago.',
    details:
      'Mars is home to Olympus Mons, the largest volcano in the solar system, and Valles Marineris, a canyon network that dwarfs Earth\'s Grand Canyon. Though its thin atmosphere offers little protection from radiation, scientists believe Mars once had a thicker atmosphere and flowing water. Robotic explorers continue to search for signs of ancient microbial life in its rocks and soil.',
    articleId: 'mars',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description:
      'A world so massive it could swallow all other planets combined, Jupiter is the undisputed giant of our solar system. Its swirling atmosphere of hydrogen and helium churns with storms, jet streams, and the iconic Great Red Spot — a hurricane-like system that has raged for centuries and is larger than the entire Earth.',
    details:
      'Jupiter radiates more heat than it receives from the Sun, a remnant of its formation. Its powerful gravity shapes the entire solar system, deflecting asteroids and comets and protecting the inner planets. With at least 95 known moons — including Io, the most volcanically active body in the solar system, and Europa, which likely harbors a subsurface ocean — Jupiter is a solar system unto itself.',
    articleId: 'jupiter',
  },
];

export default function ExplorePage() {
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(SAMPLE_ITEMS[0]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    if (selectedItem) {
      fetchComments(selectedItem.id);
    }
  }, [selectedItem]);

  const fetchComments = async (itemId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/comments/${itemId}`
      );
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedItem || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            itemId: selectedItem.id,
            text: newComment,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setNewComment('');
        fetchComments(selectedItem.id);
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-secondary border-r border-border overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Celestial Bodies</h2>
            <div className="space-y-2">
              {SAMPLE_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left px-4 py-3 rounded transition ${
                    selectedItem?.id === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="font-semibold">{item.name}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {selectedItem && (
            <div className="max-w-4xl mx-auto p-6 md:p-12">
              {/* Details Panel */}
              <div className="mb-12">
                <h1 className="text-5xl font-bold mb-4 text-balance">{selectedItem.name}</h1>
                <p className="text-xl text-foreground/80 mb-6 text-balance">
                  {selectedItem.description}
                </p>

                <div className="bg-card border border-border rounded-lg p-8 mb-4">
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-foreground/90 leading-relaxed text-balance">
                    {selectedItem.details}
                  </p>
                </div>

                {/* Read More Button */}
                <div className="flex justify-end">
                  <Link href={`/explore/${selectedItem.articleId}`}>
                    <Button className="bg-primary hover:bg-primary/90 gap-2">
                      Read More →
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Comments Section */}
              <div className="border-t border-border pt-12">
                <h2 className="text-3xl font-bold mb-8">Community Comments</h2>

                {user ? (
                  <form onSubmit={handleAddComment} className="mb-8">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this celestial body..."
                      className="w-full px-4 py-3 rounded bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                      rows={4}
                    />
                    <Button
                      type="submit"
                      disabled={loading || !newComment.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {loading ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </form>
                ) : (
                  <div className="mb-8 p-6 bg-card border border-border rounded-lg text-center">
                    <p className="text-foreground/80 mb-4">Sign in to share your thoughts</p>
                    <Link href="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.length > 0 ? (
                    comments.map(comment => (
                      <div
                        key={comment._id}
                        className="bg-card border border-border rounded-lg p-6"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-semibold text-primary">{comment.username}</div>
                          <div className="text-sm text-foreground/50">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-foreground/90">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-foreground/50">
                      No comments yet. Be the first to share your thoughts!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
