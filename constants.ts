
import { Lead, LeadStatus, ClosingRecord, CommissionStatement, SurveyResponse } from './types';

export const DEMO_LEADS: Lead[] = [
  {
    id: "L001",
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    zipCodes: ["90210"],
    propertyType: "Buying",
    budget: "$800k-$1M",
    bedrooms: "3-4",
    status: LeadStatus.HOT,
    source: "Website Form",
    assignedAgent: "Tom Rivera",
    createdAt: "2024-01-03T09:15:00Z",
    lastContact: "2 minutes ago",
    nextFollowUp: "2024-01-04T14:00:00Z",
    aiSummary: "Urgent buyer, needs to relocate in 2 months. High intent, appointment scheduled.",
    conversationHistory: [
      { sender: "ai", message: "Hi Sarah! Thanks for your interest in homes in 90210. I'm here to help! Are you looking to buy soon?", timestamp: "09:15 AM" },
      { sender: "lead", message: "Yes, we need to move in 2 months", timestamp: "09:16 AM" },
      { sender: "ai", message: "That's exciting! Let me connect you with Tom, our specialist for 90210. He has 3 properties that match your budget. When's a good time for him to call you?", timestamp: "09:16 AM" },
      { sender: "lead", message: "Tomorrow afternoon works", timestamp: "09:17 AM" },
      { sender: "ai", message: "Perfect! Tom will call you tomorrow between 2-4pm. I'll also text you the 3 listings. Looking forward to helping you find your home! 🏡", timestamp: "09:18 AM" }
    ],
    tags: ["urgent", "qualified", "needs-follow-up"],
    buyingSignals: ["timeline_mentioned", "budget_confirmed", "location_specific"]
  },
  {
    id: "L002",
    name: "Mike Chen",
    phone: "(555) 234-5678",
    email: "m.chen@provider.net",
    zipCodes: ["90211"],
    propertyType: "Buying",
    budget: "$500k-$650k",
    bedrooms: "1-2",
    status: LeadStatus.WARM,
    source: "Zillow Lead",
    assignedAgent: "Sarah Miller",
    createdAt: "2024-01-02T14:20:00Z",
    lastContact: "3 hours ago",
    nextFollowUp: "2024-01-09T10:00:00Z",
    aiSummary: "First-time buyer exploring options. Not in a rush but interested in market reports.",
    conversationHistory: [
      { sender: "ai", message: "Hi Mike! I saw you're interested in condos in 90211. Great area! Are you first-time buyer or looking to upgrade?", timestamp: "02:20 PM" },
      { sender: "lead", message: "First time buyer, just exploring options", timestamp: "02:22 PM" },
      { sender: "ai", message: "Awesome! No pressure at all. Would you like me to send you a quick guide on what to expect in the 90211 market?", timestamp: "02:23 PM" },
      { sender: "lead", message: "Sure that would be helpful", timestamp: "02:25 PM" }
    ],
    tags: ["first-time-buyer", "nurture"],
    buyingSignals: ["location_specific"]
  },
  {
    id: "L003",
    name: "Jessica Martinez",
    phone: "(555) 345-6789",
    email: "jessica.m@invest.co",
    zipCodes: ["90212"],
    propertyType: "Buying",
    budget: "$1M+",
    bedrooms: "Any",
    status: LeadStatus.COLD,
    source: "Facebook Ad",
    assignedAgent: "Tom Rivera",
    createdAt: "2024-01-01T11:00:00Z",
    lastContact: "2 days ago",
    nextFollowUp: "2024-01-15T09:00:00Z",
    aiSummary: "Investor looking for appreciation plays. Currently unresponsive to follow-ups.",
    conversationHistory: [
      { sender: "ai", message: "Hi Jessica! Thanks for your interest in investment properties in 90212. I'd love to share some great opportunities. Are you actively looking?", timestamp: "11:00 AM" },
      { sender: "ai", message: "Hi Jessica! Just following up. I noticed 90212 has seen 8% appreciation this year. Would you like our Q4 investment report?", timestamp: "Yesterday" }
    ],
    tags: ["investor", "high-budget"],
    buyingSignals: []
  },
  {
    id: "L004",
    name: "Robert Wilson",
    phone: "(555) 456-7890",
    email: "r.wilson@corporate.com",
    zipCodes: ["90210", "90212"],
    propertyType: "Selling",
    budget: "$2M-$3M",
    bedrooms: "5+",
    status: LeadStatus.HOT,
    source: "Referral",
    assignedAgent: "Tom Rivera",
    createdAt: "2024-01-04T08:30:00Z",
    lastContact: "1 hour ago",
    nextFollowUp: "2024-01-05T10:00:00Z",
    aiSummary: "Corporate executive selling primary residence. High urgency due to relocation.",
    conversationHistory: [
      { sender: "ai", message: "Hi Robert, I received your referral! It looks like you're planning to sell in the 90210 area. When are you looking to list?", timestamp: "08:31 AM" },
      { sender: "lead", message: "As soon as possible. My company is moving me to New York next month.", timestamp: "08:45 AM" },
      { sender: "ai", message: "Understood. That's a tight timeline but we can definitely handle it. Tom Rivera is our specialist for luxury listings and can be over this afternoon for a valuation. Does 4pm work?", timestamp: "08:46 AM" }
    ],
    tags: ["executive", "seller", "luxury"],
    buyingSignals: ["timeline_mentioned", "referral_source"]
  },
  {
    id: "L005",
    name: "Amanda Lee",
    phone: "(555) 567-8901",
    email: "amanda.lee@design.io",
    zipCodes: ["90211"],
    propertyType: "Renting",
    budget: "$4k-$6k/mo",
    bedrooms: "1-2",
    status: LeadStatus.WARM,
    source: "Instagram",
    assignedAgent: "Sarah Miller",
    createdAt: "2024-01-03T16:45:00Z",
    lastContact: "Yesterday",
    nextFollowUp: "2024-01-06T12:00:00Z",
    aiSummary: "Looking for a modern loft or condo. Creative professional with specific aesthetic requirements.",
    conversationHistory: [
      { sender: "ai", message: "Hi Amanda! Loved your inquiry on Instagram. We have some stunning lofts in 90211 that fit that creative vibe. What's most important to you - natural light, open floor plan, or building amenities?", timestamp: "04:46 PM" },
      { sender: "lead", message: "Natural light is huge for me. I work from home.", timestamp: "05:12 PM" }
    ],
    tags: ["renter", "creative"],
    buyingSignals: ["aesthetic_mentioned", "wfh_setup"]
  }
];

