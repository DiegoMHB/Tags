import { useEffect, useState } from "react";
import { appStore } from "../zustand/appStore";
import { checkOwnerChat } from "../assets/helperFunctions/checkOwnerChat";
import { useParams } from "react-router-dom";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";
import { userStore } from "../zustand/userStore";

export default function Chat() {
  const { chats } = userStore();
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
  }, [postId, chats, chatIds]);

  return (
    <main className="flex flex-col justify-end w-[100%] space-y-4 ">
      {!owner && (
          <div>
            {/* CASE NO CHAT */}
          <ChatComponent></ChatComponent>
        </div>
      )}
      {/* CASE NOT OWNER POST CHAT:SHOWS THE CHAT */}
      {owner == 1 && <ChatComponent chatId={chatIds as string}></ChatComponent>}
      {/* CASE OWNER POST CHAT: SHOWS A LIST OF CHATS */}
      {owner == 2 && (
        <ChatListComponent chatIds={chatIds as string[]}></ChatListComponent>
      )}
    </main>
  );
}
