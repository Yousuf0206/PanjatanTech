"use client";

import { MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui";

// Panel code is not fetched until the user opens chat.
const ChatPanel = dynamic(() => import("@/components/chat/chat-panel").then((m) => m.ChatPanel), { ssr: false });

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <ChatPanel onClose={() => setOpen(false)} intercomAppId={INTERCOM_APP_ID} />}
      <Button
        variant="primary"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        aria-controls="chat-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <MessageCircle aria-hidden="true" />
      </Button>
    </>
  );
}
