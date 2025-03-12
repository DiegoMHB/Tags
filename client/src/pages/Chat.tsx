import { useEffect, useState } from "react";
import { appStore } from "../zustand/appStore";
import { checkOwnerChat } from "../assets/helperFunctions/checkOwnerChat";
import { useParams } from "react-router-dom";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";

export default function Chat() {
  const { chats } = appStore();
  const [owner, setOwner] = useState<number>(0);
  const [chatIds, setChatIds] = useState<string | string[]>("");

  const { postId } = useParams();

  useEffect(() => {
    const idList = checkOwnerChat(chats, postId!);
    if (idList === null) {
      setOwner(0);
    } else if (typeof idList == "string") {
      setOwner(1);
      setChatIds(idList);
    } else {
      setOwner(2);
      setChatIds(idList);
    }
  }, [postId, chats]);

  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      {!owner && (
        <div>
          <ChatComponent ></ChatComponent>
        </div>
      )}
      {owner == 1 && <ChatComponent chatId={chatIds as string}></ChatComponent>}
      {owner == 2 && <ChatListComponent chatIds={chatIds as string[]}></ChatListComponent>}
    </main>
  );
}
