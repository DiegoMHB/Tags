import { useEffect, useState } from "react";
import { appStore } from "../zustand/appStore";
import { ChatType, PostType } from "../types/postTypes";
import { User } from "../types/userTypes";

type ChatProps = {
  post: PostType;
};

//if post is usersPosts:
//get every chat from chatList
//else return only coincidence

export default function Chat({ post }: ChatProps) {
  const { getNotOwnedChat } = appStore();
  const [chat, setChat] = useState<ChatType>();

  useEffect(() => {
    const chat = getNotOwnedChat(post.chatList); //get chat of a Post

    setChat(chat);
  }, []);

  return (
    <div>
      <div>{chat?.messages.map((el) => {})}</div>
      <div>
        <input type="text" />
        <div className=" w-15 h-5 flex justify-center items-center bg-[#c6eef7] rounded-full">
          <p className=" text-xs text-black">SEND</p>
        </div>
      </div>
    </div>
  );
}
