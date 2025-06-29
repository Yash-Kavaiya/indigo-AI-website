import React, { useState } from 'react';
import { 
  ArrowLeft, Newspaper, Download, Search, Calendar, 
  Trophy, ExternalLink, Image, FileText, Monitor,
  Tag, Clock, ArrowRight, Share2, Mail, Phone, Link
} from 'lucide-react';

interface PressPageProps {
  onNavigateHome: () => void;
}

interface PressRelease {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
  image: string;
  tags: string[];
}

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'logo' | 'video' | 'document';
  format: string;
  size: string;
  description: string;
  downloadUrl: string;
}

const PressPage: React.FC<PressPageProps> = ({ onNavigateHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const pressReleases: PressRelease[] = [
    {
      id: '1',
      title: 'IndiGo Reports Record Q4 2024 Financial Results with 45% Revenue Growth',
      excerpt: 'IndiGo announces strongest quarterly performance in company history, driven by domestic recovery and international expansion.',
      date: '2024-12-15',
      category: 'Financial Results',
      readTime: '4 min read',
      featured: true,
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['financial', 'growth', 'results']
    },
    {
      id: '2',
      title: 'IndiGo Launches AI-Powered Travel Assistant Across All Digital Platforms',
      excerpt: 'Revolutionary AI technology transforms customer experience with personalized travel recommendations and real-time assistance.',
      date: '2024-12-10',
      category: 'Technology',
      readTime: '3 min read',
      featured: true,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['technology', 'AI', 'innovation']
    },
    {
      id: '3',
      title: 'IndiGo Receives "World\'s Leading Low-Cost Airline" Award at World Travel Awards 2024',
      excerpt: 'Recognition for exceptional customer service, operational excellence, and industry-leading on-time performance.',
      date: '2024-11-28',
      category: 'Awards',
      readTime: '2 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/1267335/pexels-photo-1267335.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['awards', 'recognition', 'excellence']
    },
    {
      id: '4',
      title: 'IndiGo Commits to Net-Zero Carbon Emissions by 2050 with Comprehensive Sustainability Roadmap',
      excerpt: 'Ambitious sustainability initiative includes fleet modernization, sustainable aviation fuel adoption, and carbon offset programs.',
      date: '2024-11-20',
      category: 'Sustainability',
      readTime: '5 min read',
      featured: true,
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['sustainability', 'environment', 'carbon-neutral']
    },
    {
      id: '5',
      title: 'IndiGo Expands International Network with New Routes to Southeast Asia',
      excerpt: 'New direct flights to Bangkok, Kuala Lumpur, and Ho Chi Minh City strengthen regional connectivity.',
      date: '2024-11-15',
      category: 'Route Expansion',
      readTime: '3 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['expansion', 'international', 'routes']
    },
    {
      id: '6',
      title: 'IndiGo Partners with Microsoft for Next-Generation Digital Transformation',
      excerpt: 'Strategic partnership leverages cloud computing and AI to enhance operational efficiency and customer experience.',
      date: '2024-10-30',
      category: 'Partnerships',
      readTime: '4 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['partnership', 'technology', 'digital']
    }
  ];

  const mediaAssets: MediaAsset[] = [
    {
      id: '1',
      name: 'IndiGo Primary Logo',
      type: 'logo',
      format: 'SVG, PNG',
      size: '2.3 MB',
      description: 'High-resolution IndiGo logo in multiple formats',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Aircraft Fleet Images',
      type: 'image',
      format: 'JPG',
      size: '15.7 MB',
      description: 'Professional photos of IndiGo aircraft in various settings',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'Executive Headshots',
      type: 'image',
      format: 'JPG',
      size: '8.2 MB',
      description: 'Professional headshots of leadership team',
      downloadUrl: '#'
    },
    {
      id: '4',
      name: 'Company Fact Sheet 2024',
      type: 'document',
      format: 'PDF',
      size: '1.8 MB',
      description: 'Comprehensive company overview with key statistics',
      downloadUrl: '#'
    },
    {
      id: '5',
      name: 'Brand Guidelines',
      type: 'document',
      format: 'PDF',
      size: '12.5 MB',
      description: 'Complete brand identity and usage guidelines',
      downloadUrl: '#'
    },
    {
      id: '6',
      name: 'CEO Interview Video',
      type: 'video',
      format: 'MP4',
      size: '245 MB',
      description: 'Recent interview with CEO about company vision',
      downloadUrl: '#'
    }
  ];

  const awards = [
    {
      year: '2024',
      title: 'World\'s Leading Low-Cost Airline',
      organization: 'World Travel Awards',
      description: 'Recognized for exceptional customer service and operational excellence'
    },
    {
      year: '2024',
      title: 'Best Airline in India',
      organization: 'TripAdvisor Travelers\' Choice',
      description: 'Voted by millions of travelers worldwide'
    },
    {
      year: '2023',
      title: 'Most Punctual Airline',
      organization: 'OAG Aviation Worldwide',
      description: 'Leading on-time performance globally'
    },
    {
      year: '2023',
      title: 'Excellence in Innovation',
      organization: 'Aviation Business Awards',
      description: 'Recognition for digital transformation initiatives'
    }
  ];

  const categories = ['all', 'Financial Results', 'Technology', 'Awards', 'Sustainability', 'Route Expansion', 'Partnerships'];
  const years = ['all', '2024', '2023', '2022', '2021'];

  const filteredReleases = pressReleases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || release.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || release.date.startsWith(selectedYear);
    
    return matchesSearch && matchesCategory && matchesYear;
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
                  <Newspaper className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">IndiGo Press Center</h1>
                  <p className="text-primary-200 text-body2">Latest news, media resources, and company updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured News */}
        <div className="mb-20">
          <h2 className="text-h2 text-primary mb-12 text-center">Latest News</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {pressReleases.filter(release => release.featured).slice(0, 2).map((release) => (
              <div key={release.id} className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300">
                <div className="relative h-64">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                    Featured
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-body2 mb-2">{release.category}</p>
                    <h3 className="text-h5 font-bold leading-tight">{release.title}</h3>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-body1 text-secondary mb-6 leading-relaxed">{release.excerpt}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-secondary text-body2">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(release.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{release.readTime}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {release.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-body2 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button className="flex-1 btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                      <span>Read Full Story</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 px-6">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card-elevated p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-2 floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="press-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="press-search">Search press releases</label>
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
            
            <div className="floating-label">
              <select
                className="input-box"
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
              <label htmlFor="year-filter">Year</label>
            </div>
          </div>
          
          <p className="text-body1 text-secondary">
            Showing {filteredReleases.length} of {pressReleases.length} press releases
          </p>
        </div>

        {/* Press Releases Archive */}
        <div className="mb-20">
          <h2 className="text-h2 text-primary mb-12 text-center">Press Release Archive</h2>
          
          <div className="space-y-8">
            {filteredReleases.map((release) => (
              <div key={release.id} className="card-elevated p-8 hover:shadow-elevation-3 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-body2 font-medium">
                        {release.category}
                      </span>
                      <div className="flex items-center space-x-2 text-secondary text-body2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(release.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-secondary text-body2">
                        <Clock className="h-4 w-4" />
                        <span>{release.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-h4 text-primary mb-4 hover:text-primary-600 cursor-pointer transition-colors">
                      {release.title}
                    </h3>
                    
                    <p className="text-body1 text-secondary mb-6 leading-relaxed">{release.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {release.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-body2"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                        Read More
                      </button>
                      <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50">
                        <Download className="h-5 w-5 mr-2" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={release.image}
                      alt={release.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    {release.featured && (
                      <div className="absolute top-4 right-4 bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                        Featured
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Kit */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Media Kit</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Download high-resolution assets, logos, and official company information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaAssets.map((asset) => (
              <div key={asset.id} className="card-elevated p-8 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-primary-100 rounded-2xl p-3">
                    {asset.type === 'logo' && <Image className="h-8 w-8 text-primary-600" />}
                    {asset.type === 'image' && <Image className="h-8 w-8 text-primary-600" />}
                    {asset.type === 'video' && <Monitor className="h-8 w-8 text-primary-600" />}
                    {asset.type === 'document' && <FileText className="h-8 w-8 text-primary-600" />}
                  </div>
                  <div>
                    <h3 className="text-h6 text-primary font-bold">{asset.name}</h3>
                    <p className="text-body2 text-secondary">{asset.format} • {asset.size}</p>
                  </div>
                </div>
                
                <p className="text-body1 text-secondary mb-6 leading-relaxed">{asset.description}</p>
                
                <button className="w-full btn-contained bg-success-500 hover:bg-success-600 text-white">
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Awards & Recognition</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Industry recognition for our commitment to excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="card-elevated p-8 flex items-start space-x-6">
                <div className="bg-warning-100 rounded-2xl p-4 flex-shr">
                  <Trophy className="h-8 w-8 text-warning-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-h5 text-primary font-bold">{award.title}</h3>
                    <span className="bg-warning-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-body1 font-medium text-secondary mb-2">{award.organization}</p>
                  <p className="text-body2 text-secondary">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Fact Sheet */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Company Fact Sheet</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Key information about IndiGo at a glance
            </p>
          </div>

          <div className="card-elevated p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-h4 text-primary mb-6">Company Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Founded</span>
                    <span className="text-body1 text-secondary">2006</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Headquarters</span>
                    <span className="text-body1 text-secondary">Gurgaon, India</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">CEO</span>
                    <span className="text-body1 text-secondary">Pieter Elbers</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Employees</span>
                    <span className="text-body1 text-secondary">25,000+</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Stock Symbol</span>
                    <span className="text-body1 text-secondary">NSE: INDIGO</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-h4 text-primary mb-6">Operational Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Fleet Size</span>
                    <span className="text-body1 text-secondary">300+ aircraft</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Destinations</span>
                    <span className="text-body1 text-secondary">85+ domestic and international</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Daily Flights</span>
                    <span className="text-body1 text-secondary">1,600+</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Annual Passengers</span>
                    <span className="text-body1 text-secondary">100+ million</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-body1 font-medium text-primary">Market Share</span>
                    <span className="text-body1 text-secondary">55%+ domestic</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                <Download className="h-5 w-5" />
                <span>Download Complete Fact Sheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Media Contacts */}
        <div className="card-elevated p-12 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-primary mb-6">Media Contacts</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              For press inquiries, interview requests, and media information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-primary-100 rounded-3xl p-6 w-fit mx-auto mb-6">
                <Mail className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-3">Email</h3>
              <p className="text-body1 text-secondary mb-4">For general press inquiries</p>
              <a href="mailto:press@indigo.com" className="text-h6 text-primary-500 hover:text-primary-600 transition-colors">
                press@indigo.com
              </a>
            </div>
            
            <div className="card p-8 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-secondary-100 rounded-3xl p-6 w-fit mx-auto mb-6">
                <Phone className="h-10 w-10 text-secondary-600" />
              </div>
              <h3 className="text-h5 text-primary mb-3">Press Hotline</h3>
              <p className="text-body1 text-secondary mb-4">Available 24/7 for urgent inquiries</p>
              <a href="tel:+911234567890" className="text-h6 text-primary-500 hover:text-primary-600 transition-colors">
                +91 123 456 7890
              </a>
            </div>
            
            <div className="card p-8 text-center hover:shadow-elevation-2 transition-all duration-300">
              <div className="bg-success-100 rounded-3xl p-6 w-fit mx-auto mb-6">
                <Link className="h-10 w-10 text-success-600" />
              </div>
              <h3 className="text-h5 text-primary mb-3">Media Relations</h3>
              <p className="text-body1 text-secondary mb-4">For interview requests and features</p>
              <p className="text-h6 text-primary">Priya Sharma</p>
              <p className="text-body1 text-secondary">Head of Media Relations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;