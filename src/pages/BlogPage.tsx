import React, { useState } from 'react';
import { 
  ArrowLeft, FileText, Search, Calendar, Clock, 
  User, Tag, ArrowRight, Heart, MessageSquare, Share2,
  Bookmark, ChevronRight, Filter, TrendingUp, Eye
} from 'lucide-react';

interface BlogPageProps {
  onNavigateHome: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  category: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
}

const BlogPage: React.FC<BlogPageProps> = ({ onNavigateHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Air Travel: How AI is Transforming Your Flying Experience',
      excerpt: 'Discover how artificial intelligence is revolutionizing everything from booking to baggage handling, creating a seamless travel experience.',
      date: '2024-12-15',
      author: {
        name: 'Rahul Sharma',
        role: 'Chief Technology Officer',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      category: 'Technology',
      readTime: '8 min read',
      featured: true,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['AI', 'innovation', 'customer experience'],
      likes: 342,
      comments: 56,
      views: 12500
    },
    {
      id: '2',
      title: 'Sustainable Aviation: IndiGo\'s Path to Carbon Neutrality',
      excerpt: 'Learn about our comprehensive sustainability roadmap, from fleet modernization to sustainable aviation fuels and carbon offset programs.',
      date: '2024-12-10',
      author: {
        name: 'Priya Patel',
        role: 'Sustainability Director',
        image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      category: 'Sustainability',
      readTime: '6 min read',
      featured: true,
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['sustainability', 'environment', 'carbon-neutral'],
      likes: 287,
      comments: 42,
      views: 9800
    },
    {
      id: '3',
      title: 'Behind the Scenes: A Day in the Life of an IndiGo Pilot',
      excerpt: 'Follow Captain Arjun Singh through his daily routine, from pre-flight checks to navigating challenging weather conditions.',
      date: '2024-12-05',
      author: {
        name: 'Arjun Singh',
        role: 'Senior Captain',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      category: 'Employee Spotlight',
      readTime: '5 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/2614855/pexels-photo-2614855.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['pilot', 'aviation', 'career'],
      likes: 215,
      comments: 38,
      views: 7600
    },
    {
      id: '4',
      title: 'Top 10 Hidden Gems in India You Can Fly to with IndiGo',
      excerpt: 'Explore lesser-known but breathtaking destinations across India that are perfect for your next adventure.',
      date: '2024-11-28',
      author: {
        name: 'Meera Kapoor',
        role: 'Travel Content Manager',
        image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      category: 'Travel',
      readTime: '7 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3889854/pexels-photo-3889854.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['destinations', 'travel', 'india'],
      likes: 456,
      comments: 87,
      views: 18900
    },
    {
      id: '5',
      title: 'How IndiGo Achieved Industry-Leading On-Time Performance',
      excerpt: 'The systems, processes, and people behind our consistent 90%+ on-time performance record.',
      date: '2024-11-20',
      author: {
        name: 'Vikram Mehta',
        role: 'Operations Director',
        image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      category: 'Operations',
      readTime: '6 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['operations', 'efficiency', 'performance'],
      likes: 189,
      comments: 32,
      views: 8700
    },
    {
      id: '6',
      title: 'The Evolution of IndiGo\'s Customer Experience Strategy',
      excerpt: 'How we\'ve transformed our approach to customer service through digital innovation and personalization.',
      date: '2024-11-15',
      author: {
        name: 'Ananya Desai',
        role: 'Customer Experience Head',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      category: 'Customer Experience',
      readTime: '5 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['customer service', 'digital', 'experience'],
      likes: 234,
      comments: 45,
      views: 10200
    }
  ];

  const categories = ['all', 'Technology', 'Sustainability', 'Employee Spotlight', 'Travel', 'Operations', 'Customer Experience'];
  const popularTags = ['AI', 'sustainability', 'travel', 'innovation', 'aviation', 'customer experience', 'destinations', 'technology'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onNavigateHome}
                className="btn-text text-white hover:bg-white/20 p-2"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">IndiGo Blog</h1>
                  <p className="text-primary-200 text-body2">Insights, stories, and updates from India's favorite airline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Posts */}
        <div className="mb-20">
          <h2 className="text-h2 text-primary mb-12 text-center">Featured Stories</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {blogPosts.filter(post => post.featured).map((post) => (
              <div key={post.id} className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300">
                <div className="relative h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                    Featured
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-body2 mb-2">{post.category}</p>
                    <h3 className="text-h5 font-bold leading-tight">{post.title}</h3>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-body1 text-secondary mb-6 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-body1 font-semibold text-primary">{post.author.name}</h4>
                      <p className="text-body2 text-secondary">{post.author.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-secondary text-body2">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-secondary text-body2">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button className="flex-1 btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                      <span>Read Full Story</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 px-6">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card-elevated p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="blog-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="blog-search">Search articles</label>
              <div className="absolute right-4 top-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <label htmlFor="category-filter">Category</label>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <span className="text-body2 text-secondary font-medium mr-2">Popular Tags:</span>
            {popularTags.map((tag, index) => (
              <button
                key={index}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-body2 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-body2 font-medium">
                    {post.category}
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-h6 text-primary font-bold mb-3 line-clamp-2 hover:text-primary-600 cursor-pointer transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-body2 text-secondary mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-body2 font-medium text-primary">{post.author.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-secondary text-body2 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="text-primary-500 hover:text-primary-600 transition-colors text-body2 font-medium flex items-center space-x-1">
                      <span>Read More</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-error-500 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-primary-500 transition-colors">
                        <Bookmark className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-secondary-500 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="card-elevated p-12 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-primary mb-6">Stay Updated</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Subscribe to our newsletter for the latest stories, travel tips, and exclusive offers
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 floating-label">
                <input
                  type="email"
                  className="input-box"
                  placeholder=" "
                  id="newsletter-email"
                />
                <label htmlFor="newsletter-email">Your email address</label>
              </div>
              <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                <span>Subscribe</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <p className="text-body2 text-secondary mt-4 text-center">
              By subscribing, you agree to our privacy policy and consent to receive updates from IndiGo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;