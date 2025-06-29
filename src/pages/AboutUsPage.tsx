import React from 'react';
import { 
  ArrowLeft, Plane, Heart, Users, Globe, Award, 
  CheckCircle, Target, Eye, Shield, Leaf, Lightbulb,
  TrendingUp, Calendar, MapPin, Star, Quote, Linkedin
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigateHome: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigateHome }) => {
  const milestones = [
    { year: '2006', title: 'IndiGo Founded', description: 'Started with a vision to make air travel accessible and affordable for everyone in India' },
    { year: '2008', title: 'First Flight', description: 'Launched operations with inaugural flight from Delhi to Imphal' },
    { year: '2011', title: 'Market Leadership', description: 'Became India\'s largest airline by market share' },
    { year: '2015', title: 'IPO Launch', description: 'Successfully listed on stock exchanges, raising ₹3,018 crores' },
    { year: '2018', title: 'International Expansion', description: 'Expanded to international routes across Asia and Middle East' },
    { year: '2020', title: 'Digital Innovation', description: 'Launched AI-powered booking platform and contactless travel solutions' },
    { year: '2023', title: 'Sustainability Goals', description: 'Committed to net-zero carbon emissions by 2050' },
    { year: '2024', title: 'Global Recognition', description: 'Awarded World\'s Leading Low-Cost Airline for customer satisfaction' }
  ];

  const leadership = [
    {
      name: 'Rahul Bhatia',
      position: 'Co-Founder & Managing Director',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Visionary leader with over 25 years in aviation industry. Founded IndiGo with the mission to democratize air travel in India.',
      linkedin: '#'
    },
    {
      name: 'Pieter Elbers',
      position: 'Chief Executive Officer',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former KLM CEO bringing international expertise and strategic vision to IndiGo\'s global expansion.',
      linkedin: '#'
    },
    {
      name: 'Gaurav Negi',
      position: 'Chief Financial Officer',
      image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Finance expert driving operational efficiency and sustainable growth across all business verticals.',
      linkedin: '#'
    },
    {
      name: 'Summi Sharma',
      position: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Technology innovator leading digital transformation and AI initiatives to enhance customer experience.',
      linkedin: '#'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make starts with our customers. We are committed to providing exceptional service that exceeds expectations.',
      color: 'error'
    },
    {
      icon: Users,
      title: 'People Power',
      description: 'Our team members are our greatest asset. We foster a culture of respect, growth, and collaboration.',
      color: 'primary'
    },
    {
      icon: Shield,
      title: 'Safety Always',
      description: 'Safety is non-negotiable. We maintain the highest safety standards in every aspect of our operations.',
      color: 'success'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Drive',
      description: 'We continuously innovate to improve efficiency, reduce costs, and enhance the travel experience.',
      color: 'warning'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We are committed to reducing our environmental impact and contributing to a sustainable future.',
      color: 'secondary'
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'We strive for operational excellence in everything we do, setting industry benchmarks.',
      color: 'primary'
    }
  ];

  const achievements = [
    { metric: '300+', label: 'Aircraft Fleet', description: 'One of the largest fleets in Asia' },
    { metric: '100M+', label: 'Passengers Annually', description: 'Serving millions of travelers' },
    { metric: '85+', label: 'Destinations', description: 'Domestic and international routes' },
    { metric: '25,000+', label: 'Employees', description: 'Dedicated team members' },
    { metric: '50%+', label: 'Market Share', description: 'Leading Indian aviation market' },
    { metric: '90%+', label: 'On-Time Performance', description: 'Industry-leading punctuality' }
  ];

  const sustainability = [
    {
      icon: Leaf,
      title: 'Carbon Neutral by 2050',
      description: 'Committed to achieving net-zero carbon emissions through innovative technologies and sustainable practices.',
      progress: 75
    },
    {
      icon: Globe,
      title: 'Fuel Efficiency Program',
      description: 'Advanced aircraft technology and operational efficiency reducing fuel consumption by 20%.',
      progress: 85
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Supporting local communities through education, healthcare, and economic development initiatives.',
      progress: 60
    }
  ];

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
                  <Plane className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-h4 font-bold">About IndiGo</h1>
                  <p className="text-primary-200 text-body2">Leading the future of air travel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-h2 text-primary mb-8">Connecting India to the World</h2>
          <p className="text-h4 font-normal text-secondary max-w-4xl mx-auto leading-relaxed">
            Since 2006, IndiGo has been India's preferred airline, known for our on-time performance, 
            courteous service, and hassle-free travel experience. We connect people, places, and dreams 
            across India and beyond.
          </p>
        </div>

        {/* Mission, Vision & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="card-elevated p-10 text-center">
            <div className="bg-primary-100 rounded-3xl p-6 w-fit mx-auto mb-6">
              <Target className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-h4 text-primary mb-4">Our Mission</h3>
            <p className="text-body1 text-secondary leading-relaxed">
              To provide safe, efficient, and affordable air transportation that connects people 
              and enables economic growth across India and international markets.
            </p>
          </div>

          <div className="card-elevated p-10 text-center">
            <div className="bg-secondary-100 rounded-3xl p-6 w-fit mx-auto mb-6">
              <Eye className="h-12 w-12 text-secondary-600" />
            </div>
            <h3 className="text-h4 text-primary mb-4">Our Vision</h3>
            <p className="text-body1 text-secondary leading-relaxed">
              To be the most preferred airline in the world, known for our operational excellence, 
              customer satisfaction, and contribution to sustainable aviation.
            </p>
          </div>

          <div className="card-elevated p-10 text-center">
            <div className="bg-success-100 rounded-3xl p-6 w-fit mx-auto mb-6">
              <Heart className="h-12 w-12 text-success-600" />
            </div>
            <h3 className="text-h4 text-primary mb-4">Our Promise</h3>
            <p className="text-body1 text-secondary leading-relaxed">
              Delivering on-time performance, courteous service, and hassle-free travel experience 
              that makes every journey memorable and comfortable.
            </p>
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Our Core Values</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              These values guide every decision we make and every service we provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-elevated p-8 hover:scale-105 transition-all duration-300">
                <div className={`bg-${value.color}-100 rounded-2xl p-4 w-fit mb-6`}>
                  <value.icon className={`h-8 w-8 text-${value.color}-600`} />
                </div>
                <h3 className="text-h5 text-primary mb-4">{value.title}</h3>
                <p className="text-body1 text-secondary leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">By the Numbers</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Our achievements reflect our commitment to excellence and growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="card-elevated p-8 text-center hover:shadow-elevation-3 transition-all duration-300">
                <h3 className="text-h1 font-bold text-primary-600 mb-4">{achievement.metric}</h3>
                <h4 className="text-h5 text-primary mb-3">{achievement.label}</h4>
                <p className="text-body1 text-secondary">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Our Journey</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Key milestones that shaped our growth and success
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-elevated p-6">
                      <div className="bg-primary-500 text-white rounded-xl px-4 py-2 w-fit mb-4 mx-auto">
                        <span className="text-h6 font-bold">{milestone.year}</span>
                      </div>
                      <h3 className="text-h5 text-primary mb-3">{milestone.title}</h3>
                      <p className="text-body1 text-secondary">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full border-4 border-white shadow-elevation-2"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Leadership Team</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Experienced leaders driving our vision and strategic direction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="card-elevated overflow-hidden hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-h6 font-bold">{leader.name}</h3>
                    <p className="text-body2">{leader.position}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-body2 text-secondary mb-4 leading-relaxed">{leader.bio}</p>
                  <a
                    href={leader.linkedin}
                    className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-body2 font-medium">Connect</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Initiatives */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-primary mb-6">Sustainability Commitment</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              Building a sustainable future for aviation through innovation and responsibility
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sustainability.map((initiative, index) => (
              <div key={index} className="card-elevated p-8">
                <div className="bg-success-100 rounded-2xl p-4 w-fit mb-6">
                  <initiative.icon className="h-8 w-8 text-success-600" />
                </div>
                <h3 className="text-h5 text-primary mb-4">{initiative.title}</h3>
                <p className="text-body1 text-secondary mb-6 leading-relaxed">{initiative.description}</p>
                
                <div className="mb-3">
                  <div className="flex justify-between text-body2 mb-2">
                    <span className="text-secondary">Progress</span>
                    <span className="font-semibold text-primary">{initiative.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-success-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${initiative.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="card-elevated p-12 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-primary mb-6">Our Culture</h2>
            <p className="text-h4 font-normal text-secondary max-w-3xl mx-auto">
              A workplace where diversity thrives, innovation flourishes, and every team member contributes to our success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-500 rounded-2xl p-3 mt-1">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-h6 text-primary mb-2">Diversity & Inclusion</h4>
                    <p className="text-body1 text-secondary">We celebrate diversity and create an inclusive environment where everyone feels valued and empowered to contribute their best.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary-500 rounded-2xl p-3 mt-1">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-h6 text-primary mb-2">Growth & Development</h4>
                    <p className="text-body1 text-secondary">Continuous learning opportunities, mentorship programs, and career advancement paths for all team members.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-success-500 rounded-2xl p-3 mt-1">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-h6 text-primary mb-2">Recognition & Rewards</h4>
                    <p className="text-body1 text-secondary">We recognize and celebrate achievements, innovation, and exceptional contributions to our shared success.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card bg-white p-8 shadow-elevation-2">
              <div className="flex items-start space-x-4 mb-6">
                <Quote className="h-8 w-8 text-primary-500 mt-2" />
                <div>
                  <p className="text-body1 text-secondary italic mb-4">
                    "IndiGo is more than just an airline - it's a family where every member is valued, 
                    every idea matters, and every day brings new opportunities to make a difference 
                    in the lives of millions of travelers."
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100"
                      alt="CEO"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-body1 font-semibold text-primary">Pieter Elbers</p>
                      <p className="text-body2 text-secondary">Chief Executive Officer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;