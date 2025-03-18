import { useEffect, useState } from "react";
import { ChatType, Message } from "../types/appTypes";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import { v4 as uuidv4 } from "uuid";

type ChatComponentProps = {
  chat: ChatType;
  
};

export default function ChatComponent({chat}: ChatComponentProps) {
  const { currentChat, createMessage, getChatById, selectedUser } = appStore();

  const { user } = userStore();

  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(chat.messages);

  useEffect(
    () => {
      getChatById(chat.id);
      const interval = setInterval(() => {
        setMessages([...currentChat!.messages]);
        return () => clearInterval(interval);
      }, 5000);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.length == 0) return;
    const newMessage = {
      id: uuidv4(),
      content: content,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      ownerId: user.id,
    };
    setMessages((prev) => [...prev, newMessage]);
    await createMessage(newMessage, user.id);
    await getChatById(chat.id);

    setContent("");
  };

  return (
    <main className="flex flex-col justify-end items-center  w-[100%] space-y-4   h-max-[800px]">
      <div className="flex flex-col w-full justify-around h-[100%]">
        <p className="flex-1">
          {selectedUser!.userName} and {user.userName}
        </p>
        <div className={`flex flex-col gap-3`}>
          {messages.map((mes) => (
            <div
              className={` ${
                mes.ownerId === user.id ? "self-end" : "self-start"
              } bg-amber-50 `}
              key={mes.id}
            >
              <p className="text-xs">{mes.date} </p>
              <p>{mes.content}</p>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex flex-row justify-around items-center gap-3 h-[60px] bg-teal-200 w-full p-2"
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white h-[50px] rounded-[25px] w-[90%]"
          />
          <button className="h-[50px] rounded-[100%] w-[50px] bg-white">
            send
          </button>
        </form>
      </div>
    </main>
  );
}

//   const getUsernameById = async (id: string) => {
//     const user = await getUserById(id, true);
//     console.log(user)
//   };
