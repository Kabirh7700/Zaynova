export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'interior' | 'renovation' | 'civil' | 'all';
  iconName: string; // Dynamic rendering via lucide-react names
  longDescription?: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: 'Living Rooms' | 'Bedrooms' | 'Modular Kitchens' | 'Bathrooms' | 'Office Interiors' | 'False Ceiling Projects' | 'Civil Work Projects' | 'Commercial Projects';
  image: string;
  size: string;
  scope: string;
}

export interface Testimonial {
  id: string;
  name: string;
  projectType: string;
  review: string;
  rating: number;
  image?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TrustIndicator {
  title: string;
  description: string;
}