export const DEMO_ANALYTICS = {
  totalLeads: 212,
  hotLeads: 34,
  warmLeads: 112,
  coldLeads: 66,
  responseRate: 91,
  vaResponseRate: 62,
  avgResponseTime: "2.5 minutes",
  vaAvgResponseTime: "45 minutes",
  conversionRate: 21,
  aiQualityScore: 4.4,
  costSavings: 945,
  leadsThisWeek: [
    { day: 'Mon', count: 22 },
    { day: 'Tue', count: 28 },
    { day: 'Wed', count: 35 },
    { day: 'Thu', count: 42 },
    { day: 'Fri', count: 39 },
    { day: 'Sat', count: 31 },
    { day: 'Sun', count: 15 },
  ],
  leadsByZipCode: [
    { zip: "90210", count: 68 },
    { zip: "90211", count: 54 },
    { zip: "90212", count: 42 },
    { zip: "90213", count: 31 },
    { zip: "90214", count: 17 }
  ],
  conversionFunnel: [
    { name: 'Leads', value: 212 },
    { name: 'Contacted', value: 198 },
    { name: 'Interested', value: 94 },
    { name: 'Appointments', value: 42 },
    { name: 'Closings', value: 12 }
  ]
};

export const DEMO_CLOSINGS: ClosingRecord[] = [
  {
    id: "C001",
    address: "123 Main St, Los Angeles, CA",
    client: "Sarah Johnson",
    closingDate: "2024-02-15",
    status: "Pending",
    checklist: [
      { id: "t1", task: "Title search completed", completed: true, category: "Legal" },
      { id: "t2", task: "Home inspection scheduled", completed: true, category: "Inspection" },
      { id: "t3", task: "Appraisal ordered", completed: true, category: "Financial" },
      { id: "t4", task: "Loan documents submitted", completed: false, category: "Financial" },
      { id: "t5", task: "Insurance quote obtained", completed: true, category: "Financial" },
      { id: "t6", task: "Final walkthrough scheduled", completed: false, category: "Closing" },
      { id: "t7", task: "Keys & garage remotes ready", completed: false, category: "Closing" }
    ]
  },
  {
    id: "C002",
    address: "742 Evergreen Terrace",
    client: "Homer Simpson",
    closingDate: "2024-03-01",
    status: "At Risk",
    checklist: [
      { id: "t1", task: "Title search completed", completed: false, category: "Legal" },
      { id: "t2", task: "Home inspection scheduled", completed: true, category: "Inspection" },
      { id: "t3", task: "Appraisal ordered", completed: false, category: "Financial" }
    ]
  },
  {
    id: "C003",
    address: "888 Skyline Dr, Beverly Hills, CA",
    client: "Robert Wilson",
    closingDate: "2024-02-10",
    status: "Pending",
    checklist: [
      { id: "t1", task: "Title search completed", completed: true, category: "Legal" },
      { id: "t2", task: "Home inspection scheduled", completed: true, category: "Inspection" },
      { id: "t3", task: "Appraisal ordered", completed: true, category: "Financial" },
      { id: "t4", task: "Loan documents submitted", completed: true, category: "Financial" },
      { id: "t5", task: "Insurance quote obtained", completed: true, category: "Financial" },
      { id: "t6", task: "Final walkthrough scheduled", completed: true, category: "Closing" },
      { id: "t7", task: "Keys & garage remotes ready", completed: true, category: "Closing" }
    ]
  },
  {
    id: "C004",
    address: "456 Oak Lane, Santa Monica, CA",
    client: "Emily Davis",
    closingDate: "2024-03-15",
    status: "Pending",
    checklist: [
      { id: "t1", task: "Title search completed", completed: false, category: "Legal" },
      { id: "t2", task: "Home inspection scheduled", completed: false, category: "Inspection" }
    ]
  }
];

