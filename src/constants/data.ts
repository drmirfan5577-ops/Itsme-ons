import type { Chat, Message, StatusItem, CallRecord, Contact } from '@/types';

export const AVATAR_COLORS = [
  '#d9344b', '#e67e22', '#8e44ad', '#2980b9',
  '#16a085', '#c0392b', '#7f8c8d', '#2c3e50',
];

export const defaultChats: Chat[] = [
  {
    id: '1', name: 'Ahmed Khan', lastMessage: 'Hey, how are you bro?', time: '10:30 AM',
    unread: 2, online: true, phone: '+92 300 1234567', pinned: true, archived: false,
    muted: false, typing: false, avatarColor: AVATAR_COLORS[0],
  },
  {
    id: '2', name: 'Family Group 👨‍👩‍👧‍👦', lastMessage: 'Mom: Dinner at 8 PM', time: '9:15 AM',
    unread: 5, online: false, group: true, members: 8, admins: ['1'], pinned: true,
    archived: false, muted: false, avatarColor: AVATAR_COLORS[4],
  },
  {
    id: '3', name: 'Sara Ali', lastMessage: 'Thanks for your help!', time: 'Yesterday',
    unread: 0, online: true, phone: '+92 321 9876543', pinned: false, archived: false,
    muted: false, avatarColor: AVATAR_COLORS[1],
  },
  {
    id: '4', name: 'Office Team 💼', lastMessage: 'Meeting at 3 PM', time: 'Yesterday',
    unread: 12, online: false, group: true, members: 15, admins: ['1', '3'], pinned: false,
    archived: false, muted: true, avatarColor: AVATAR_COLORS[3],
  },
  {
    id: '5', name: 'Ali Raza', lastMessage: 'See you tomorrow', time: 'Monday',
    unread: 0, online: false, phone: '+92 333 5556667', pinned: false, archived: false,
    muted: false, avatarColor: AVATAR_COLORS[2],
  },
  {
    id: '6', name: 'Usman Bhai', lastMessage: '🎤 Voice message (0:45)', time: 'Sunday',
    unread: 0, online: true, phone: '+92 345 1112233', pinned: false, archived: false,
    muted: false, avatarColor: AVATAR_COLORS[6],
  },
  {
    id: '7', name: 'Dev Crew 🛠️', lastMessage: 'PR ready for review', time: 'Sunday',
    unread: 3, online: false, group: true, members: 6, admins: ['2'], pinned: false,
    archived: false, muted: false, avatarColor: AVATAR_COLORS[7],
  },
];

export const defaultMessages: Record<string, Message[]> = {
  '1': [
    { id: '1', text: 'Assalam o Alaikum!', sent: false, time: '10:25 AM', status: 'read', starred: false, type: 'text', synced: true },
    { id: '2', text: 'Walaikum Assalam! How are you doing these days?', sent: true, time: '10:26 AM', status: 'read', starred: false, type: 'text', synced: true },
    { id: '3', text: 'Alhamdulillah, all good bhai. Started a new project at work 🚀', sent: false, time: '10:28 AM', status: 'read', starred: true, type: 'text', synced: true },
    { id: '4', text: 'Nice! What kind of project?', sent: true, time: '10:29 AM', status: 'read', starred: false, type: 'text', synced: true },
    { id: '5', text: 'Hey, how are you bro?', sent: false, time: '10:30 AM', status: 'read', starred: false, type: 'text', synced: true },
  ],
  '2': [
    { id: '1', text: 'Everyone coming to dinner tonight?', sent: false, time: '9:00 AM', status: 'read', starred: false, type: 'text', synced: true, sender: 'Mom' },
    { id: '2', text: 'Yes InshaAllah!', sent: true, time: '9:05 AM', status: 'read', starred: false, type: 'text', synced: true },
    { id: '3', text: 'I will be 10 minutes late', sent: false, time: '9:10 AM', status: 'read', starred: false, type: 'text', synced: true, sender: 'Dad' },
    { id: '4', text: 'Dinner at 8 PM sharp', sent: false, time: '9:15 AM', status: 'read', starred: false, type: 'text', synced: true, sender: 'Mom' },
  ],
  '3': [
    { id: '1', text: 'Hey Sara! Can you send me the report?', sent: true, time: 'Yesterday 3:00 PM', status: 'read', starred: false, type: 'text', synced: true },
    { id: '2', text: 'Sure! Sending it now 📄', sent: false, time: 'Yesterday 3:02 PM', status: 'read', starred: false, type: 'text', synced: true },
    { id: '3', text: 'Thanks for your help!', sent: false, time: 'Yesterday 3:05 PM', status: 'read', starred: false, type: 'text', synced: true },
  ],
  '4': [
    { id: '1', text: 'Team, please review the agenda', sent: false, time: 'Yesterday 2:00 PM', status: 'read', starred: false, type: 'text', synced: true, sender: 'Manager' },
    { id: '2', text: 'Reviewed and looks good 👍', sent: true, time: 'Yesterday 2:30 PM', status: 'read', starred: false, type: 'text', synced: true },
    { id: '3', text: 'Meeting at 3 PM tomorrow', sent: false, time: 'Yesterday 4:00 PM', status: 'read', starred: false, type: 'text', synced: true, sender: 'Manager' },
  ],
};

