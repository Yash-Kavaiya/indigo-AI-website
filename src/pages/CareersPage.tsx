import React, { useState } from 'react';
import { 
  ArrowLeft, Briefcase, Search, MapPin, Clock, 
  Users, TrendingUp, Heart, Globe, Award, CheckCircle,
  ArrowRight, Filter, Star, Zap, Shield, Lightbulb, Coffee
} from 'lucide-react';

interface CareersPageProps {
  onNavigateHome: () => void;
}

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  level: 'Entry' | 'Mid' | 'Senior' | 'Executive';
  description: string;
  requirements: string[];
  posted: string;
  applications: number;
  urgent: boolean;
}

const CareersPage: React.FC<CareersPageProps> = ({ onNavigateHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const jobOpenings: JobOpening[] = [
    {
      id: '1',
      title: 'Senior Software Engineer - AI/ML',
      department: 'Technology',
      location: 'Bangalore',
      type: 'Full-time',
      level: 'Senior',
      description: 'Lead the development of AI-powered travel recommendations and predictive analytics systems.',
      requirements: ['5+ years in ML/AI', 'Python, TensorFlow', 'Cloud platforms', 'Travel industry experience preferred'],
      posted: '2 days ago',
      applications: 127,
      urgent: true
    },
    {
      id: '2',
      title: 'Cabin Crew - International Routes',
      department: 'Operations',
      location: 'Delhi',
      type: 'Full-time',
      level: 'Entry',
      description: 'Provide exceptional customer service and ensure passenger safety on international flights.',
      requirements: ['Height 157cm+', 'Swimming ability', 'Multiple languages', 'Customer service experience'],
      posted: '1 week ago',
      applications: 342,
      urgent: false
    },
    {
      id: '3',
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Mumbai',
      type: 'Full-time',
      level: 'Mid',
      description: 'Drive digital marketing campaigns and enhance brand presence across digital channels.',
      requirements: ['3+ years digital marketing', 'Google Ads, Facebook Ads', 'Analytics tools', 'Creative mindset'],
      posted: '3 days ago',
      applications: 89,
      urgent: true
    },
    {
      id: '4',
      title: 'Aircraft Maintenance Engineer',
      department: 'Engineering',
      location: 'Hyderabad',
      type: 'Full-time',
      level: 'Mid',
      description: 'Ensure aircraft safety and compliance through thorough maintenance and inspections.',
      requirements: ['AME License', '3+ years experience', 'A320 family preferred', 'Safety-first mindset'],
      posted: '5 days ago',
      applications: 156,
      urgent: false
    },
    {
      id: '5',
      title: 'Product Manager - Mobile App',
      department: 'Product',
      location: 'Bangalore',
      type: 'Full-time',
      level: 'Senior',
      description: 'Lead product strategy and development for our award-winning mobile application.',
      requirements: ['5+ years product management', 'Mobile app experience', 'User research', 'Agile methodologies'],
      posted: '1 day ago',
      applications: 73,
      urgent: true
    },
    {
      id: '6',
      title: 'Customer Service Representative',
      department: 'Customer Service',
      location: 'Chennai',
      type: 'Full-time',
      level: 'Entry',
      description: 'Provide excellent customer support and resolve passenger queries across multiple channels.',
      requirements: ['Excellent communication', 'Problem-solving skills', 'Shift flexibility', 'Computer proficiency'],
      posted: '4 days ago',
      applications: 201,
      urgent: false
    },
    {
      id: '7',
      title: 'Data Analyst - Revenue Management',
      department: 'Analytics',
      location: 'Mumbai',
      type: 'Full-time',
      level: 'Mid',
      description: 'Analyze pricing strategies and market trends to optimize revenue across all routes.',
      requirements: ['Statistics/Mathematics degree', 'SQL, Python, R', 'Data visualization', 'Analytical mindset'],
      posted: '6 days ago',
      applications: 94,
      urgent: false
    },
    {
      id: '8',
      title: 'Sustainability Manager',
      department: 'Sustainability',
      location: 'Delhi',
      type: 'Full-time',
      level: 'Senior',
      description: 'Lead sustainability initiatives and drive our carbon-neutral goals across operations.',
      requirements: ['Environmental science background', 'Sustainability reporting', 'Project management', 'Aviation knowledge'],
      posted: '1 week ago',
      applications: 67,
      urgent: false
    }
  ];

  const departments = ['all', 'Technology', 'Operations', 'Marketing', 'Engineering', 'Product', 'Customer Service', 'Analytics', 'Sustainability'];
  const locations = ['all', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'];
  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Intern'];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive medical insurance, wellness programs, and mental health support',
      color: 'error'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear career progression paths, mentorship programs, and leadership development',
      color: 'success'
    },
    {
      icon: Globe,
      title: 'Travel Benefits',
      description: 'Free and discounted flights, hotel partnerships, and travel allowances',
      color: 'primary'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Performance bonuses, awards, and appreciation programs for outstanding work',
      color: 'warning'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible working hours, remote work options, and generous leave policies',
      color: 'secondary'
    },
    {
      icon: Lightbulb,
      title: 'Learning & Development',
      description: 'Training programs, conference attendance, and skill development opportunities',
      color: 'primary'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      position: 'Senior Pilot',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'IndiGo has provided me with incredible growth opportunities. From a First Officer to Captain, the journey has been supported by excellent training and mentorship programs.',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      position: 'Lead Software Engineer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The technology team at IndiGo is innovative and forward-thinking. We\'re building cutting-edge solutions that impact millions of travelers every day.',
      rating: 5
    },
    {
      name: 'Anjali Patel',
      position: 'Cabin Crew Supervisor',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      quote: 'The diversity and inclusion at IndiGo is remarkable. I feel valued and empowered to contribute my best while serving passengers from all walks of life.',
      rating: 5
    }
  ];

  const cultureHighlights = [
    {
      icon: Users,
      title: 'Collaborative Environment',
      description: 'Cross-functional teams working together toward common goals'
    },
    {
      icon: Zap,
      title: 'Innovation Culture',
      description: 'Encouraging creative thinking and breakthrough solutions'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Uncompromising commitment to safety in everything we do'
    },
    {
      icon: Coffee,
      title: 'Work-Life Integration',
      description: 'Flexible policies that support personal and professional growth'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
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
                  <Briefcase className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">Careers at IndiGo</h1>
                  <p className="text-primary-200 text-body2">Build your career with India's leading airline</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-h2 text-primary mb-8">Join Our Growing Team</h2>
          <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto leading-relaxed">
            Be part of India's most preferred airline and help us connect people, places, and dreams. 
            Discover exciting career opportunities across technology, operations, and customer service.
          </p>
        </div>

        {/* Job Search & Filters */}
        <div className="card-elevated p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-2 floating-label">
              <input
                type="text"
                className="input-box"
                placeholder=" "
                id="job-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="job-search">Search jobs by title or keywords</label>
              <div className="absolute right-4 top-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="department-filter"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
              <label htmlFor="department-filter">Department</label>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="location-filter"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
              <label htmlFor="location-filter">Location</label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-body1 text-secondary">
              Showing {filteredJobs.length} of {jobOpenings.length} open positions
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-body2 text-secondary">Job Type:</span>
              <select
                className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card-elevated p-8 hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-h5 text-primary font-bold">{job.title}</h3>
                    {job.urgent && (
                      <span className="bg-error-500 text-white px-3 py-1 rounded-full text-body2 font-bold">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-secondary text-body2">
                    <span className="flex items-center space-x-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.department}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-body2 font-medium ${
                    job.level === 'Executive' ? 'bg-primary-100 text-primary-700' :
                    job.level === 'Senior' ? 'bg-secondary-100 text-secondary-700' :
                    job.level === 'Mid' ? 'bg-success-100 text-success-700' :
                    'bg-warning-100 text-warning-700'
                  }`}>
                    {job.level} Level
                  </div>
                </div>
              </div>
              
              <p className="text-body1 text-secondary mb-6 leading-relaxed">{job.description}</p>
              
              <div className="mb-6">
                <h4 className="text-h6 text-primary mb-3">Key Requirements:</h4>
                <div className="space-y-2">
                  {job.requirements.slice(0, 3).map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success-500" />
                      <span className="text-body2 text-secondary">{requirement}</span>
                    </div>
                  ))}
                  {job.requirements.length > 3 && (
                    <p className="text-body2 text-primary font-medium">
                      +{job.requirements.length - 3} more requirements
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-secondary text-body2">
                  <span>Posted {job.posted}</span>
                  <span className="mx-2">•</span>
                  <span>{job.applications} applications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-body2 text-secondary">
                    {job.applications < 50 ? 'Low' : job.applications < 150 ? 'Medium' : 'High'} competition
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                  <span>Apply Now</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 px-6">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits & Perks */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Why Choose IndiGo</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Comprehensive benefits and perks that support your personal and professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-elevated p-8 text-center hover:scale-105 transition-all duration-300">
                <div className={`bg-${benefit.color}-100 rounded-2xl p-4 w-fit mx-auto mb-6`}>
                  <benefit.icon className={`h-8 w-8 text-${benefit.color}-600`} />
                </div>
                <h3 className="text-h5 text-primary mb-4">{benefit.title}</h3>
                <p className="text-body1 text-secondary leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">What Our Team Says</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Hear from our employees about their experiences and growth at IndiGo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-elevated p-8">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-warning-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-body1 text-secondary italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-h6 text-primary font-bold">{testimonial.name}</h4>
                    <p className="text-body2 text-secondary">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Culture */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Our Culture</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              A workplace where innovation thrives, diversity is celebrated, and every voice matters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureHighlights.map((highlight, index) => (
              <div key={index} className="card p-6 text-center hover:shadow-elevation-2 transition-all duration-300">
                <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                  <highlight.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="text-h6 text-primary mb-3">{highlight.title}</h4>
                <p className="text-body2 text-secondary">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="card-elevated p-12 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-primary mb-6">Ready to Take Off?</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Join thousands of passionate professionals who are shaping the future of aviation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary-500 rounded-3xl p-6 w-fit mx-auto mb-6">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-h5 text-primary mb-4">1. Find Your Role</h3>
              <p className="text-body1 text-secondary">Browse our open positions and find the perfect match for your skills and interests.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-500 rounded-3xl p-6 w-fit mx-auto mb-6">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-h5 text-primary mb-4">2. Submit Application</h3>
              <p className="text-body1 text-secondary">Complete our online application with your resume and cover letter.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-success-500 rounded-3xl p-6 w-fit mx-auto mb-6">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-h5 text-primary mb-4">3. Join Our Team</h3>
              <p className="text-body1 text-secondary">After interviews and assessments, welcome to the IndiGo family!</p>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-contained bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-h6 px-12 py-4 shadow-elevation-2 hover:shadow-elevation-3">
              <Briefcase className="h-6 w-6" />
              <span>Browse All Openings</span>
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;