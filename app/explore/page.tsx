'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

interface ExploreItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  details?: string;
  subArticles?: Array<{ id: string; title: string; content: string }>;
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
    category: 'Planet',
    description: 'The smallest and fastest planet',
    details: 'Mercury is the closest planet to the Sun. It is a terrestrial planet with a heavily cratered surface, similar to the Moon. Mercury is the smallest planet in our solar system and completes its orbit around the Sun in just 88 Earth days.',
    subArticles: [
      { id: '1', title: 'Atmosphere', content: 'Mercury has virtually no atmosphere. Any gases present are quickly lost to space.' },
      { id: '2', title: 'Temperature', content: 'Mercury has extreme temperature variations, from -173°C at night to 427°C during the day.' },
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    category: 'Planet',
    description: 'The hottest planet in our solar system',
    details: 'Venus is the second planet from the Sun and is similar in size to Earth. However, Venus has a thick atmosphere composed mainly of carbon dioxide, creating a runaway greenhouse effect.',
    subArticles: [
      { id: '1', title: 'Surface', content: 'Venus has a surface temperature of around 465°C, hot enough to melt lead.' },
      { id: '2', title: 'Rotation', content: 'Venus rotates backwards compared to most planets and rotates so slowly that a day on Venus is longer than a year.' },
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    category: 'Planet',
    description: 'Our home planet',
    details: 'Earth is the third planet from the Sun and the only known planet to harbor life. It has a protective atmosphere and liquid water on its surface.',
    subArticles: [
      { id: '1', title: 'Biosphere', content: 'Earth is home to millions of species, from microscopic bacteria to massive whales.' },
      { id: '2', title: 'Moons', content: 'Earth has one natural satellite: the Moon, which influences our tides and rotates with Earth.' },
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    category: 'Planet',
    description: 'The red planet',
    details: 'Mars is the fourth planet from the Sun and is often called the "Red Planet" because of its reddish appearance due to iron oxide on its surface.',
    subArticles: [
      { id: '1', title: 'Exploration', content: 'Mars has been explored by numerous rovers and orbiters, searching for signs of past microbial life.' },
      { id: '2', title: 'Moons', content: 'Mars has two small moons: Phobos and Deimos.' },
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    category: 'Gas Giant',
    description: 'The largest planet in our solar system',
    details: 'Jupiter is a gas giant and the fifth planet from the Sun. It is the largest planet in our solar system and is primarily composed of hydrogen and helium.',
    subArticles: [
      { id: '1', title: 'Great Red Spot', content: 'Jupiter has a persistent anticyclonic storm larger than Earth, known as the Great Red Spot.' },
      { id: '2', title: 'Moons', content: 'Jupiter has at least 79 known moons, including the four large Galilean moons.' },
    ],
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
                  <div className="text-sm opacity-70">{item.category}</div>
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
                <p className="text-xl text-foreground/80 mb-6 text-balance">{selectedItem.description}</p>
                
                <div className="bg-card border border-border rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-foreground/90 leading-relaxed text-balance">
                    {selectedItem.details}
                  </p>
                </div>

                {/* Sub-articles */}
                {selectedItem.subArticles && selectedItem.subArticles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {selectedItem.subArticles.map(article => (
                      <div
                        key={article.id}
                        className="bg-card border border-border rounded-lg p-6 hover:border-primary transition"
                      >
                        <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                        <p className="text-foreground/80 text-balance">{article.content}</p>
                      </div>
                    ))}
                  </div>
                )}
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
