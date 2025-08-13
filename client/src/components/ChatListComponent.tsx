import { appStore } from "../zustand/appStore";
import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/userStore";
import { AllChatsListElement } from "../types/appTypes";
import { formatDateTime } from "../assets/helperFunctions/dateFunctions";

type AllChatsCompType = {
  chats?: AllChatsListElement[];
};

export default function ChatListComponent({ chats }: AllChatsCompType) {
  const { user } = userStore();
  const { setSelectedPost, getUserById } = appStore();
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-start items-center w-[100%] space-y-4 p-2 h-max-[800px]">
      {chats && chats.length > 0 ? (
        chats!.map((el) => (
          <div
            key={el.post.id}
            className="flex flex-col justify-start align-middle gap-2 w-[100%] p-2 m-2 rounded-2xl
                    bg-gradient-to-t from-[#FFFFFF]/15 to-[#FFFFFF]/40 "
          >
            <div
              onClick={() => {
                setSelectedPost(el.post.id);
                navigate(`/post/${el.post.id}`);
              }}
              className="flex "
            >
              <img
                className="w-10 h-10 object-cover m-1 mr-0 rounded-[100%]"
                src={
                  el.post.picture
                    ? el.post.picture
                    : `/assets/images/${el.post.category}.svg`
                }
                alt={"photo"}
              />

              <p className="font-bold mt-[12px] ml-2">
                #{el.post.title} - {el.post.category}
              </p>
            </div>
            <div className="bg-black h-[1px] mx-2"></div>

            <div className="mt-1 flex flex-col gap-1 w-[100%] ">
              {el.chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex align-middle jus bg-amber-50/20 rounded-2xl"
                >
                  <img
                    className="w-10 h-10 object-cover m-1 mr-0 rounded-[100%]"
                    src={
                      chat.owner.userName == user.userName
                        ? chat.notOwner.profilePic
                        : chat.owner.profilePic
                    }
                    alt={"photo"}
                    onClick={() => {
                      getUserById(chat.notOwner.userId);
                      navigate(`/profile/${chat.notOwner.userId}`);
                    }}
                  />
                  <div
                    className="flex flex-row justify-between w-[100%] ml-2"
                    onClick={() => {
                      navigate(`/chat/${chat.id}`);
                    }}
                  >
                    <div className="flex flex-col">
                      <p>
                        {chat.owner.userName == user.userName
                          ? chat.notOwner.userName
                          : chat.owner.userName}
                      </p>
                      <p>{chat.messages[chat.messages.length - 1].content}</p>
                    </div>
                    <p className="text-sm ml-[max]">
                      {formatDateTime(
                        chat.messages[chat.messages.length - 1]?.date
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No chats available.</p>
      )}
    </main>
  );
}
