import { appStore } from "../zustand/appStore";
import { useNavigate } from "react-router-dom";
import { populateStoreWithChatData } from "../assets/helperFunctions/chatFunctions";

export default function ChatListComponent() {
  const { allPostChats, selectedPost } = appStore();
  const navigate = useNavigate();


  if (!selectedPost) {
    return <h3 className="text-2xl self-start">No chats yet</h3>;
  }


  return (
    <main className="flex flex-col justify-start items-center w-[100%] space-y-4 p-2 h-max-[800px]">
      <div>
        <h3 className="text-2xl self-start">{selectedPost.title}</h3>

        {allPostChats && allPostChats.length > 0 ? (
          allPostChats.map((chat) => (
            <div
              key={chat.id}
              onClick={async () => {
                await populateStoreWithChatData(chat.id);
                navigate(`/chat/${chat.id}`);
              }}
              className="cursor-pointer p-2 border border-gray-200 rounded-lg shadow-md"
            >
              <p>With <span className="font-bold">{chat.context.notOwner?.userName || "Unknown"}</span></p>
              <p>
                {chat.messages.length > 0 
                  ? chat.messages[chat.messages.length - 1].content 
                  : "No messages yet"}
              </p>
            </div>
          ))
        ) : (
          <p>No chats available.</p>
        )}
      </div>
    </main>
  );
}
