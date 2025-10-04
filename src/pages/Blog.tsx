import { useState, useEffect } from 'react';
import { Calendar, User, Tag, BookOpen, X } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(posts.map((post) => post.category)))];

  const filteredPosts = filter === 'all'
    ? posts
    : posts.filter((post) => post.category === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-slate-300 text-lg">
            Stories, insights, and updates from my musical journey
          </p>
        </div>

        <div className="flex justify-center mb-12 space-x-4 flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === category
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-600 transition-all cursor-pointer hover:transform hover:scale-105"
              >
                {post.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{post.category}</span>
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center space-x-2 text-cyan-400 text-sm font-semibold">
                    <BookOpen className="w-4 h-4" />
                    <span>Read More</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-800 rounded-lg max-w-4xl w-full my-8">
              <div className="p-6 border-b border-slate-700 flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedPost.author}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedPost.created_at)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{selectedPost.category}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-slate-400 hover:text-white transition-colors ml-4"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {selectedPost.image_url && (
                <img
                  src={selectedPost.image_url}
                  alt={selectedPost.title}
                  className="w-full h-96 object-cover"
                />
              )}
              <div className="p-6">
                <div className="prose prose-invert max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-300 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
