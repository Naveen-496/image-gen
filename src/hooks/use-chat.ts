import { create } from "zustand";

type Message = {
  id: string;
  content: string;
};

type AiMessage = {
  role: "assistant";
  imageUrl?: string;
} & Message;

type UserMessage = {
  role: "user";
} & Message;

const backendUrl = "/api/generate-image";

interface ChatStore {
  messages: (UserMessage | AiMessage)[];
  input: string;
  isSubmitting: boolean;
  imageUrl?: string;
  error?: string;
  handleInputChange: (value: string) => void;
  handleSubmit: () => Promise<void>;
}

export const useChat = create<ChatStore>((set, get) => ({
  messages: [],
  input: "",
  isSubmitting: false,
  imageUrl: "",
  error: "",

  handleInputChange: (value) => {
    set({ input: value });
  },

  handleSubmit: async () => {
    const { input, messages } = get();
    if (!input.trim()) return;

    const userMessage: UserMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };
    set({
      messages: [...messages, userMessage],
      isSubmitting: true,
    });

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const { imageUrl } = await response.json();
      set((state) => ({
        isSubmitting: false,
        imageUrl,
      }));
    } catch (error: any) {
      console.error("Error fetching AI response:", error);
      set({ isSubmitting: false, error: error.message });
    }
  },
}));
