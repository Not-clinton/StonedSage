import { create } from 'zustand';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'sage';
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  currentMessage: string;
  isSidebarVisible: boolean;
  selectedPersonality: string | null;
  addMessage: (text: string, sender: 'user' | 'sage') => void;
  setCurrentMessage: (message: string) => void;
  setSidebarVisible: (visible: boolean) => void;
  setSelectedPersonality: (personality: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentMessage: '',
  isSidebarVisible: false,
  selectedPersonality: null,
  addMessage: (text, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          text,
          sender,
          timestamp: new Date(),
        },
      ],
    })),
  setCurrentMessage: (message) => set({ currentMessage: message }),
  setSidebarVisible: (visible) => set({ isSidebarVisible: visible }),
  setSelectedPersonality: (personality) => set({ selectedPersonality: personality }),
}));