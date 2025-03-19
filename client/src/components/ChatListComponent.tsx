import { chatStore } from "../zustand/chatStore";
import { postStore } from "../zustand/postStore";
import { useNavigate } from "react-router-dom";

export default function ChatListComponent() {
  const { selectedPost } = postStore();
  const { allPostChats } = chatStore();

  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-start items-center  w-[100%] space-y-4 p-2  h-max-[800px]">
      <h3 className="text-2xl self-start ">{selectedPost!.title}</h3>
      {allPostChats?.map((chat) => (
        <div
          key={chat.id}
          onClick={() => {
            navigate(`/chat/${chat.id}`);
          }}
        >
          <p>{chat.notOwnerUserName}</p>
          <p>{chat.messages[chat.messages.length - 1].content}</p>
        </div>
      ))}
    </main>
  );
}