export const DEMO_COMMISSIONS: CommissionStatement[] = [
  {
    id: "CM001",
    address: "123 Main St",
    salePrice: 950000,
    totalCommission: 5,
    agentSplit: 70,
    referralFee: 0,
    brokerFee: 250
  },
  {
    id: "CM002",
    address: "888 Skyline Dr",
    salePrice: 2450000,
    totalCommission: 4.5,
    agentSplit: 80,
    referralFee: 5000,
    brokerFee: 500
  },
  {
    id: "CM003",
    address: "222 Ocean View Pkwy",
    salePrice: 1200000,
    totalCommission: 6,
    agentSplit: 70,
    referralFee: 0,
    brokerFee: 250
  }
];

export const DEMO_SURVEYS: SurveyResponse[] = [
  {
    id: "S001",
    client: "David Miller",
    agent: "Tom Rivera",
    score: 5,
    feedback: "The AI follow-up was surprisingly friendly and saved me a lot of waiting time!",
    date: "2024-01-05"
  },
  {
    id: "S002",
    client: "Linda G.",
    agent: "Sarah Miller",
    score: 4,
    feedback: "Great service, very responsive and clear communication throughout the process.",
    date: "2024-01-04"
  },
  {
    id: "S003",
    client: "Kevin Zhang",
    agent: "Tom Rivera",
    score: 2,
    feedback: "The agent was late to two showings. The automated texts were fine but the human service needs work.",
    date: "2024-01-03"
  },
  {
    id: "S004",
    client: "Maria Garcia",
    agent: "Sarah Miller",
    score: 5,
    feedback: "Exceptional experience! I'll be referring all my friends to EstatePulse.",
    date: "2024-01-06"
  }
];
