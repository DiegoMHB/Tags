import { useEffect, useState } from "react";
import { Message } from "../types/appTypes";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import { v4 as uuidv4 } from "uuid";
import { chatStore } from "../zustand/chatStore";
import { useParams } from "react-router-dom";

export default function ChatComponent() {
  const {  selectedChat } = appStore();
  const { createMessage, getChatById } = chatStore();
  const { user } = userStore();
  const { id } = useParams();

  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(selectedChat){
        setLoading(false)
    }
  },[])

  useEffect(
    () => {
      const interval = setInterval(() => {
        getChatById(id!);
        setMessages([...selectedChat!.messages]);
      }, 5000);
      return () => clearInterval(interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedChat,loading]
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.length == 0) return;
    const newMessage = {
      id: uuidv4(),
      content: content,
      date: new Date().toLocaleDateString("en-US", {
        minute:"2-digit",
        hour: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      ownerId: user.id,
    };

    setMessages((prev) => {
        if(prev){
            return [...prev, newMessage]
        }else return[newMessage]
    });
    await createMessage(newMessage, user.id);

    setContent("");
  };

 

  return (

    <main className="flex flex-col h-screen w-full relative">
     { loading? 
     <p>Loading...</p>
     :<div className="flex flex-col-reverse overflow-y-auto flex-grow space-y-2 scrollbar-hidden    ">
        {/* <p className="flex-1">
          {selectedUser!.userName} and {user.userName}
        </p> */}
        <div className={`flex flex-col gap-2 p-3 h-max-[600px] mb-15`}>
          {messages &&
            messages.map((mes) => (
              <div
              className={`max-w-[80%] px-3 py-1 rounded-xl ${
                mes.ownerId === user.id
                  ? "self-end bg-amber-300 text-black"
                  : "self-start bg-gray-200 text-black"
              }`}
                key={mes.id}
              >
                <p>{mes.content}</p>
                <p className="text-xs text-gray-500 mt-1">{mes.date} </p> {/*ONLY HOUR IF SAME DAY*/}
              </div>
            ))}
        </div>
        <form
          onSubmit={handleSendMessage}
         className= "absolute bottom-0  flex items-center p-2   bg-gray-400 w-full "
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 bg-gray-100 rounded-full p-3 ml-2 outline-none"
          />
          <button className="mx-2 bg-white rounded-full p-3 text-gray-700">
            send
          </button>
        </form>
      </div>}
    </main>
  );
}
