import { useNavigate } from "react-router-dom";
import { AllChatsListElement } from "../types/appTypes";
import { appStore } from "../zustand/appStore";
import { useEffect, useState } from "react";
import { userStore } from "../zustand/userStore";

type AllChatsCompType = {
  allChats?: AllChatsListElement[];
};

export default function AllChatComponent({ allChats }: AllChatsCompType) {
  const { setSelectedPost } = appStore();
  const { user } = userStore();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (allChats && allChats.length > 0) {
      setLoading(false);
    }
  }, [allChats]);

  if (loading) {
    return <p className="text-center">Loading chats...</p>; // Mensaje de carga
  }

  return (
    <div>
      {allChats?.map((el) => (
        <div
          key={el.post.id}
          className="flex flex-col justify-start align-middle gap-2  rounded-2xl
                bg-gradient-to-t from-[#FFFFFF]/15 to-[#FFFFFF]/40 p-1 m-2"
        >
          <div
            onClick={() => {
              setSelectedPost(el.post.id);
              navigate(`/post/${el.post.id}`);
            }}
            className="flex "
          >
            {el.post.picture ? (
              <img
                className="w-10 h-10 object-cover m-1 mr-0 rounded-[100%]"
                src={el.post.picture}
                alt={"photo"}
              />
            ) : (
              <img
                className="w-10 h-10 object-cover m-1 mr-0 rounded-[100%]"
                src={
                  el.chats[0].owner.userName === user.userName
                    ? el.chats[0].notOwner.profilePic
                    : el.chats[0].owner.profilePic
                }
                alt={"photo"}
              />
            )}
            <p className="font-bold mt-[12px] ml-2">
              #{el.post.title} - {el.post.category}
            </p>
          </div>

          {el.chats.map((chat) => (
            <div key={chat.id} className="ml-8 p-2 bg-amber-50/20 rounded-2xl">
              <p
                onClick={() => {
                  navigate(`/chat/${chat.id}`);
                }}
              >
                With{" "}
                <span className="font-bold">
                  {chat.owner.userName == user.userName
                    ? chat.notOwner.userName
                    : chat.owner.userName}{" "}
                </span>
                at{" "}
                <span className="font-bold">
                  {chat.messages[chat.messages.length - 1]?.date}
                </span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
