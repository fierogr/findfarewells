import { FuneralHome } from '@/types/funeralHome';

// Mock data for funeral homes
export const mockFuneralHomes: FuneralHome[] = [
  {
    id: "1",
    name: "Peaceful Haven Funeral Home",
    address: "123 Serenity Lane, Portland, OR 97205",
    city: "Portland",
    state: "OR",
    zip: "97205",
    phone: "(503) 555-1234",
    email: "info@peacefulhaven.com",
    website: "https://www.peacefulhaven.com",
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm, Sun: Closed",
    description: "Providing compassionate service to families in Portland for over 40 years.",
    about: "Peaceful Haven Funeral Home has been serving the Portland community since 1978. Our experienced staff is dedicated to providing personalized and caring service to help families through difficult times. We offer a range of services to meet diverse needs and budgets, with a focus on creating meaningful tributes that celebrate life.",
    imageUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc",
    coverImageUrl: "https://images.unsplash.com/photo-1468779065891-103dac4a7c48",
    rating: 4.8,
    reviewCount: 124,
    services: [
      "Βασικό πακέτο κηδείας",
      "Οργάνωση μνημοσύνων", 
      "Επαναπατρισμός σορών και αποστολή στο εξωτερικό",
      "Στολισμός ναού - στεφάνια",
      "24ωρη εξυπηρέτηση"
    ],
    amenities: [
      "Chapel Seating for 150",
      "Reception Room",
      "Video Tributes",
      "Webcasting Services",
      "Catering Options",
      "Ample Parking",
      "Wheelchair Accessible",
      "Pet-Friendly Services"
    ],
    basicPrice: 2950,
    featured: true,
    packages: [
      {
        id: "p1",
        name: "Essential Service",
        price: 2950,
        description: "Our most affordable option, providing the necessary services for a dignified funeral.",
        includedServices: [
          "Basic services of funeral director and staff",
          "Transfer of deceased to funeral home (within 25 miles)",
          "Embalming",
          "Use of facilities for viewing (2 hours)",
          "Use of facilities for funeral ceremony",
          "Funeral coach",
          "Memorial package"
        ]
      },
      {
        id: "p2",
        name: "Traditional Service",
        price: 4950,
        description: "Our comprehensive traditional funeral service package.",
        includedServices: [
          "Basic services of funeral director and staff",
          "Transfer of deceased to funeral home (within 50 miles)",
          "Embalming",
          "Dressing, cosmetology, and casketing",
          "Use of facilities for viewing (4 hours)",
          "Use of facilities for funeral ceremony",
          "Funeral coach",
          "Limousine for family",
          "Memorial package",
          "Online obituary and guestbook",
          "Coordination with cemetery"
        ]
      },
      {
        id: "p3",
        name: "Celebration of Life",
        price: 6450,
        description: "A complete service focused on celebrating the unique life of your loved one.",
        includedServices: [
          "Basic services of funeral director and staff",
          "Transfer of deceased to funeral home (within 50 miles)",
          "Embalming",
          "Dressing, cosmetology, and casketing",
          "Extended use of facilities for viewing (6 hours)",
          "Use of facilities for funeral ceremony",
          "Custom video tribute",
          "Funeral coach",
          "Two limousines for family",
          "Premium memorial package",
          "Custom printed materials",
          "Online obituary and guestbook",
          "Coordination with cemetery",
          "Reception with catering for up to 50 people"
        ]
      }
    ],
    additionalServices: [
      {
        id: "as1",
        name: "Embalming",
        price: 695
      },
      {
        id: "as2",
        name: "Cremation Process",
        price: 395
      },
      {
        id: "as3",
        name: "Memorial Service (without body present)",
        price: 1295
      },
      {
        id: "as4",
        name: "Graveside Service",
        price: 695
      },
      {
        id: "as5",
        name: "Video Tribute",
        price: 195
      },
      {
        id: "as6",
        name: "Limousine (3 hours)",
        price: 395
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Michael Thompson",
        rating: 5,
        date: "March 15, 2023",
        comment: "The staff at Peaceful Haven were incredibly compassionate and professional during our time of need. They helped us create a beautiful service that truly honored my father's life. I cannot thank them enough for their support."
      },
      {
        id: "r2",
        name: "Jennifer Williams",
        rating: 5,
        date: "February 8, 2023",
        comment: "From the first phone call to the final details, Peaceful Haven took care of everything with grace and dignity. The staff was attentive to our family's needs and made a difficult time much easier to navigate."
      },
      {
        id: "r3",
        name: "Robert Davis",
        rating: 4,
        date: "January 22, 2023",
        comment: "We were very pleased with the services provided by Peaceful Haven. The facilities were beautiful and the staff was knowledgeable and supportive. The only reason for 4 stars instead of 5 is that there was a small miscommunication about timing, but they resolved it quickly."
      }
    ],
    regions: ["Νομός Θεσσαλονίκης", "Νομός Σερρών"]
  },
  {
    id: "2",
    name: "Eternal Rest Funeral Services",
    address: "456 Comfort Ave, Portland, OR 97204",
    city: "Portland",
    state: "OR",
    zip: "97204",
    phone: "(503) 555-5678",
    email: "contact@eternalrest.com",
    website: "https://www.eternalrest.com",
    hours: "Mon-Fri: 8am-6pm, Sat-Sun: 9am-4pm",
    description: "Modern funeral services with a focus on celebrating life and creating meaningful memorials.",
    about: "Founded in 2005, Eternal Rest Funeral Services combines traditional values with modern approaches to funeral services. We believe in creating personalized experiences that truly reflect the individual being honored. Our team is trained in the latest techniques and technologies to provide families with innovative options for celebrating their loved ones.",
    imageUrl: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2",
    rating: 4.6,
    reviewCount: 98,
    services: [
      "Βασικό πακέτο κηδείας",
      "Αποτέφρωση - καύση νεκρών",
      "Ιδιόκτητες αίθουσες δεξιώσεων",
      "Φαγητό - κεράσματα", 
      "24ωρη εξυπηρέτηση"
    ],
    amenities: [
      "Modern Chapel for 200",
      "Digital Memorial Creation",
      "Celebration of Life Center",
      "Private Family Rooms",
      "Children's Area",
      "Catering Services",
      "Webcasting Capabilities"
    ],
    basicPrice: 2450,
    featured: false,
    packages: [
      {
        id: "p1",
        name: "Simple Dignity",
        price: 2450,
        description: "An affordable option providing essential services with dignity and respect.",
        includedServices: [
          "Basic services of funeral director and staff",
          "Transfer of deceased to funeral home (within 25 miles)",
          "Preparation of the body (non-embalming)",
          "Use of facilities for viewing (1 hour)",
          "Use of facilities for funeral service",
          "Hearse for transportation to cemetery",
          "Basic memorial package"
        ]
      },
      {
        id: "p2",
        name: "Eternal Memory",
        price: 4250,
        description: "Our signature package designed to create lasting memories.",
        includedServices: [
          "Comprehensive services of funeral director and staff",
          "Transfer of deceased to funeral home (within 50 miles)",
          "Embalming and preparation",
          "Use of facilities for viewing (3 hours)",
          "Use of facilities for funeral service",
          "Hearse for transportation",
          "One limousine for family",
          "Custom memorial package",
          "Digital guestbook",
          "Online memorial page for 1 year"
        ]
      },
      {
        id: "p3",
        name: "Life Celebration",
        price: 5950,
        description: "A comprehensive package focused on celebrating a life well-lived.",
        includedServices: [
          "Premium services of funeral director and staff",
          "Transfer of deceased to funeral home (any distance within city)",
          "Expert embalming and preparation",
          "Extended use of facilities for viewing (5 hours)",
          "Use of celebration center for service",
          "Customized video tribute",
          "Hearse for transportation",
          "Two limousines for family",
          "Premium memorial package with custom printing",
          "Personalized memorial items",
          "Permanent online memorial page",
          "Reception with catering for up to 75 people"
        ]
      }
    ],
    additionalServices: [
      {
        id: "as1",
        name: "Embalming",
        price: 650
      },
      {
        id: "as2",
        name: "Cremation Process",
        price: 350
      },
      {
        id: "as3",
        name: "Memorial Service",
        price: 1195
      },
      {
        id: "as4",
        name: "Custom Video Tribute",
        price: 250
      },
      {
        id: "as5",
        name: "Reception Arrangement",
        price: 495
      },
      {
        id: "as6",
        name: "Live Streaming Service",
        price: 295
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Sarah Johnson",
        rating: 5,
        date: "April 10, 2023",
        comment: "Eternal Rest helped us create a beautiful celebration of life for my mother. Their attention to detail and genuine care made all the difference during a difficult time."
      },
      {
        id: "r2",
        name: "David Miller",
        rating: 4,
        date: "March 25, 2023",
        comment: "The staff was very professional and accommodating. The facilities are modern and comfortable. I appreciated their flexibility with our requests."
      },
      {
        id: "r3",
        name: "Patricia Clark",
        rating: 5,
        date: "February 17, 2023",
        comment: "From start to finish, Eternal Rest provided exceptional service. They guided us through every decision with patience and understanding. The celebration of life they helped us create for my husband was perfect."
      }
    ],
    regions: ["Νομός Θεσσαλονίκης", "Νομός Κιλκίς"]
  },
  {
    id: "3",
    name: "Sunset Memorial Funeral Home",
    address: "789 Remembrance Rd, Portland, OR 97209",
    city: "Portland",
    state: "OR",
    zip: "97209",
    phone: "(503) 555-9012",
    email: "info@sunsetmemorial.com",
    website: "https://www.sunsetmemorial.com",
    hours: "Mon-Sun: 8am-8pm",
    description: "Family-owned funeral home dedicated to honoring traditions while embracing modern memorial practices.",
    about: "For three generations, Sunset Memorial has been helping Portland families navigate the journey of loss. Our family-owned business understands the importance of honoring traditions while also embracing new and meaningful ways to celebrate life. We pride ourselves on our attentive service, beautiful facilities, and unwavering commitment to the families we serve.",
    imageUrl: "https://images.unsplash.com/photo-1621506821957-1b50ab7a1255",
    rating: 4.9,
    reviewCount: 156,
    services: [
      "Βασικό πακέτο κηδείας",
      "Αποτέφρωση - καύση νεκρών",
      "Ιδιόκτητες αίθουσες δεξιώσεων",
      "Φαγητό - κεράσματα",
      "24ωρη εξυπηρέτηση"
    ],
    amenities: [
      "Historic Chapel",
      "Modern Reception Center",
      "Peaceful Gardens",
      "Private Family Rooms",
      "Children's Remembrance Area",
      "Catering Services",
      "Extensive Parking",
      "ADA Accessible"
    ],
    basicPrice: 3250,
    featured: true,
    packages: [
      {
        id: "p1",
        name: "Sunset Simplicity",
        price: 3250,
        description: "A simple yet dignified approach to honoring your loved one.",
        includedServices: [
          "Basic services of funeral director and staff",
          "Transfer of deceased to funeral home (within 30 miles)",
          "Sanitary care and preparation (no embalming)",
          "Use of facilities for viewing (2 hours)",
          "Use of chapel for service",
          "Funeral coach",
          "Standard memorial package"
        ]
      },
      {
        id: "p2",
        name: "Traditional Sunset",
        price: 5450,
        description: "Our comprehensive traditional service package with added personal touches.",
        includedServices: [
          "Complete services of funeral director and staff",
          "Transfer of deceased to funeral home (within 50 miles)",
          "Embalming and cosmetic preparation",
          "Dressing and casketing",
          "Use of facilities for viewing (4 hours)",
          "Use of chapel for service",
          "Funeral coach and family car",
          "Premium memorial package",
          "Customized printed materials",
          "Online obituary and memorial page",
          "Coordination with cemetery or crematory"
        ]
      },
      {
        id: "p3",
        name: "Legacy Tribute",
        price: 7950,
        description: "Our premier package designed to create a lasting legacy and meaningful tribute.",
        includedServices: [
          "Premium services of funeral director and staff",
          "Transfer of deceased to funeral home (any distance within state)",
          "Expert embalming and cosmetic preparation",
          "Dressing and casketing",
          "Extended use of facilities for viewing (6 hours over two days)",
          "Use of chapel and reception center",
          "Custom video tribute with family photos",
          "Funeral coach and two family cars",
          "Legacy memorial package with keepsakes",
          "Custom printed materials and memorial website",
          "Online obituary and permanent memorial page",
          "Coordination with all third parties",
          "Catered reception for up to 100 people"
        ]
      }
    ],
    additionalServices: [
      {
        id: "as1",
        name: "Embalming",
        price: 750
      },
      {
        id: "as2",
        name: "Cremation Process",
        price: 425
      },
      {
        id: "as3",
        name: "Witnessed Cremation",
        price: 650
      },
      {
        id: "as4",
        name: "Memorial Service",
        price: 1450
      },
      {
        id: "as5",
        name: "Custom Video Tribute",
        price: 295
      },
      {
        id: "as6",
        name: "Reception Arrangement",
        price: 595
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Elizabeth Brown",
        rating: 5,
        date: "May 2, 2023",
        comment: "Sunset Memorial helped us navigate the most difficult time in our lives with grace and compassion. They took care of every detail, allowing us to focus on our grief and healing. The service they created for my husband was beautiful and truly reflected his life and personality."
      },
      {
        id: "r2",
        name: "James Wilson",
        rating: 5,
        date: "April 18, 2023",
        comment: "The third generation of our family to use Sunset Memorial, and they continue to provide exceptional service. Their attention to detail and personal touches made my grandmother's funeral a true celebration of her life."
      },
      {
        id: "r3",
        name: "Catherine Martinez",
        rating: 4,
        date: "March 30, 2023",
        comment: "Very professional staff and beautiful facilities. They were accommodating of our cultural traditions and helped us create a meaningful service. The only minor issue was parking limitations on a particularly busy day."
      }
    ],
    regions: ["Νομός Θεσσαλονίκης", "Νομός Κιλκίς"]
  },
  {
    id: "4",
    name: "Riverside Funeral Chapel",
    address: "321 Tranquil Blvd, Portland, OR 97201",
    city: "Portland",
    state: "OR",
    zip: "97201",
    phone: "(503) 555-3456",
    email: "service@riversidefuneral.com",
    website: "https://www.riversidefuneral.com",
    hours: "Mon-Fri: 8:30am-5:30pm, Sat: 9am-3pm, Sun: By appointment",
    description: "Scenic riverside location offering peaceful services with natural beauty.",
    about: "Located alongside the Willamette River, our funeral home offers a uniquely serene setting for saying goodbye to loved ones. Established in 1992, Riverside Funeral Chapel combines the calming influence of nature with professional, compassionate service. Our picturesque grounds and modern facilities provide the perfect backdrop for meaningful tributes and celebrations of life.",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3499",
    rating: 4.7,
    reviewCount: 89,
    services: [
      "Βασικό πακέτο κηδείας",
      "Αποτέφρωση - καύση νεκρών",
      "Ιδιόκτητες αίθουσες δεξιώσεων",
      "Φαγητό - κεράσματα",
      "24ωρη εξυπηρέτηση"
    ],
    amenities: [
      "Riverside Chapel",
      "Outdoor Ceremony Space",
      "Waterfront Reception Area",
      "Garden of Reflection",
      "Catering Kitchen",
      "Advanced Audio/Visual Systems",
      "Webcasting Services"
    ],
    basicPrice: 3050,
    featured: false,
    packages: [
      {
        id: "p1",
        name: "River's Edge Basic",
        price: 3050,
        description: "An affordable service option with the essentials for a dignified farewell.",
        includedServices: [
          "Basic services of funeral director and staff",
          "Transfer of deceased to funeral home (within 25 miles)",
          "Basic preparation (no embalming)",
          "Use of chapel for memorial service (2 hours)",
          "Standard memorial package",
          "Online obituary"
        ]
      },
      {
        id: "p2",
        name: "Riverside Traditional",
        price: 4850,
        description: "A complete traditional service package in our beautiful riverside setting.",
        includedServices: [
          "Full services of funeral director and staff",
          "Transfer of deceased to funeral home (within 40 miles)",
          "Embalming and preparation",
          "Use of facilities for viewing (3 hours)",
          "Use of riverside chapel for service",
          "Hearse and lead car",
          "Custom memorial package",
          "Digital guestbook",
          "Online memorial page"
        ]
      },
      {
        id: "p3",
        name: "Waterfront Celebration",
        price: 6750,
        description: "Our premier package featuring our scenic outdoor spaces and comprehensive services.",
        includedServices: [
          "Complete services of funeral director and staff",
          "Transfer of deceased to funeral home (within 60 miles)",
          "Expert embalming and cosmetic preparation",
          "Use of facilities for viewing (up to 6 hours)",
          "Choice of riverside chapel or outdoor ceremony space",
          "Waterfront reception for up to 75 people",
          "Catering coordination",
          "Hearse and two family cars",
          "Premium memorial package with keepsakes",
          "Custom video tribute",
          "Permanent online memorial"
        ]
      }
    ],
    additionalServices: [
      {
        id: "as1",
        name: "Embalming",
        price: 695
      },
      {
        id: "as2",
        name: "Cremation Process",
        price: 375
      },
      {
        id: "as3",
        name: "Outdoor Ceremony Setup",
        price: 495
      },
      {
        id: "as4",
        name: "Riverside Scattering Ceremony",
        price: 595
      },
      {
        id: "as5",
        name: "Reception (up to 50 people)",
        price: 795
      },
      {
        id: "as6",
        name: "Video Tribute Production",
        price: 245
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Thomas Anderson",
        rating: 5,
        date: "April 5, 2023",
        comment: "The riverside setting provided such a peaceful backdrop for my father's service. The staff was incredibly helpful and thought of every detail. The outdoor ceremony space was perfect for the celebration of life we wanted to create."
      },
      {
        id: "r2",
        name: "Linda Garcia",
        rating: 4,
        date: "March 12, 2023",
        comment: "Beautiful location and very professional staff. The riverside scattering ceremony they arranged for us was deeply meaningful. Only giving 4 stars because the reception area was a bit small for our large family gathering."
      },
      {
        id: "r3",
        name: "Richard Taylor",
        rating: 5,
        date: "February 28, 2023",
        comment: "Riverside Chapel provided an exceptional experience during a difficult time. The waterfront setting was calming, and the staff showed genuine care for our family. They accommodated all our requests and helped us create a truly personal service."
      }
    ],
    regions: ["Νομός Θεσσαλονίκης", "Νομός Κιλκίς"]
  },
  {
    id: "5",
    name: "Heritage Funeral Services",
    address: "567 Legacy Lane, Portland, OR 97218",
    city: "Portland",
    state: "OR",
    zip: "97218",
    phone: "(503) 555-7890",
    email: "contact@heritagefuneral.com",
    website: "https://www.heritagefuneral.com",
    hours: "Mon-Fri: 9am-6pm, Sat: 10am-4pm, Sun: By appointment",
    description: "Specializing in culturally diverse and traditional funeral services with 75 years of experience.",
    about: "Since 1948, Heritage Funeral Services has been a cornerstone of the Portland community, providing dignified and respectful funeral services for families of all cultural and religious backgrounds. Our experienced staff is knowledgeable in diverse funeral customs and works closely with families to honor their specific traditions. We take pride in our historic facilities while continuing to adapt and embrace new memorial technologies and practices.",
    imageUrl: "https://images.unsplash.com/photo-1520197416312-0a9745890fc2",
    rating: 4.5,
    reviewCount: 112,
    services: [
      "Βασικό πακέτο κηδείας",
      "Αποτέφρωση - καύση νεκρών",
      "Ιδιόκτητες αίθουσες δεξιώσεων",
      "Φαγητό - κεράσματα",
      "24ωρη εξυπηρέτηση"
    ],
    amenities: [
      "Historic Chapel",
      "Cultural Ceremony Rooms",
      "Memorial Hall",
      "Family Lounges",
      "Children's Room",
      "Multilingual Staff",
      "Extensive Parking"
    ],
    basicPrice: 2850,
    featured: false,
    packages: [
      {
        id: "p1",
        name: "Heritage Essentials",
        price: 2850,
        description: "A simple yet dignified service option respecting all traditions.",
        includedServices: [
          "Basic services of funeral director and staff",
          "Transfer of deceased to funeral home (within 30 miles)",
          "Basic preparation (no embalming)",
          "Use of facilities for viewing (2 hours)",
          "Use of chapel for funeral service",
          "Hearse for final transportation",
          "Basic memorial package"
        ]
      },
      {
        id: "p2",
        name: "Cultural Tribute",
        price: 4650,
        description: "A comprehensive service package adaptable to various cultural and religious customs.",
        includedServices: [
          "Complete services of funeral director and staff",
          "Transfer of deceased to funeral home (within 45 miles)",
          "Preparation according to cultural customs",
          "Use of facilities for viewing or wake (4 hours)",
          "Use of chapel or cultural ceremony room",
          "Coordination with religious officials",
          "Hearse and family car",
          "Custom memorial package",
          "Multilingual services if needed"
        ]
      },
      {
        id: "p3",
        name: "Legacy Commemoration",
        price: 6250,
        description: "Our premier package designed to honor your family traditions with the highest level of service.",
        includedServices: [
          "Premium services of funeral director and staff",
          "Transfer of deceased to funeral home (within 60 miles)",
          "Preparation according to cultural or religious customs",
          "Extended use of facilities for viewing or wake (6-8 hours)",
          "Use of chapel and memorial hall",
          "Coordination with all religious officials and community leaders",
          "Customized cultural ceremonies",
          "Hearse and two family cars",
          "Premium memorial package with cultural elements",
          "Video tribute and online memorial",
          "Reception for up to 80 people"
        ]
      }
    ],
    additionalServices: [
      {
        id: "as1",
        name: "Embalming",
        price: 675
      },
      {
        id: "as2",
        name: "Cremation Process",
        price: 385
      },
      {
        id: "as3",
        name: "Cultural Ceremony Coordination",
        price: 495
      },
      {
        id: "as4",
        name: "International Shipping Arrangements",
        price: 1250
      },
      {
        id: "as5",
        name: "Translation Services (per hour)",
        price: 75
      },
      {
        id: "as6",
        name: "Reception Arrangement",
        price: 550
      }
    ],
    reviews: [
      {
        id: "r1",
        name: "Raj Patel",
        rating: 5,
        date: "May 10, 2023",
        comment: "Heritage Funeral Services handled my father's traditional Hindu ceremony with knowledge, respect, and attention to detail. They were familiar with our customs and made sure everything was done correctly. Their multilingual staff made communication easy for all family members."
      },
      {
        id: "r2",
        name: "Maria Gonzalez",
        rating: 4,
        date: "April 22, 2023",
        comment: "We appreciated the staff's understanding of our Catholic traditions and their flexibility in incorporating our family's personal touches. The historic chapel was beautiful, though parking was somewhat limited during our large service."
      },
      {
        id: "r3",
        name: "Ying Chen",
        rating: 5,
        date: "March 18, 2023",
        comment: "They honored our Chinese funeral customs perfectly and handled all aspects with dignity. The funeral director was knowledgeable about our traditions and guided us through the process with patience and understanding. We are deeply grateful for their exceptional service during this difficult time."
      }
    ],
    regions: ["Νομός Θεσσαλονίκης", "Νομός Κιλκίς"]
  }
];
