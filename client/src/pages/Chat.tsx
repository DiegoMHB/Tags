import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";
import { appStore } from "../zustand/appStore";
import { chatStore } from "../zustand/chatStore";
import { Context } from "../types/appTypes";

export default function Chat() {
  const { authUserPostsList, allMyChats} = appStore();
  const { user } = userStore();
  const { getAllChats } = chatStore();

  const { id } = useParams();

  const [pageContent, setPageContent] = useState<string>("");

  useEffect(() => {
    if (id === user.id) {
        getAllChats()
      setPageContent("all");
    } else if (checkIdType(id!, authUserPostsList!)) {
      setPageContent("post");
    } else {
       setPageContent("chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main className="flex flex-col justify-start w-[100%] space-y-4 ">
      {pageContent == "all" && <div>
        <div>
    {allMyChats &&
      Object.values(allMyChats).map(({ post, chats }) => (
        <div key={post.id} className="border p-3 my-2">
          <p className="font-bold">Post title: {post.title}</p>
          <p>Post category: {post.category}</p>

          {chats.map((chat ) => (
            <div key={chat.id} className="ml-4 p-2 border-l">
              <p>Usuario: {chat.notOwner.userName}</p>
              <p>Último mensaje: {chat.messages[chat.messages.length - 1]?.content || "No hay mensajes"}</p>
            </div>
          ))}
        </div>
      ))}
  </div>
        </div>}
      {pageContent == "post" && <ChatListComponent />}
      {pageContent == "chat" && <ChatComponent />}
    </main>
  );
}
