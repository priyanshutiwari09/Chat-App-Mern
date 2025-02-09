import { create } from "zustand";

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   messages: [],
//   // newMssg: null,
//   // setNewMssg: (newMssg) => set({ newMssg }),
//   setSelectedConversation: (selectedConversation) => {
//     set({ selectedConversation });
//   },
//   setMessages: (messages) => set({ messages }),
//   resetConversation: () => set({ selectedConversation: null, messages: [] })
// }));

// const useConversation = create((set) => ({
//   selectedConversation: null,
//   messages: [],
//   setSelectedConversation: (selectedConversation) =>
//     set({ selectedConversation }),

//   setMessages: (newMessages) => {
//     set((state) => {
//       const updatedMessages =
//         typeof newMessages === "function"
//           ? newMessages(state.messages)
//           : newMessages;

//       return { messages: updatedMessages };
//     });
//   },

//   resetConversation: () => set({ selectedConversation: null, messages: [] })
// }));

// export default useConversation;

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  unreadCounts: {}, // New state to track unread message counts

  setSelectedConversation: (selectedConversation) => {
    set((state) => {
      const resetUnread = { ...state.unreadCounts };
      if (selectedConversation?._id) resetUnread[selectedConversation._id] = 0;
      return { selectedConversation, unreadCounts: resetUnread };
    });
  },

  setMessages: (newMessages) => {
    set((state) => {
      const updatedMessages =
        typeof newMessages === "function"
          ? newMessages(state.messages)
          : newMessages;

      return { messages: updatedMessages };
    });
  },

  addUnreadMessage: (conversationId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [conversationId]: (state.unreadCounts[conversationId] || 0) + 1
      }
    })),

  resetConversation: () =>
    set({ selectedConversation: null, messages: [], unreadCounts: {} })
}));

export default useConversation;
