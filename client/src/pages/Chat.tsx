import { useEffect, useState } from "react";
import { appStore } from "../zustand/appStore";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";

export default function Chat() {
  const { currentChat, getChatsByPostId, getChatById } = appStore();
  const { userPostsList } = userStore();
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    //id is a post
    if (checkIdType(id!, userPostsList)) {
      setIsOwner(true);
      getChatsByPostId(id!);
    } else {
      //id is a chat
      getChatById(id!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col justify-end w-[100%] space-y-4 ">
      {isOwner && <ChatListComponent/>}
      {!isOwner && currentChat && <ChatComponent open={true} chat={currentChat}/>}
    </main>
  );
}
