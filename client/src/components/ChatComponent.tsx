import { useEffect, useState } from "react";
import { ChatType, Message } from "../types/appTypes";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";

type ChatComponentProps = {
  open: boolean;
  chat: ChatType;
  owner: boolean;
};
export default function ChatComponent({
  open,
  chat,
  owner,
}: ChatComponentProps) {
  const { selectedUser, currentChat, createMessage, getChatById, getUserById } =
    appStore();
  const { user } = userStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [isUser, setIsUser] = useState<boolean>(true);

  useEffect(
    () => {
      if (!owner) {
        setIsOpen(open);
        setMessages([...chat.messages]);
        console.log(messages);
      }
      if (user.id != chat.ownerId) {
        setIsUser(true);
      }
      const interval = setInterval(() => {
        console.log("interval: checking if there is a new message");
        getChatById(currentChat!.id);
      }, 5000);

      return () => clearInterval(interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.length == 0) return;
    const newMessage = {
      content: message,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    createMessage(newMessage.content, user.id);

    setMessage("");
  };

  return (
    <main className="flex flex-col justify-end items-center  w-[100%] space-y-4   h-max-[800px]">
      {isOpen ? (
        <div className="flex flex-col w-full justify-around h-[100%]">
          <p className="flex-1">
            {selectedUser?.userName} and {user.userName}
          </p>
          <div className={`flex flex-col gap-3`}>
            {messages.map((mes) => (
              <div
                className={` ${
                  isUser ? "self-end" : "self-start"
                } bg-amber-50 `}
                key={mes.date}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white h-[50px] rounded-[25px] w-[90%]"
            />
            <button className="h-[50px] rounded-[100%] w-[50px] bg-white">
              send
            </button>
          </form>
        </div>
      ) : (
        <div>
          { <p>{selectedUser?.userName}</p>}
          {chat &&  <p>{chat.notOwnerId}</p>}    
          <button
            onClick={() => {
              getUserById(chat.notOwnerId);
              setIsOpen(true);
            }}
          >
            OPEN
          </button>
        </div>
      )}
    </main>
  );
}
