import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";
import { appStore } from "../zustand/appStore";
import { chatStore } from "../zustand/chatStore";
import { AllChatsListElement } from "../types/appTypes";

export default function Chat() {
  const { authUserPostsList, allChats, selectedPost } = appStore();
  const { user } = userStore();
  const { getAllChats } = chatStore();

  const { id } = useParams();

  const [pageContent, setPageContent] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState<
    AllChatsListElement[] | []
  >([]);

  useEffect(() => {
    getAllChats();
    if (id === user.id) {
      setPageContent("all");
    } else if (checkIdType(id!, authUserPostsList!)) {
        console.log("selectedPost",selectedPost)
      const postId = selectedPost?.id;
      if (!postId) return;
      const filtered = allChats?.filter((chat) => chat.post.id === postId);
      setFilteredChats(filtered ?? []);
      setPageContent("post");
    } else {
      setPageContent("chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main className="flex flex-col justify-start w-[100%] space-y-4 ">
      {pageContent == "all" && <ChatListComponent chats={allChats!} />}
      {pageContent == "post" && <ChatListComponent chats={filteredChats} />}
      {pageContent == "chat" && <ChatComponent />}
    </main>
  );
}
//todo:
//if AllChats changes refresh
