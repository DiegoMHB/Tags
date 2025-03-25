import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";
import { appStore } from "../zustand/appStore";

export default function Chat() {
  const { authUserPostsList } = appStore();
  const { user } = userStore();

  const { id } = useParams();

  const [pageContent, setPageContent] = useState<string>("");

  useEffect(() => {
    if (id === user.id) {
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
      {pageContent == "all" && <div>ALL POST CHAT LIST</div>}
      {pageContent == "post" && <ChatListComponent />}
      {pageContent == "chat" && <ChatComponent />}
    </main>
  );
}
