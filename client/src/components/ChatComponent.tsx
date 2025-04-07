import { useEffect, useRef, useState } from "react";
import { Message } from "../types/appTypes";
import { appStore, AppStoreType } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import { v4 as uuidv4 } from "uuid";
import { chatStore } from "../zustand/chatStore";
import { useParams } from "react-router-dom";

export default function ChatComponent() {
  const { selectedChat } = appStore();
  const { createMessage, getChatById } = chatStore();
  const { user } = userStore();
  const { id } = useParams();

  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[] | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!id) return;

    const fetchChat = async () => {
      await getChatById(id);
      const updatedChat = appStore.getState().selectedChat;
      if (updatedChat) {
        setMessages(updatedChat.messages);
      }
    };

    fetchChat();
    const interval = setInterval(fetchChat, 5000);

    return () => clearInterval(interval);
  }, [id, getChatById]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length === 0) return;

    const newMessage: Message = {
      id: uuidv4(),
      content: content,
      date: new Date().toLocaleString("en-US", {
        minute: "2-digit",
        hour: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      ownerId: user.id,
    };

    appStore.setState((state: AppStoreType) => ({
      selectedChat: {
        ...state.selectedChat!,
        messages: [...state.selectedChat!.messages, newMessage],
      },
    }));

    setMessages((prev) => (prev ? [...prev, newMessage] : [newMessage]));

    setContent("");
    await createMessage(id!,newMessage,user.id);
  };

  if (!selectedChat) {
    return <p className="text-center text-xl mt-4">No chat selected.</p>;
  }

  return (
    <main className="flex flex-col h-screen w-full relative ">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-1000 flex flex-row  gap-2 h-[70px]">
        <img
          src={selectedChat?.context.owner.profilePic}
          className="w-[50px] h-[50px] rounded-[100%] object-cover"
        />
        <img
          src={selectedChat?.context.notOwner.profilePic}
          className="w-[50px] h-[50px] rounded-[100%] object-cover"
        />
      </div>

      <div className="flex flex-col-reverse overflow-y-auto flex-grow space-y-2">
        <div className="flex flex-col overflow-y-auto flex-grow max-h-[calc(100vh-195px)] space-y-2 scrollbar-hidden pb-[60px] ">
          {messages &&
            messages.map((mes) => (
              <div
                className={`max-w-[80%] mx-2 px-3 py-1 rounded-xl ${
                  mes.ownerId === user.id
                    ? "self-end bg-amber-300 text-black"
                    : "self-start bg-gray-200 text-black"
                }`}
                key={mes.id}
              >
                <p>{mes.content}</p>
                <p className="text-xs text-gray-500 mt-1">{mes.date} </p>{" "}
                {/*ONLY HOUR IF SAME DAY*/}
              </div>
            ))}
          <div ref={messagesEndRef}></div>
        </div>
        <form
          onSubmit={handleSendMessage}
          className="absolute bottom-0 bg-[#e0f5e9] flex items-center p-2   w-full "
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-white rounded-full p-3 ml-2 outline-none"
          />
          <button className="mx-2 bg-white rounded-full p-3 text-black">
            send
          </button>
        </form>
      </div>
    </main>
  );
}
