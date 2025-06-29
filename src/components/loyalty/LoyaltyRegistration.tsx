import React, { useState } from 'react';
import { 
  UserPlus, CheckCircle, AlertCircle, Upload, 
  Mail, Phone, Calendar, MapPin, Shield, 
  Award, Gift, ArrowRight, ArrowLeft, Star
} from 'lucide-react';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
  };
  addressInfo: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  preferences: {
    preferredLanguage: string;
    communicationPreference: string[];
    dietaryPreference: string;
    seatPreference: string;
  };
  documents: {
    idProof: File | null;
    addressProof: File | null;
    photo: File | null;
  };
}

const LoyaltyRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: ''
    },
    addressInfo: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    preferences: {
      preferredLanguage: 'English',
      communicationPreference: [],
      dietaryPreference: '',
      seatPreference: ''
    },
    documents: {
      idProof: null,
      addressProof: null,
      photo: null
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      number: 1,
      title: 'Personal Information',
      description: 'Basic details and contact information',
      icon: UserPlus
    },
    {
      number: 2,
      title: 'Address Details',
      description: 'Your residential address',
      icon: MapPin
    },
    {
      number: 3,
      title: 'Travel Preferences',
      description: 'Customize your travel experience',
      icon: Star
    },
    {
      number: 4,
      title: 'Document Upload',
      description: 'Identity and address verification',
      icon: Shield
    },
    {
      number: 5,
      title: 'Confirmation',
      description: 'Review and submit application',
      icon: CheckCircle
    }
  ];

  const handleInputChange = (section: keyof FormData, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}.${field}`]: ''
      }));
    }
  };

  const handleFileUpload = (field: keyof FormData['documents'], file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.personalInfo.firstName) newErrors['personalInfo.firstName'] = 'First name is required';
        if (!formData.personalInfo.lastName) newErrors['personalInfo.lastName'] = 'Last name is required';
        if (!formData.personalInfo.email) newErrors['personalInfo.email'] = 'Email is required';
        if (!formData.personalInfo.phone) newErrors['personalInfo.phone'] = 'Phone number is required';
        if (!formData.personalInfo.dateOfBirth) newErrors['personalInfo.dateOfBirth'] = 'Date of birth is required';
        if (!formData.personalInfo.gender) newErrors['personalInfo.gender'] = 'Gender is required';
        break;
      case 2:
        if (!formData.addressInfo.address) newErrors['addressInfo.address'] = 'Address is required';
        if (!formData.addressInfo.city) newErrors['addressInfo.city'] = 'City is required';
        if (!formData.addressInfo.state) newErrors['addressInfo.state'] = 'State is required';
        if (!formData.addressInfo.pincode) newErrors['addressInfo.pincode'] = 'Pincode is required';
        break;
      case 4:
        if (!formData.documents.idProof) newErrors['documents.idProof'] = 'ID proof is required';
        if (!formData.documents.addressProof) newErrors['documents.addressProof'] = 'Address proof is required';
        if (!formData.documents.photo) newErrors['documents.photo'] = 'Photo is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentStep(5);
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="text"
                  className={`input-box ${errors['personalInfo.firstName'] ? 'border-error-500' : ''}`}
                  placeholder=" "
                  id="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                />
                <label htmlFor="firstName">First Name *</label>
                {errors['personalInfo.firstName'] && (
                  <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors['personalInfo.firstName']}</span>
                  </p>
                )}
              </div>
              
              <div className="floating-label">
                <input
                  type="text"
                  className={`input-box ${errors['personalInfo.lastName'] ? 'border-error-500' : ''}`}
                  placeholder=" "
                  id="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                />
                <label htmlFor="lastName">Last Name *</label>
                {errors['personalInfo.lastName'] && (
                  <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors['personalInfo.lastName']}</span>
                  </p>
                )}
              </div>
            </div>
            
            <div className="floating-label">
              <input
                type="email"
                className={`input-box ${errors['personalInfo.email'] ? 'border-error-500' : ''}`}
                placeholder=" "
                id="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              />
              <label htmlFor="email">Email Address *</label>
              <div className="absolute right-4 top-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              {errors['personalInfo.email'] && (
                <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors['personalInfo.email']}</span>
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="tel"
                  className={`input-box ${errors['personalInfo.phone'] ? 'border-error-500' : ''}`}
                  placeholder=" "
                  id="phone"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                />
                <label htmlFor="phone">Phone Number *</label>
                <div className="absolute right-4 top-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                {errors['personalInfo.phone'] && (
                  <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors['personalInfo.phone']}</span>
                  </p>
                )}
              </div>
              
              <div className="floating-label">
                <input
                  type="date"
                  className={`input-box ${errors['personalInfo.dateOfBirth'] ? 'border-error-500' : ''}`}
                  id="dateOfBirth"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                />
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <div className="absolute right-4 top-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                {errors['personalInfo.dateOfBirth'] && (
                  <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors['personalInfo.dateOfBirth']}</span>
                  </p>
                )}
              </div>
            </div>
            
            <div className="floating-label">
              <select
                className={`input-box ${errors['personalInfo.gender'] ? 'border-error-500' : ''}`}
                id="gender"
                value={formData.personalInfo.gender}
                onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <label htmlFor="gender">Gender *</label>
              {errors['personalInfo.gender'] && (
                <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors['personalInfo.gender']}</span>
                </p>
              )}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <div className="floating-label">
              <textarea
                className={`input-box h-24 resize-none ${errors['addressInfo.address'] ? 'border-error-500' : ''}`}
                placeholder=" "
                id="address"
                value={formData.addressInfo.address}
                onChange={(e) => handleInputChange('addressInfo', 'address', e.target.value)}
              />
              <label htmlFor="address">Complete Address *</label>
              {errors['addressInfo.address'] && (
                <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors['addressInfo.address']}</span>
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="text"
                  className={`input-box ${errors['addressInfo.city'] ? 'border-error-500' : ''}`}
                  placeholder=" "
                  id="city"
                  value={formData.addressInfo.city}
                  onChange={(e) => handleInputChange('addressInfo', 'city', e.target.value)}
                />
                <label htmlFor="city">City *</label>
                {errors['addressInfo.city'] && (
                  <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors['addressInfo.city']}</span>
                  </p>
                )}
              </div>
              
              <div className="floating-label">
                <input
                  type="text"
                  className={`input-box ${errors['addressInfo.state'] ? 'border-error-500' : ''}`}
                  placeholder=" "
                  id="state"
                  value={formData.addressInfo.state}
                  onChange={(e) => handleInputChange('addressInfo', 'state', e.target.value)}
                />
                <label htmlFor="state">State *</label>
                {errors['addressInfo.state'] && (
                  <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors['addressInfo.state']}</span>
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="floating-label">
                <input
                  type="text"
                  className={`input-box ${errors['addressInfo.pincode'] ? 'border-error-500' : ''}`}
                  placeholder=" "
                  id="pincode"
                  value={formData.addressInfo.pincode}
                  onChange={(e) => handleInputChange('addressInfo', 'pincode', e.target.value)}
                />
                <label htmlFor="pincode">Pincode *</label>
                {errors['addressInfo.pincode'] && (
                  <p className="text-error-500 text-body2 mt-2 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors['addressInfo.pincode']}</span>
                  </p>
                )}
              </div>
              
              <div className="floating-label">
                <select
                  className="input-box"
                  id="country"
                  value={formData.addressInfo.country}
                  onChange={(e) => handleInputChange('addressInfo', 'country', e.target.value)}
                >
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
                <label htmlFor="country">Country</label>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="floating-label">
                <select
                  className="input-box"
                  id="preferredLanguage"
                  value={formData.preferences.preferredLanguage}
                  onChange={(e) => handleInputChange('preferences', 'preferredLanguage', e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Punjabi">Punjabi</option>
                </select>
                <label htmlFor="preferredLanguage">Preferred Language</label>
              </div>
              
              <div className="floating-label">
                <select
                  className="input-box"
                  id="seatPreference"
                  value={formData.preferences.seatPreference}
                  onChange={(e) => handleInputChange('preferences', 'seatPreference', e.target.value)}
                >
                  <option value="">Select Preference</option>
                  <option value="window">Window</option>
                  <option value="aisle">Aisle</option>
                  <option value="middle">Middle</option>
                  <option value="no-preference">No Preference</option>
                </select>
                <label htmlFor="seatPreference">Seat Preference</label>
              </div>
            </div>
            
            <div className="floating-label">
              <select
                className="input-box"
                id="dietaryPreference"
                value={formData.preferences.dietaryPreference}
                onChange={(e) => handleInputChange('preferences', 'dietaryPreference', e.target.value)}
              >
                <option value="">Select Dietary Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="jain">Jain</option>
                <option value="diabetic">Diabetic</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="no-preference">No Preference</option>
              </select>
              <label htmlFor="dietaryPreference">Dietary Preference</label>
            </div>
            
            <div>
              <h4 className="text-h6 text-primary mb-4">Communication Preferences</h4>
              <div className="space-y-4">
                {[
                  { id: 'email', label: 'Email Notifications' },
                  { id: 'sms', label: 'SMS Alerts' },
                  { id: 'push', label: 'Push Notifications' },
                  { id: 'phone', label: 'Phone Calls' }
                ].map((option) => (
                  <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      checked={formData.preferences.communicationPreference.includes(option.id)}
                      onChange={(e) => {
                        const current = formData.preferences.communicationPreference;
                        const updated = e.target.checked 
                          ? [...current, option.id]
                          : current.filter(item => item !== option.id);
                        handleInputChange('preferences', 'communicationPreference', updated);
                      }}
                    />
                    <span className="text-body1 text-primary">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <div className="card bg-warning-50 border-2 border-warning-200 p-6">
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-warning-600 mt-1" />
                <div>
                  <h4 className="text-h6 text-warning-700 mb-2">Document Requirements</h4>
                  <ul className="text-body2 text-warning-600 space-y-1">
                    <li>• All documents must be clear and readable</li>
                    <li>• Accepted formats: JPG, PNG, PDF (max 5MB each)</li>
                    <li>• ID proof: Aadhaar, Passport, Driving License, Voter ID</li>
                    <li>• Address proof: Utility bill, Bank statement, Rental agreement</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: 'idProof' as keyof FormData['documents'], label: 'ID Proof', required: true },
                { key: 'addressProof' as keyof FormData['documents'], label: 'Address Proof', required: true },
                { key: 'photo' as keyof FormData['documents'], label: 'Passport Photo', required: true }
              ].map((doc) => (
                <div key={doc.key} className="space-y-4">
                  <h4 className="text-h6 text-primary">{doc.label} {doc.required && '*'}</h4>
                  <div className={`card border-2 border-dashed p-8 text-center hover:border-primary-300 transition-colors duration-200 ${
                    errors[`documents.${doc.key}`] ? 'border-error-500 bg-error-50' : 'border-gray-300'
                  }`}>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-body2 text-secondary mb-4">
                      {formData.documents[doc.key] 
                        ? `Selected: ${formData.documents[doc.key]?.name}`
                        : 'Click to upload or drag and drop'
                      }
                    </p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                      className="hidden"
                      id={`upload-${doc.key}`}
                    />
                    <label
                      htmlFor={`upload-${doc.key}`}
                      className="btn-outlined border-primary-500 text-primary-500 hover:bg-primary-50 cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                  {errors[`documents.${doc.key}`] && (
                    <p className="text-error-500 text-body2 flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors[`documents.${doc.key}`]}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="text-center space-y-8">
            <div className="card bg-success-50 border-2 border-success-200 p-12">
              <CheckCircle className="h-20 w-20 text-success-500 mx-auto mb-6" />
              <h3 className="text-h3 text-success-700 mb-4">Registration Successful!</h3>
              <p className="text-h4 font-normal text-success-600 mb-8">
                Welcome to IndiGo BluChip! Your membership application has been submitted successfully.
              </p>
              
              <div className="bg-white rounded-2xl p-8 mb-8">
                <h4 className="text-h5 text-primary mb-6">What happens next?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                      <Shield className="h-8 w-8 text-primary-600" />
                    </div>
                    <h5 className="text-h6 text-primary mb-2">Verification</h5>
                    <p className="text-body2 text-secondary">Documents will be verified within 24-48 hours</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-secondary-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                      <Mail className="h-8 w-8 text-secondary-600" />
                    </div>
                    <h5 className="text-h6 text-primary mb-2">Confirmation</h5>
                    <p className="text-body2 text-secondary">Email confirmation with membership details</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-success-100 rounded-2xl p-4 w-fit mx-auto mb-4">
                      <Gift className="h-8 w-8 text-success-600" />
                    </div>
                    <h5 className="text-h6 text-primary mb-2">Welcome Bonus</h5>
                    <p className="text-body2 text-secondary">500 BluChip points as joining bonus</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-contained bg-primary-500 hover:bg-primary-600 text-white">
                  <Award className="h-5 w-5" />
                  <span>View Membership Benefits</span>
                </button>
                <button className="btn-outlined border-secondary-500 text-secondary-500 hover:bg-secondary-50">
                  <Gift className="h-5 w-5" />
                  <span>Explore Offers</span>
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="card-elevated p-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                currentStep > step.number 
                  ? 'bg-success-500 text-white' 
                  : currentStep === step.number
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`hidden md:block w-24 h-1 ml-4 rounded-full transition-all duration-300 ${
                  currentStep > step.number ? 'bg-success-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h2 className="text-h4 text-primary mb-2">{steps[currentStep - 1]?.title}</h2>
          <p className="text-body1 text-secondary">{steps[currentStep - 1]?.description}</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="card-elevated p-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 5 && (
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn-outlined border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={currentStep === 4 ? handleSubmit : nextStep}
            disabled={isSubmitting}
            className="btn-contained bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : currentStep === 4 ? (
              <>
                <span>Submit Application</span>
                <CheckCircle className="h-5 w-5" />
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoyaltyRegistration;