import { useEffect, useState } from "react";
import { PostType } from "../types/postTypes";
import { TimeLeft } from "../types/appTypes";
import calculateTimeLeft from "../assets/helperFunctions/calculateTimeLeft";
import { userStore } from "../zustand/userStore";
import stampToDate from "../assets/helperFunctions/stampToDate";
import { useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";
import { postStore } from "../zustand/postStore";

type PostComponentProps = {
  post: PostType;
};

export default function PostComponent({ post }: PostComponentProps) {
  const { selectedUser ,setSelectedPost } = appStore();
  const { user } = userStore();
  const { getUserPosts } = postStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(post.destroyAt, post.createdAt)
  );

  const navigate = useNavigate();

  useEffect(() => {
    //green/red not changing when closing before expiration time
    if (post.isActive) {
      if (timeLeft.percentage <= 0) {
        getUserPosts();
      } else {
        const interval = setInterval(() => {
          if (post.isActive) {
            setTimeLeft(calculateTimeLeft(post.destroyAt, post.createdAt));
          }
        }, 15000);
        return () => clearInterval(interval);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  {
    /* {!imageLoaded && post.picture && (
    <div className="w-8 h-8 bg-indigo-200 animate-pulse "></div>
  )} */
  }
  return (
    <section
      className="flex flex-col w-full p-2 mt-0 rounded-2xl relative
    bg-gradient-to-t from-[#FFFFFF]/30 to-[#FFFFFF]/40"
    >
      {post.picture && (
        <div className="w-15 h-15 rounded-full overflow-hidden flex items-center justify-center absolute right-[20px] top-[35px]">
          <img
            className={`w-full h-full transition-opacity duration-500 transform ${
              imageLoaded ? "opacity-100 scale-200" : "opacity-0 scale-100"
            }`}
            src={post.picture}
            alt="photo"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      <div className=" flex flex-col w-full ml-2 ">
        <div className="flex flex-row justify-between gap-3">
          <h3
            className="text-xl font-bold flex items-baseline gap-3"
            onClick={() => {
              setSelectedPost(post.id)
              navigate(`/post/${post.id}`);
            }}
          >
            {post.title}
            <div
              className={`${
                post.isActive ? "bg-green-500" : "bg-red-600"
              } w-3 h-3 rounded-xl`}
            ></div>
          </h3>
        </div>

        <div className="flex justify-between items-baseline ">
          <p className="text-xs font-bold">Category:</p>
          <p className="text-xs mr-[100px]">{post!.category}</p>
        </div>
        {post.isActive && (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">Duration:</p>
            <p className="text-xs mr-[100px]">{timeLeft.minutes}'</p>
          </div>
        )}
        {!post.isActive && (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">Date:</p>
            <p className="text-xs mr-[100px]">
              {post && stampToDate(post.createdAt as string)}
            </p>
          </div>
        )}
        {post.userId == user.id ? null : (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">User:</p>
            <p className="text-xs mr-[100px]">{selectedUser!.userName}</p>
          </div>
        )}
        <div className="flex justify-between items-baseline ">
          <p className="text-xs font-bold">Chats:</p>
          <p className="text-xs mr-[100px]">2</p>
        </div>
        <div className="flex flex-col items-baseline">
          <p className="text-xs font-bold">Description:</p>
          <p className="text-[14px] ">{post.description}</p>
        </div>
      </div>
    </section>
  );
}
