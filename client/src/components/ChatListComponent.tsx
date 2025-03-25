import { useEffect, useState } from "react";
import { appStore } from "../zustand/appStore";
import { useNavigate } from "react-router-dom";
import { populateStoreWithChatData } from "../assets/helperFunctions/chatFunctions";

export default function ChatListComponent() {
  const { allPostChats, selectedPost } = appStore();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 50);
  });

  if (loading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col justify-start items-center  w-[100%] space-y-4 p-2  h-max-[800px]">
      {selectedPost ? (
        <div>
          <h3 className="text-2xl self-start ">{selectedPost!.title}</h3>
          {allPostChats &&
            allPostChats.map((chat) => (
              <div
                key={chat.id}
                onClick={async () => {
                  await populateStoreWithChatData(chat.id);
                  navigate(`/chat/${chat.id}`);
                }}
              >
                <p>with{chat.context.notOwner.userName}</p>
                <p>{chat.messages[chat.messages.length - 1].content}</p>
              </div>
            ))}
        </div>
      ) : (
        <h3 className="text-2xl self-start ">No chats yet</h3>
      )}
    </main>
  );
}
