import { Service, Project, Testimonial, FAQItem, ProcessStep } from './types';

export const SERVICES: Service[] = [
  {
    id: 'interior-design',
    title: 'Interior Design',
    description: 'Bespoke conceptualization, architectural layouts, 3D visualizations, and spatial curation tailored to your lifestyle.',
    category: 'interior',
    iconName: 'Compass',
    features: ['3D Photorealistic Renderings', 'Spatial Optimization & Floorplans', 'Color, Material, & Finish Curation', 'Custom Decorative Lighting Layouts']
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation',
    description: 'Complete high-end transformation of residential properties from structural redesigns to luxury finishes.',
    category: 'renovation',
    iconName: 'Home',
    features: ['Complete Structural Redesign', 'Premium Material Integration', 'Modern Layout Modernization', 'Luxury Finishing Standards']
  },
  {
    id: 'office-renovation',
    title: 'Office Renovation',
    description: 'Transform outdated workspaces into productive, collaborative, and highly aesthetic corporate environments.',
    category: 'renovation',
    iconName: 'Briefcase',
    features: ['Ergonomic Interior Planning', 'Corporate Identity Integration', 'Acoustic & Lighting Optimization', 'Minimal-Disruption Execution']
  },
  {
    id: 'civil-works',
    title: 'Civil Works',
    description: 'Professional structural modification, masonry, concrete foundation, and precision engineering works.',
    category: 'civil',
    iconName: 'HardHat',
    features: ['Structural Reinforcements', 'Foundations & Slabs', 'Brickwork & Premium Masonry', 'Anti-dampness Treatment']
  },
  {
    id: 'modular-kitchen',
    title: 'Modular Kitchen',
    description: 'State-of-the-art Italian & German styled modular kitchens with ergonomic space optimization and smart hardware.',
    category: 'interior',
    iconName: 'ChefHat',
    features: ['Premium Soft-Close Cabinetry', 'Quartz & Calacatta Stone Countertops', 'Smart Pull-out Storage Systems', 'Seamless Appliance Integration']
  },
  {
    id: 'modular-wardrobes',
    title: 'Modular Wardrobes',
    description: 'Elegant walk-in wardrobes and sliding storage solutions blending luxurious aesthetics with supreme organization.',
    category: 'interior',
    iconName: 'Layers',
    features: ['Custom Walk-in Closet Layouts', 'Integrated Warm LED Sensor Lighting', 'Premium Tinted Glass Sliding Doors', 'Soft-Close Smart Fittings']
  },
  {
    id: 'custom-furniture',
    title: 'Custom Furniture',
    description: 'Handcrafted premium furniture pieces tailored in size, upholstery, and wood finish to complement your decor.',
    category: 'interior',
    iconName: 'Armchair',
    features: ['Elite Teak & Hardwood Crafting', 'Luxury Fabric & Leather Selection', 'Bespoke Sofas & Dining Sets', 'Precision Joinery Details']
  },
  {
    id: 'false-ceiling',
    title: 'False Ceiling (POP)',
    description: 'Sophisticated architectural ceilings with integrated cove lighting, acoustic properties, and pristine plaster finish.',
    category: 'interior',
    iconName: 'Grid',
    features: ['Gypsum Board Architectural Art', 'Concealed LED Strip Channels', 'Modern Cove & Radial Designs', 'Acoustic Dampening Solutions']
  },
  {
    id: 'wall-painting',
    title: 'Wall Painting',
    description: 'Impeccable wall preparation, smoothing, and double-layer ultra-premium emulsion applications for a silky touch.',
    category: 'interior',
    iconName: 'Paintbrush',
    features: ['Multi-Stage Putty Sanding', 'Premium Royal Emulsion Paint', 'Crisp Baseboard Segregations', 'Environment-Friendly Low VOC']
  },
  {
    id: 'texture-painting',
    title: 'Texture Painting',
    description: 'Exquisite metallic, stucco, and artistic plaster finishing styles designed to create custom feature walls.',
    category: 'interior',
    iconName: 'Palette',
    features: ['Italian Stucco & Marmorino', 'Metallic Sand & Rust Textures', 'Custom Geometric Plaster Art', 'Accented Shadow Enhancements']
  },
  {
    id: 'tiles-flooring',
    title: 'Tiles & Flooring',
    description: 'Precision laying of large-format Italian marble, vitrified tiles, engineered hardwood, or custom parquet flooring.',
    category: 'civil',
    iconName: 'SquareDot',
    features: ['Seamless Marble Grouting', 'Large Format Vitrified Tile Fitting', 'Premium Parquet & Engineered Wood', 'Anti-Slip Exterior Tiling']
  },
  {
    id: 'electrical-services',
    title: 'Electrical Services',
    description: 'Safe, certified high-end automation wiring, distribution boards, spatial light grouping, and luxury fixture installs.',
    category: 'civil',
    iconName: 'Zap',
    features: ['Concealed ISI Fire-Resistant Cabling', 'Home Automation Pre-Wiring', 'Smart Panel Installations', 'Custom Designer Fixture Hanging']
  },
  {
    id: 'plumbing-services',
    title: 'Plumbing Services',
    description: 'Premium drainage systems, pressure pumps, concealed water lines, and sanitaryware installations.',
    category: 'civil',
    iconName: 'Droplet',
    features: ['Corrosion-Free PPR/CPVC Piping', 'Concealed Multi-Way Diverters', 'High-Pressure Water Pump Loops', 'Precision Sanitaryware Anchoring']
  },
  {
    id: 'bathroom-renovation',
    title: 'Bathroom Renovation',
    description: 'Converting regular bathrooms into bespoke wellness spas with premium vanity, walk-in shower, and marble tiling.',
    category: 'renovation',
    iconName: 'Sparkles',
    features: ['Spa Shower Multi-Jets', 'Bespoke Floating Vanities', 'Frameless Toughened Glass Partitions', 'Underfloor Heating Preparation']
  },
  {
    id: 'space-planning',
    title: 'Space Planning',
    description: 'Detailed layout engineering to maximize spatial flow, natural ventilation, and ergonomic utility in homes or offices.',
    category: 'interior',
    iconName: 'Maximize',
    features: ['Micro-Climate & Daylight Analysis', 'Traffic Flow Optimization', 'Zoning & Demarcation Outlines', 'Multi-functional Convertible Spaces']
  },
  {
    id: 'wooden-work',
    title: 'Wooden Work',
    description: 'Fine carpentry, premium wood cladding, ornate door frames, and customized architectural timber details.',
    category: 'interior',
    iconName: 'Scissors',
    features: ['Decorative Fluted Wall Panels', 'Solid Wood Main Entrance Doors', 'Architectural Partition Screens', 'Artisan Timber Molding']
  },
  {
    id: 'turnkey-interior-projects',
    title: 'Turnkey Interior Projects',
    description: 'Inception-to-key-handover execution, coordinating drafts, materials, labor, and flawless timelines on your behalf.',
    category: 'interior',
    iconName: 'Key',
    features: ['Zero-Stress Single Point of Contact', 'Rigid Timeline Commitment', 'Full Sourcing & Quality Checks', 'Broom-Clean Luxury Delivery']
  },
  {
    id: 'commercial-interior-solutions',
    title: 'Commercial Interior Solutions',
    description: 'Aesthetic, branded corporate environments, cafes, and executive salons tailored for heavy traffic and commercial prestige.',
    category: 'interior',
    iconName: 'Building',
    features: ['Heavy Duty Class Wear-Residues', 'Branded Interior Architectural Integration', 'Safety & Emergency Layout Compliances', 'Premium Aesthetic First Impression']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'The Obsidian Living Room',
    location: 'DLF Magnolias, Golf Course Road, Gurugram',
    category: 'Living Rooms',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    size: '4,500 Sq. Ft.',
    scope: 'Complete Premium Turnkey Interior'
  },
  {
    id: 'proj-2',
    title: 'Aurelia Bespoke Culinary Studio',
    location: 'Greater Kailash II, New Delhi',
    category: 'Modular Kitchens',
    image: '/src/assets/images/luxury_kitchen_1781267417904.jpg',
    size: '650 Sq. Ft.',
    scope: 'Luxury Modular Concept & Italian Quartz'
  },
  {
    id: 'proj-3',
    title: 'Verve Executive Corporate Headquarters',
    location: 'Sector 62 Enterprise Zone, Noida, NCR',
    category: 'Office Interiors',
    image: '/src/assets/images/luxury_office_1781267434698.jpg',
    size: '12,000 Sq. Ft.',
    scope: 'Premium Corporate Fit-out & Renovation'
  },
  {
    id: 'proj-4',
    title: 'Elysian Master Bedroom Chamber',
    location: 'Lutyens Bungalow Zone adjacent, New Delhi',
    category: 'Bedrooms',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=800',
    size: '1,200 Sq. Ft.',
    scope: 'Custom Carpentry & Layered Accent Lighting'
  },
  {
    id: 'proj-5',
    title: 'Carrara Premium Wellness Spa Washroom',
    location: 'Omaxe Forest Spa Luxury Complex, Noida Sector 93B',
    category: 'Bathrooms',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800',
    size: '480 Sq. Ft.',
    scope: 'Premium Sanitaryware & Italian Marble Cladding'
  },
  {
    id: 'proj-6',
    title: 'Floating Geometric POP Suspended Ceiling',
    location: 'Sushant Lok Phase I, Gurugram',
    category: 'False Ceiling Projects',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    size: '2,800 Sq. Ft.',
    scope: 'Custom Cove Channel Lighting'
  },
  {
    id: 'proj-7',
    title: 'Zenit Industrial Structural Foundation',
    location: 'Ecotech III Heavy Industrial Park, Greater Noida',
    category: 'Civil Work Projects',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    size: '18,500 Sq. Ft.',
    scope: 'Heavy Grade Concrete Columns & Foundations'
  },
  {
    id: 'proj-8',
    title: 'Lumina Premium Boutique Showroom',
    location: 'South Extension II Premium Market, New Delhi',
    category: 'Commercial Projects',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    size: '5,000 Sq. Ft.',
    scope: 'High-Density Structural Renovation'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Siddharth Roy (Senior VP, Tech Firm)',
    projectType: 'Turnkey Residential Duplex (Sector 150, Noida)',
    review: 'ZAYNOVA redefined our expectation of design and execution. From initial consultations to final detailing, their professional site supervisors coordinated every milestone flawlessly. Our home was completed precisely on time with top-grade luxury finishes.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Elena D\'Souza (Premium Homeowner)',
    projectType: 'Bespoke Modular Kitchen & Closet Curation (Greater Kailash II)',
    review: 'The absolute transparency in their pricing model is highly commendable. Every material selected was checked against original quality certifications, and the final execution matches the photorealistic 3D drawings perfectly. Superb modular systems.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Rajesh Malhotra (Managing Director, Retail Group)',
    projectType: 'Corporate Headquarters Office fit-out (Gurugram Sector 43)',
    review: 'Execution with zero disturbance to our working team operating on the adjacent floor was a massive win. ZAYNOVA\'s civil and wooden carpentry crew worked systematically, delivering premium high-gloss work exactly on the promised timeline.',
    rating: 5
  },
  {
    id: 't-4',
    name: 'Aanya Sen (Interior Design Consultant)',
    projectType: 'Bespoke Bathroom Concept & Architectural Ceiling (Vasant Kunj)',
    review: 'ZAYNOVA delivered a flawless wellness sanctuary right inside my washroom layout. Their attention to luxury CP fittings, drainage details, and flawless anti-dampness treatments shows supreme craftsmanship. Extremely trustworthy partners.',
    rating: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Free Site Visit',
    description: 'Expert site evaluation and preliminary space mapping conducted free of charge.',
    iconName: 'MapPin'
  },
  {
    stepNumber: '02',
    title: 'Measurement & Consultation',
    description: 'Laser-accurate measurements coupled with functional lifestyle mapping dialogues.',
    iconName: 'Maximize'
  },
  {
    stepNumber: '03',
    title: 'Quotation & Planning',
    description: 'Uncompromisingly transparent line-item proposals with premium material choices.',
    iconName: 'FileText'
  },
  {
    stepNumber: '04',
    title: 'Material Selection',
    description: 'Guided walkthroughs at premium showrooms to select verified woods, stones, and fixtures.',
    iconName: 'Award'
  },
  {
    stepNumber: '05',
    title: 'Project Execution',
    description: 'Under dedicated on-site engineering supervision and elite craftsmanship execution.',
    iconName: 'Cpu'
  },
  {
    stepNumber: '06',
    title: 'Quality Inspection',
    description: 'Strict 120-point quality check checklists covering levels, alignments, finishes, and tests.',
    iconName: 'CheckCircle'
  },
  {
    stepNumber: '07',
    title: 'Project Handover',
    description: 'Broom-clean professional handover of your timeless, high-finish luxury dream space.',
    iconName: 'Feather'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does the renovation process work with ZAYNOVA?',
    answer: 'Our process is highly structured. It begins with a Free Site Visit and detailed Consultation, followed by 3D design drafts and an itemized transparent estimate. Once approved, we curate materials with you, initiate skilled execution supervised by dedicated site managers, perform a rigorous multi-point quality check, and deliver a clean project handover.'
  },
  {
    id: 'faq-2',
    question: 'How long does a typical luxury interior/renovation project take?',
    answer: 'A standard modular kitchen or selective living room renovaiton takes roughly 3 to 4 weeks. A full residential turnkey interior or commercial office fit-out spans 6 to 10 weeks depending on structural modifications and raw civil scope required. We declare a rigid timeline schedule in our initial contract.'
  },
  {
    id: 'faq-3',
    question: 'Do you provide complete turnkey solutions?',
    answer: 'Yes. ZAYNOVA specializes as a single point of responsibility. We handle design, supply, modular carpentry, structural civil works, electrical fittings, plumbing loops, False Ceiling POP work, painting, and cleaning. You stand back and receive the keys upon completion.'
  },
  {
    id: 'faq-4',
    question: 'Can I request a free site visit to my location?',
    answer: 'Absolutely. We offer complete complimentary, non-obligatory on-site measurement and engineering consultations. Click "Book Free Site Visit" to register your contact, and we will schedule an on-site expert within 24-48 hours.'
  },
  {
    id: 'faq-5',
    question: 'Do you offer customized furniture or just ready-made modules?',
    answer: 'We operate both: precision-engineered modular units (Italian kitchen lines, soft-close wardrobes) and heavy bespoke joinery. Our master craftsmen build custom sofas, bespoke mahogany dining tables, wall paneling, and partition grids to match the precise scale of your project.'
  },
  {
    id: 'faq-6',
    question: 'What geographic locations does ZAYNOVA serve?',
    answer: 'We serve premium clients across metropolitan centers, handling luxury flats, penthouse properties, boutique office renovations, and private developer civil structures. Contact our sales desk to check service availability for your specific location coordinates.'
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Experienced Execution Team',
    description: 'Led by premium interior architects and civil engineers who have delivered exquisite, elite spaces since our inception.',
    iconName: 'Users'
  },
  {
    title: 'Transparent Pricing Structure',
    description: 'No hidden clauses. Fully itemized, quantity-verified quotations outlining exact cost metrics.',
    iconName: 'TrendingUp'
  },
  {
    title: 'Premium Quality Materials',
    description: 'Exclusive partnerships with top quality plywoods, anti-fingerprint laminates, and elite hardware.',
    iconName: 'ShieldAlert'
  },
  {
    title: 'Dedicated Project Management',
    description: 'A single, dedicated project supervisor on-site daily, keeping you updated with real-time photo channels.',
    iconName: 'FolderKanban'
  },
  {
    title: 'Skilled Workforce',
    description: 'Our carpenters, tilers, painters, and fabricators are top-tier craft masters with vetted field experts.',
    iconName: 'Flame'
  },
  {
    title: 'Attention To Detail',
    description: 'Aesthetic perfection down to the millimeter – perfect miter joints, premium laser alignments, polished lines.',
    iconName: 'Sparkles'
  },
  {
    title: 'Timely Delivery',
    description: 'Rigid baseline timelines tied directly to contractual clauses. On-time delivery, no exceptions.',
    iconName: 'Calendar'
  },
  {
    title: 'Client-Centric Approach',
    description: 'Every space is styled, calibrated, and custom-engineered strictly matching user behavioral ergonomics.',
    iconName: 'Smile'
  },
  {
    title: 'Luxury Finishing Standards',
    description: 'Flawless luster, high-shine or deep matte finishes, premium concealed loops, and elegant shadow details.',
    iconName: 'Crown'
  }
];

export const TRUST_INDICATORS = [
  { title: 'Professional Project Execution', desc: 'Managed by licensed, experienced engineers.' },
  { title: 'Transparent Pricing', desc: 'Fully itemized line items with no surprise markup.' },
  { title: 'On-Time Delivery', desc: 'Milestone tracking schedules guaranteed contractually.' },
  { title: 'Dedicated Site Supervision', desc: 'On-site managers to log everyday quality.' },
  { title: 'Premium Finishing', desc: 'Precision joints, high emulsion smoothness, perfect seal.' },
  { title: 'End-To-End Solutions', desc: 'From site layouts to polishing and broom cleanups.' }
];

export const STATS = [
  { label: 'Projects Completed', value: '115', suffix: '+' },
  { label: 'Years of Experience', value: '4', suffix: '+' },
  { label: 'Happy Clients', value: '98', suffix: '+' },
  { label: 'Site Visits Conducted', value: '290', suffix: '+' }
];
