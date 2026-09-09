export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  group?: boolean;
  members?: number;
  admins?: string[];
  pinned: boolean;
  archived: boolean;
  muted: boolean;
  typing?: boolean;
  phone?: string;
  avatarColor?: string;
}

export interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
  status: 'pending' | 'sent' | 'delivered' | 'read';
  starred: boolean;
  type: 'text' | 'image' | 'voice' | 'document';
  synced?: boolean;
  imageUrl?: string;
  duration?: number;
  repliedTo?: string;
  sender?: string;
}

export interface StatusItem {
  id: string;
  name: string;
  time: string;
  seen: boolean;
  type: 'image' | 'text';
  imageUrl?: string;
  text?: string;
  bgColor?: string;
  avatarColor?: string;
}

export interface CallRecord {
  id: string;
  name: string;
  type: 'incoming' | 'outgoing';
  callType: 'voice' | 'video';
  time: string;
  missed: boolean;
  duration?: string;
  avatarColor?: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  status: string;
  online: boolean;
  avatarColor?: string;
}

export type ActivePanel = 'chats' | 'status' | 'communities' | 'calls' | 'settings';
