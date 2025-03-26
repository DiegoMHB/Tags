import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";
import { appStore } from "../zustand/appStore";
import { chatStore } from "../zustand/chatStore";
import AllChatComponent from "../components/AllChatComponent";

export default function Chat() {
  const { authUserPostsList, allMyChats } = appStore();
  const { user } = userStore();
  const { getAllChats } = chatStore();

  const { id } = useParams();

  const [pageContent, setPageContent] = useState<string>("");

  useEffect(() => {
    if (id === user.id) {
      getAllChats();
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
      {pageContent == "all" && <AllChatComponent allMyChats={allMyChats!}/>}
      {pageContent == "post" && <ChatListComponent />}
      {pageContent == "chat" && <ChatComponent />}
    </main>
  );
}
