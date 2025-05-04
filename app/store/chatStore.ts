// chatStore.ts
import { create } from 'zustand';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'sage';
};

interface ChatState {
  messages: Message[];
  currentMessage: string;
  isSidebarVisible: boolean;
  selectedPersonality: 'littlefinger' | 'mac' | 'lawyer' | 'businessman' | '';
  extractedContext: string;
  // actions
  setCurrentMessage: (msg: string) => void;
  setSidebarVisible: (visible: boolean) => void;
  setSelectedPersonality: (p: ChatState['selectedPersonality']) => void;
  setExtractedContext: (ctx: string) => void;
  addMessage: (text: string, sender: 'user' | 'sage') => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentMessage: '',
  isSidebarVisible: false,
  selectedPersonality: '',
  extractedContext: '',
  
  setCurrentMessage: (msg: string) => set({ currentMessage: msg }),
  setSidebarVisible: (visible: boolean) => set({ isSidebarVisible: visible }),
  setSelectedPersonality: (p) => {
    set({ selectedPersonality: p });
    // reset everything when persona changes
    get().resetChat();
    set({ selectedPersonality: p });

    // Add greeting message based on selected personality
    const greetings = {
      littlefinger: "Ah, a new player in the game of coins. Let's discuss how to make your wealth grow, shall we?",
      mac: "Yo, what's good? Let's talk about growing that green, both in your garden and your bank account.",
      lawyer: "Counselor at your service. Let's draft a strategy for your financial future.",
      businessman: "Time to engineer your financial success. What's your vision for wealth?"
    };

    if (p && greetings[p]) {
      get().addMessage(greetings[p], 'sage');
    }
  },
  setExtractedContext: (ctx: string) => set({ extractedContext: ctx }),

  addMessage: (text: string, sender: 'user' | 'sage') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    set((state: ChatState) => ({
      messages: [...state.messages, { id, text, sender }]
    }));
  },

  resetChat: () => {
    set({
      messages: [],
      currentMessage: '',
      extractedContext: ''
    });
  }
}));

export default useChatStore;