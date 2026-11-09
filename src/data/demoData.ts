// Demo Data for Petopia — Animal Rescue & Welfare Platform
// All data is fictional and for demonstration purposes only

export const LOCATIONS = [
  'Miyapur', 'Kukatpally', 'Gachibowli', 'Madhapur', 'Kondapur',
  'Ameerpet', 'Begumpet', 'Secunderabad', 'Banjara Hills', 'Jubilee Hills',
  'HITEC City', 'Uppal', 'LB Nagar', 'Dilsukhnagar', 'Mehdipatnam'
];

export const RESCUE_TEAMS = [
  {
    id: 'rt-001',
    name: 'Hyderabad Animal Rescue Team',
    type: 'rescue',
    location: 'Miyapur',
    city: 'Hyderabad',
    phone: '+91-98765-11001',
    email: 'rescue@hart-demo.org',
    services: ['Emergency Rescue', 'Animal Transport', 'First Aid'],
    availability: 'available',
    rating: 4.9,
    ratingCount: 234,
    description: 'Premier animal rescue team serving Hyderabad since 2015. Specializing in emergency response and critical animal care.',
    coordinates: { lat: 17.4947, lng: 78.3996 },
    teamSize: 12,
    activeRescues: 3,
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=400&fit=crop'
  },
  {
    id: 'rt-002',
    name: 'Paws & Claws Rescue',
    type: 'rescue',
    location: 'Gachibowli',
    city: 'Hyderabad',
    phone: '+91-98765-11002',
    email: 'help@pawsclaws-demo.org',
    services: ['Street Animal Rescue', 'Rehabilitation', 'Medical Aid'],
    availability: 'available',
    rating: 4.7,
    ratingCount: 189,
    description: 'Community-driven rescue team focused on street animals and wildlife rehabilitation in the western Hyderabad region.',
    coordinates: { lat: 17.4435, lng: 78.3489 },
    teamSize: 8,
    activeRescues: 1,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop'
  },
  {
    id: 'rt-003',
    name: 'SecundraBad Animal Aid',
    type: 'rescue',
    location: 'Secunderabad',
    city: 'Hyderabad',
    phone: '+91-98765-11003',
    email: 'aid@secabad-demo.org',
    services: ['Emergency Response', 'Stray Management', 'Vaccination Drives'],
    availability: 'busy',
    rating: 4.6,
    ratingCount: 156,
    description: 'Serving the Secunderabad and surrounding areas with professional animal rescue and community welfare programs.',
    coordinates: { lat: 17.4399, lng: 78.4983 },
    teamSize: 10,
    activeRescues: 5,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&h=400&fit=crop'
  },
  {
    id: 'rt-004',
    name: 'GreenPaws Rescue Force',
    type: 'rescue',
    location: 'Kondapur',
    city: 'Hyderabad',
    phone: '+91-98765-11004',
    email: 'force@greenpaws-demo.org',
    services: ['Wildlife Rescue', 'Bird Rescue', 'Emergency Transport'],
    availability: 'available',
    rating: 4.8,
    ratingCount: 201,
    description: 'Specialized in wildlife and bird rescue operations across Hyderabad. Equipped with advanced animal handling equipment.',
    coordinates: { lat: 17.4604, lng: 78.3647 },
    teamSize: 7,
    activeRescues: 2,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop'
  },
];

