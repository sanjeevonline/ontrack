
export enum LeadStatus {
  HOT = 'hot',
  WARM = 'warm',
  COLD = 'cold',
  NEW = 'new'
}

export interface Message {
  sender: 'ai' | 'lead' | 'agent';
  message: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  zipCodes: string[];
  propertyType: 'Buying' | 'Selling' | 'Renting';
  budget: string;
  bedrooms: string;
  status: LeadStatus;
  source: string;
  assignedAgent: string;
  createdAt: string;
  lastContact: string;
  nextFollowUp: string;
  aiSummary: string;
  conversationHistory: Message[];
  tags: string[];
  buyingSignals: string[];
}

export interface AIAnalysis {
  response: string;
  urgency: 'high' | 'medium' | 'low';
  escalate: boolean;
  intent: string;
  qualityScore: number;
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'Legal' | 'Inspection' | 'Financial' | 'Closing';
}

export interface ClosingRecord {
  id: string;
  address: string;
  client: string;
  closingDate: string;
  status: 'Pending' | 'Closed' | 'At Risk';
  checklist: ChecklistItem[];
}

export interface CommissionStatement {
  id: string;
  address: string;
  salePrice: number;
  totalCommission: number; // percentage
  agentSplit: number; // percentage
  referralFee: number; // amount
  brokerFee: number; // amount
}

export interface SurveyResponse {
  id: string;
  client: string;
  agent: string;
  score: number;
  feedback: string;
  date: string;
}
