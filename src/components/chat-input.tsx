"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useChat } from "@/hooks/use-chat";
import { useRouter } from "next/navigation";

export function ChatInputBox() {
  const router = useRouter();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    if (textAreaRef.current) {
      adjustHeight();
    }
  }, [input]);

  const adjustHeight = () => {
    const maxHeight = 150;
    if (textAreaRef.current) {
      if (!input) {
        textAreaRef.current.style.height = "40px";
        return;
      }

      if (textAreaRef.current.scrollHeight > maxHeight) {
        textAreaRef.current.style.height = `${maxHeight}px`;
        textAreaRef.current.style.overflowY = "auto"; // Enable scrollbar
      } else {
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        textAreaRef.current.style.overflowY = "hidden"; // Hide scrollbar if not needed
      }
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(event.target.value);
    adjustHeight();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  return (
    <div className="p-2 flex flex-col rounded-2xl border border-border shadow-sm">
      <Textarea
        ref={textAreaRef}
        value={input}
        onChange={handleInput}
        placeholder="Ask Me anything"
        className="h-10 overflow-hidden bg-transparent resize-none border-none text-base focus-visible:ring-0 focus-visible:outline-none shadow-none"
        rows={3}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
            router.refresh();
            // if (isLoading) {
            //   toast.error("Please wait for the model to finish its response!");
            // } else {
            //   submitForm();
            // }
          }
        }}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          size="icon"
          className="rounded-full font-bold cursor-pointer"
        >
          <ArrowUp className="h-5 w-5 font-bold" strokeWidth="3px" />
        </Button>
      </div>
    </div>
  );
}
