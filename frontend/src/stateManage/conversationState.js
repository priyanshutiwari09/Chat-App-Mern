import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation });
  },
  setMessages: (messages) => set({ messages }),
  resetConversation: () => set({ selectedConversation: null, messages: [] }),
}));

export default useConversation;