export const defaultStatus: StatusItem[] = [
  { id: '1', name: 'Ahmed Khan', time: '25 minutes ago', seen: false, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop', avatarColor: AVATAR_COLORS[0] },
  { id: '2', name: 'Sara Ali', time: '1 hour ago', seen: false, type: 'text', text: 'Having a great day! 🌟', bgColor: '#00a884', avatarColor: AVATAR_COLORS[1] },
  { id: '3', name: 'Ali Raza', time: '3 hours ago', seen: true, type: 'image', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=700&fit=crop', avatarColor: AVATAR_COLORS[2] },
  { id: '4', name: 'Usman Bhai', time: '5 hours ago', seen: true, type: 'text', text: 'Alhamdulillah for everything 🤲', bgColor: '#2980b9', avatarColor: AVATAR_COLORS[6] },
];

export const defaultCalls: CallRecord[] = [
  { id: '1', name: 'Ahmed Khan', type: 'incoming', callType: 'video', time: 'Today, 10:30 AM', missed: false, duration: '5:23', avatarColor: AVATAR_COLORS[0] },
  { id: '2', name: 'Sara Ali', type: 'outgoing', callType: 'voice', time: 'Today, 9:15 AM', missed: false, duration: '12:45', avatarColor: AVATAR_COLORS[1] },
  { id: '3', name: 'Unknown Number', type: 'incoming', callType: 'voice', time: 'Yesterday, 8:00 PM', missed: true, avatarColor: AVATAR_COLORS[7] },
  { id: '4', name: 'Ali Raza', type: 'outgoing', callType: 'video', time: 'Monday, 4:30 PM', missed: false, duration: '22:10', avatarColor: AVATAR_COLORS[2] },
  { id: '5', name: 'Office Team 💼', type: 'incoming', callType: 'video', time: 'Sunday, 3:00 PM', missed: false, duration: '45:00', avatarColor: AVATAR_COLORS[3] },
];

export const defaultContacts: Contact[] = [
  { id: '1', name: 'Ahmed Khan', phone: '+92 300 1234567', status: 'Hey there! I am using It\'s Me', online: true, avatarColor: AVATAR_COLORS[0] },
  { id: '2', name: 'Sara Ali', phone: '+92 321 9876543', status: 'Available', online: true, avatarColor: AVATAR_COLORS[1] },
  { id: '3', name: 'Ali Raza', phone: '+92 333 5556667', status: 'Busy at work', online: false, avatarColor: AVATAR_COLORS[2] },
  { id: '4', name: 'Usman Bhai', phone: '+92 345 1112233', status: 'At the office', online: true, avatarColor: AVATAR_COLORS[6] },
];

export const EMOJIS = [
  '😀','😂','❤️','👍','🎉','🔥','💯','🙏','😊','😍',
  '🤔','😎','🥳','😢','😡','👏','🚀','✨','💪','🌟',
  '😄','🤣','💕','✅','🎊','⭐','🙌','😇','🥰','😏',
];