export const SHELTERS = [
  {
    id: 'sh-001',
    name: 'Hyderabad Animal Shelter',
    type: 'shelter',
    location: 'Kukatpally',
    city: 'Hyderabad',
    phone: '+91-98765-22001',
    email: 'adopt@hasshelter-demo.org',
    services: ['Animal Adoption', 'Boarding', 'Grooming', 'Rehabilitation'],
    availability: 'available',
    rating: 4.8,
    ratingCount: 312,
    description: 'Largest animal shelter in Hyderabad, home to over 200 rescued animals. Dedicated to finding loving forever homes.',
    coordinates: { lat: 17.4849, lng: 78.4138 },
    capacity: 250,
    currentAnimals: 187,
    image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=400&fit=crop'
  },
  {
    id: 'sh-002',
    name: 'Compassion Shelter & Sanctuary',
    type: 'shelter',
    location: 'Madhapur',
    city: 'Hyderabad',
    phone: '+91-98765-22002',
    email: 'info@compassionshelter-demo.org',
    services: ['Adoption', 'Foster Programs', 'Animal Therapy', 'Education'],
    availability: 'available',
    rating: 4.7,
    ratingCount: 278,
    description: 'A sanctuary for abandoned and abused animals, with a focus on rehabilitation and community education programs.',
    coordinates: { lat: 17.4484, lng: 78.3908 },
    capacity: 150,
    currentAnimals: 112,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop'
  },
  {
    id: 'sh-003',
    name: 'Happy Tails Animal Home',
    type: 'shelter',
    location: 'Ameerpet',
    city: 'Hyderabad',
    phone: '+91-98765-22003',
    email: 'wag@happytails-demo.org',
    services: ['Adoption', 'Spay/Neuter Programs', 'Microchipping', 'Pet Food Bank'],
    availability: 'available',
    rating: 4.6,
    ratingCount: 198,
    description: 'Community shelter focusing on dog and cat adoption with comprehensive post-adoption support for new pet families.',
    coordinates: { lat: 17.4374, lng: 78.4482 },
    capacity: 100,
    currentAnimals: 78,
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&h=400&fit=crop'
  },
  {
    id: 'sh-004',
    name: 'Feathered & Furry Friends Sanctuary',
    type: 'shelter',
    location: 'Begumpet',
    city: 'Hyderabad',
    phone: '+91-98765-22004',
    email: 'friends@fff-demo.org',
    services: ['Bird Sanctuary', 'Exotic Pet Care', 'Wildlife Foster', 'Adoption'],
    availability: 'limited',
    rating: 4.9,
    ratingCount: 145,
    description: 'Specialized shelter for birds, exotic animals, and wildlife. Working closely with the forest department for wildlife conservation.',
    coordinates: { lat: 17.4418, lng: 78.4635 },
    capacity: 80,
    currentAnimals: 71,
    image: 'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=600&h=400&fit=crop'
  },
];

export const VET_CLINICS = [
  {
    id: 'vc-001',
    name: 'PetCare Veterinary Clinic',
    type: 'vet',
    location: 'Gachibowli',
    city: 'Hyderabad',
    phone: '+91-98765-33001',
    email: 'care@petcareclinic-demo.com',
    services: ['General Medicine', 'Surgery', 'Dentistry', 'Vaccinations', 'Emergency Care'],
    availability: 'available',
    rating: 4.9,
    ratingCount: 456,
    description: 'Full-service veterinary clinic with modern facilities, experienced team, and 24/7 emergency care.',
    coordinates: { lat: 17.4435, lng: 78.3489 },
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=600&h=400&fit=crop'
  },
  {
    id: 'vc-002',
    name: 'VetFirst Animal Hospital',
    type: 'vet',
    location: 'Banjara Hills',
    city: 'Hyderabad',
    phone: '+91-98765-33002',
    email: 'hospital@vetfirst-demo.com',
    services: ['Diagnostics', 'Orthopedics', 'Cardiology', 'Oncology', 'ICU'],
    availability: 'available',
    rating: 4.8,
    ratingCount: 389,
    description: 'Multi-specialty animal hospital with advanced diagnostic equipment, specialist veterinarians, and intensive care unit.',
    coordinates: { lat: 17.4126, lng: 78.4482 },
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad4736f8?w=600&h=400&fit=crop'
  },
  {
    id: 'vc-003',
    name: 'GreenVet Wellness Center',
    type: 'vet',
    location: 'HITEC City',
    city: 'Hyderabad',
    phone: '+91-98765-33003',
    email: 'wellness@greenvet-demo.com',
    services: ['Preventive Care', 'Nutrition Counseling', 'Alternative Therapy', 'Grooming'],
    availability: 'available',
    rating: 4.7,
    ratingCount: 234,
    description: 'Holistic veterinary center combining conventional medicine with alternative therapies for comprehensive pet wellness.',
    coordinates: { lat: 17.4504, lng: 78.3808 },
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&h=400&fit=crop'
  },
  {
    id: 'vc-004',
    name: 'CityVet Neighborhood Clinic',
    type: 'vet',
    location: 'Ameerpet',
    city: 'Hyderabad',
    phone: '+91-98765-33004',
    email: 'clinic@cityvet-demo.com',
    services: ['General Checkups', 'Vaccinations', 'Deworming', 'Minor Surgery'],
    availability: 'available',
    rating: 4.6,
    ratingCount: 178,
    description: 'Affordable neighborhood clinic making quality veterinary care accessible to all pet owners in Hyderabad.',
    coordinates: { lat: 17.4374, lng: 78.4482 },
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop'
  },
];

