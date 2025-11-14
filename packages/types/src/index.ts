// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Clerk Webhook Types
export interface ClerkWebhookEvent {
  type: string;
  data: any;
}

// Organization Types
export interface OrganizationData {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  plan: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
}

// User Types
export interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';
  organizationId: string;
}

// Chat Types
export interface ChannelData {
  id: string;
  name: string;
  description?: string;
  type: 'PUBLIC' | 'PRIVATE' | 'DIRECT';
  organizationId: string;
}

export interface MessageData {
  id: string;
  content: string;
  channelId: string;
  userId: string;
  createdAt: Date;
}

// Meeting Types
export interface MeetingData {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  meetingUrl?: string;
  organizationId: string;
  createdById: string;
}

// WebSocket Events
export enum WebSocketEvent {
  MESSAGE_SENT = 'message:sent',
  MESSAGE_RECEIVED = 'message:received',
  USER_JOINED = 'user:joined',
  USER_LEFT = 'user:left',
  TYPING_START = 'typing:start',
  TYPING_STOP = 'typing:stop',
}

export interface WebSocketMessage {
  event: WebSocketEvent;
  data: any;
  timestamp: Date;
}

