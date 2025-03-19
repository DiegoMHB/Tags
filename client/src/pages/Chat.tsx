import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";
import { chatStore } from "../zustand/chatStore";
import { renderChat } from "../assets/helperFunctions/chatFunctions";
import { ChatType } from "../types/appTypes";
import { appStore } from "../zustand/appStore";

export default function Chat() {
  const { getChatsByPostId } = chatStore();
  const { user } = userStore();
  const {authUserPostsList, setSelectedPost } = appStore()

  const { id } = useParams();

  const [pageContent, setPageContent] = useState<string>("");
  const [chat, setChat] = useState<ChatType | null>(null);

  useEffect(() => {
    //id is users Id
    if (id === user.id) {
      // getAllChats(id);
      setPageContent("all");
    } else if (checkIdType(id!, authUserPostsList)) {
      //id is a post
      getChatsByPostId(id!);
      setSelectedPost(id!);
      setPageContent("post");
    } else {
      //id is a chat
      const data = renderChat(id!);
      console.log(data);
      setChat(chat);
      setPageContent("chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main className="flex flex-col justify-start w-[100%] space-y-4 ">
      {pageContent == "all" && <div>ALL POST CHAT LIST</div>}
      {pageContent == "post" && <ChatListComponent />}
      {pageContent == "chat" && <ChatComponent />}
    </main>
  );
}