export const VETERINARIANS = [
  {
    id: 'vet-001',
    name: 'Dr. Priya Sharma',
    qualification: 'BVSc & AH, MVSc (Internal Medicine)',
    experience: 12,
    specialization: 'Small Animal Medicine',
    rating: 4.9,
    ratingCount: 234,
    fee: 149,
    availability: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    about: 'Dr. Priya Sharma is a highly experienced veterinarian specializing in small animal internal medicine. With over 12 years of practice, she has treated thousands of dogs and cats.',
    clinic: 'PetCare Veterinary Clinic, Gachibowli',
    languages: ['English', 'Hindi', 'Telugu'],
    isOnline: true
  },
  {
    id: 'vet-002',
    name: 'Dr. Rahul Reddy',
    qualification: 'BVSc & AH, MVSc (Surgery)',
    experience: 15,
    specialization: 'Veterinary Surgery & Orthopedics',
    rating: 4.8,
    ratingCount: 198,
    fee: 199,
    availability: ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    about: 'Dr. Rahul Reddy is a renowned veterinary surgeon with expertise in orthopedic procedures, soft tissue surgery, and post-operative care.',
    clinic: 'VetFirst Animal Hospital, Banjara Hills',
    languages: ['English', 'Telugu', 'Hindi'],
    isOnline: true
  },
  {
    id: 'vet-003',
    name: 'Dr. Ananya Krishnan',
    qualification: 'BVSc & AH, PhD (Veterinary Nutrition)',
    experience: 9,
    specialization: 'Pet Nutrition & Preventive Care',
    rating: 4.7,
    ratingCount: 167,
    fee: 99,
    availability: ['09:30 AM', '11:30 AM', '01:30 PM', '03:30 PM', '05:30 PM'],
    image: 'https://images.unsplash.com/photo-1594824813583-9993e507b938?w=400&h=400&fit=crop&crop=face',
    about: 'Dr. Ananya Krishnan is a nutrition and preventive care specialist helping pet owners understand the importance of diet and wellness in animal health.',
    clinic: 'GreenVet Wellness Center, HITEC City',
    languages: ['English', 'Tamil', 'Telugu'],
    isOnline: false
  },
  {
    id: 'vet-004',
    name: 'Dr. Suresh Kumar',
    qualification: 'BVSc & AH, MVSc (Dermatology)',
    experience: 11,
    specialization: 'Veterinary Dermatology & Allergy',
    rating: 4.6,
    ratingCount: 145,
    fee: 129,
    availability: ['10:30 AM', '12:30 PM', '02:30 PM', '04:30 PM'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    about: 'Dr. Suresh Kumar specializes in skin conditions, allergies, and coat health in pets. Known for his patient explanations and thorough consultations.',
    clinic: 'CityVet Neighborhood Clinic, Ameerpet',
    languages: ['English', 'Telugu', 'Urdu'],
    isOnline: true
  },
];

export const ANIMALS_FOR_ADOPTION = [
  {
    id: 'adopt-001',
    name: 'Bruno',
    species: 'Dog',
    breed: 'Labrador Retriever Mix',
    age: '3 years',
    gender: 'Male',
    location: 'Kukatpally Shelter',
    description: 'Bruno is a playful, gentle giant who loves cuddles and outdoor walks. He is great with children and other dogs. Fully vaccinated and neutered.',
    health: 'Vaccinated, Neutered, Microchipped',
    personality: ['Playful', 'Gentle', 'Loyal', 'Kid-friendly'],
    status: 'Available',
    shelter: 'Hyderabad Animal Shelter',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=450&fit=crop' // Genuine Labrador Dog
  },
  {
    id: 'adopt-002',
    name: 'Luna',
    species: 'Cat',
    breed: 'Domestic Green-Eyed Tabby',
    age: '2 years',
    gender: 'Female',
    location: 'Madhapur Shelter',
    description: 'Luna is an independent, curious cat who loves lounging in sunny spots. She is perfect for apartment living and enjoys interactive feather toys.',
    health: 'Vaccinated, Spayed, Dewormed',
    personality: ['Independent', 'Curious', 'Calm', 'Affectionate'],
    status: 'Available',
    shelter: 'Compassion Shelter & Sanctuary',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=450&fit=crop' // Genuine Cat (NOT a dog!)
  },
  {
    id: 'adopt-003',
    name: 'Max',
    species: 'Dog',
    breed: 'German Shepherd Mix',
    age: '5 years',
    gender: 'Male',
    location: 'Ameerpet Shelter',
    description: 'Max is a loyal, intelligent dog who thrives with an active family. He knows basic commands and loves agility training. Highly alert and affectionate.',
    health: 'Vaccinated, Neutered, Healthy',
    personality: ['Intelligent', 'Active', 'Loyal', 'Protective'],
    status: 'Available',
    shelter: 'Happy Tails Animal Home',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&h=450&fit=crop' // Genuine German Shepherd Dog
  },
  {
    id: 'adopt-004',
    name: 'Mango',
    species: 'Cat',
    breed: 'Ginger Persian Mix',
    age: '4 years',
    gender: 'Male',
    location: 'Kukatpally Shelter',
    description: 'Mango is a majestic, calm cat with a luscious fluffy coat. He loves to be gently brushed and will reward your care with sweet purrs and head bumps.',
    health: 'Vaccinated, Neutered, Regular grooming needed',
    personality: ['Calm', 'Regal', 'Affectionate', 'Indoor-only'],
    status: 'Available',
    shelter: 'Hyderabad Animal Shelter',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=450&fit=crop' // Genuine Fluffy Cat (NOT a dog!)
  },
  {
    id: 'adopt-005',
    name: 'Bella',
    species: 'Dog',
    breed: 'Beagle Mix',
    age: '1 year',
    gender: 'Female',
    location: 'Gachibowli',
    description: 'Bella is a young, energetic beagle mix who is eager to please. She learns quickly, loves to play fetch, and will be your best adventure buddy.',
    health: 'Vaccinated, Spayed, Dewormed, Microchipped',
    personality: ['Energetic', 'Eager', 'Friendly', 'Playful'],
    status: 'Available',
    shelter: 'Hyderabad Animal Shelter',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&h=450&fit=crop' // Genuine Beagle Dog
  },
  {
    id: 'adopt-006',
    name: 'Kiwi',
    species: 'Bird',
    breed: 'Indian Ringneck Parakeet',
    age: '2 years',
    gender: 'Female',
    location: 'Begumpet Sanctuary',
    description: 'Kiwi is a vibrant, social bird who can mimic sounds and loves interacting with people. She needs daily mental stimulation and a spacious flight enclosure.',
    health: 'Healthy, Regular avian vet check-ups',
    personality: ['Talkative', 'Social', 'Intelligent', 'Playful'],
    status: 'Available',
    shelter: 'Feathered & Furry Friends Sanctuary',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=450&fit=crop' // Genuine Tropical Bird / Parakeet
  },
  {
    id: 'adopt-007',
    name: 'Shadow',
    species: 'Dog',
    breed: 'Indian Indie / Pariah Dog',
    age: '6 years',
    gender: 'Male',
    location: 'Secunderabad',
    description: 'Shadow is a gentle senior indie dog looking for a quiet, loving home to spend his golden years. He is calm, house-trained, and deeply grateful for every kindness.',
    health: 'Vaccinated, Neutered, Resilient & Healthy',
    personality: ['Gentle', 'Calm', 'Grateful', 'Senior-friendly'],
    status: 'Available',
    shelter: 'Happy Tails Animal Home',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=450&fit=crop' // Genuine Indian Indie Rescue Dog
  },
  {
    id: 'adopt-008',
    name: 'Mittens',
    species: 'Cat',
    breed: 'Calico & Tortoiseshell',
    age: '3 years',
    gender: 'Female',
    location: 'Madhapur',
    description: 'Mittens is a confident, playful tortoiseshell who loves interactive mouse toys and sunny windowsill perches. She will keep you entertained with her affectionate antics.',
    health: 'Vaccinated, Spayed, FIV/FeLV negative',
    personality: ['Confident', 'Playful', 'Curious', 'Entertaining'],
    status: 'Available',
    shelter: 'Compassion Shelter & Sanctuary',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=450&fit=crop' // Genuine Calico / Tortoiseshell Cat (NOT a dog!)
  },
];

// Helper: calculate spherical distance between two coordinates (km)
export function calculateDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Coordinates for Hyderabad localities
export const LOCATION_COORDS: Record<string, { lat: number; lng: number }> = {
  'Miyapur': { lat: 17.4947, lng: 78.3996 },
  'Kukatpally': { lat: 17.4849, lng: 78.4138 },
  'Gachibowli': { lat: 17.4435, lng: 78.3489 },
  'Madhapur': { lat: 17.4484, lng: 78.3908 },
  'Kondapur': { lat: 17.4604, lng: 78.3647 },
  'Ameerpet': { lat: 17.4374, lng: 78.4482 },
  'Begumpet': { lat: 17.4418, lng: 78.4635 },
  'Secunderabad': { lat: 17.4399, lng: 78.4983 },
  'Banjara Hills': { lat: 17.4126, lng: 78.4482 },
  'Jubilee Hills': { lat: 17.4252, lng: 78.4134 },
  'HITEC City': { lat: 17.4504, lng: 78.3808 },
  'Uppal': { lat: 17.4049, lng: 78.5590 },
  'LB Nagar': { lat: 17.3473, lng: 78.5565 },
  'Dilsukhnagar': { lat: 17.3686, lng: 78.5247 },
  'Mehdipatnam': { lat: 17.3938, lng: 78.4421 },
};

export function findNearestRescueTeam(reportLocation: string) {
  const userCoords = LOCATION_COORDS[reportLocation] || { lat: 17.4435, lng: 78.3989 };
  const availableTeams = RESCUE_TEAMS.filter(t => t.availability !== 'unavailable');
  
  let nearest = availableTeams[0];
  let minDist = Infinity;
  
  for (const team of availableTeams) {
    const dist = calculateDistance(
      userCoords.lat, userCoords.lng,
      team.coordinates.lat, team.coordinates.lng
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = team;
    }
  }
  
  return { team: nearest, distance: minDist };
}

export function generateReportId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 900) + 100;
  return `PT-${year}-${num}`;
}

export function generateBookingId(): string {
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `BK-${num}`;
}
