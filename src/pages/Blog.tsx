import { useState, useEffect } from 'react';
import { Calendar, User, Tag, Sparkles, BookOpen, X } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

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

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return;

    setGenerating(true);

    setTimeout(() => {
      const mockContent = `# ${aiPrompt}

This is an AI-generated blog post based on your prompt. In a production environment, this would integrate with an AI service like OpenAI's GPT-4 or Anthropic's Claude.

## Key Points

The content would be generated based on your specific requirements and would include:

- Relevant insights about the topic
- Engaging storytelling elements
- Personal perspectives and experiences
- Call-to-action for readers

## Conclusion

This demonstrates how AI can assist in content creation while maintaining your unique voice and style.`;

      const mockPost: BlogPost = {
        id: crypto.randomUUID(),
        title: aiPrompt,
        content: mockContent,
        excerpt: `AI-generated content about: ${aiPrompt}`,
        category: 'ai-generated',
        author: 'Geoffrey Pariseau (AI-Assisted)',
        is_published: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setSelectedPost(mockPost);
      setShowAIGenerator(false);
      setAiPrompt('');
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-slate-300 text-lg mb-8">
            Stories, insights, and updates from my musical journey
          </p>
          <button
            onClick={() => setShowAIGenerator(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full font-semibold transition-all transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate with AI</span>
          </button>
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

        {showAIGenerator && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <span>AI Blog Generator</span>
                </h2>
                <button
                  onClick={() => setShowAIGenerator(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2 font-medium">
                    What would you like to write about?
                  </label>
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g., My experience with music production software"
                    className="w-full px-4 py-3 bg-slate-900 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
                <button
                  onClick={handleGenerateAI}
                  disabled={!aiPrompt.trim() || generating}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </span>
                  ) : (
                    'Generate Blog Post'
                  )}
                </button>
                <p className="text-slate-400 text-xs text-center">
                  AI will generate a draft blog post based on your topic. You can edit and publish it afterward.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
