import { appStore } from "../zustand/appStore";
import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/userStore";
import { AllChatsListElement } from "../types/appTypes";

type AllChatsCompType = {
    chats?: AllChatsListElement[];
};

export default function ChatListComponent({ chats }: AllChatsCompType) {
  const { user } = userStore();
  const {  selectedPost, setSelectedPost } = appStore();
  const navigate = useNavigate();

 
 

  return (
    <main className="flex flex-col justify-start items-center w-[100%] space-y-4 p-2 h-max-[800px]">
      <div>
        <h3 className="text-2xl self-start">{selectedPost?.title}</h3>

        {chats && chats.length > 0 ? (
          chats?.map((el) => (
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
                <div
                  key={chat.id}
                  className="ml-8 p-2 bg-amber-50/20 rounded-2xl"
                >
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
          ))
        ) : (
          <p>No chats available.</p>
        )}
      </div>
    </main>
  );
}
