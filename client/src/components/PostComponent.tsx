import { useEffect, useState } from "react";
import { PostType } from "../types/postTypes";
import { TimeLeft } from "../types/appTypes";
import calculateTimeLeft from "../assets/helperFunctions/calculateTimeLeft";
import { userStore } from "../zustand/userStore";

type PostComponentProps = {
  post: PostType;
};
export default function PostComponent({ post }: PostComponentProps) {
  const { activePost, user, getAllUsersPosts } = userStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(post.destroyAt, post.createdAt)
  );

  //   const navigate = useNavigate();

  useEffect(() => {
    if (post.isActive) {
      if (timeLeft.percentage <= 0) {
        getAllUsersPosts(user.id);
      } else {
        const interval = setInterval(() => {
          if (post.isActive) {
            console.log(post.title);
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
    <section className="flex flex-col w-full p-2 rounded-2xl relative">
      {post.picture && (
        <div className="w-15 h-15 rounded-full overflow-hidden flex items-center justify-center absolute right-[15px] top-[15px]">
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
          <h3 className="text-xl font-bold flex items-baseline gap-3">
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
          <p className="text-xs mr-[60%]">{post!.category}</p>
        </div>
        {post.isActive && (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">Duration:</p>
            <p className="text-xs mr-[60%]">{timeLeft.minutes}'</p>
          </div>
        )}
        {activePost?.userId && user.id ? null : (
          <div className="flex justify-between items-baseline ">
            <p className="text-xs font-bold">User:</p>
            <p className="text-xs mr-[60%]">{user.userName}</p>
          </div>
        )}
        <div className="flex flex-col items-baseline">
          <p className="text-xs font-bold">Description:</p>
          <p className="text-s ">{post.description}</p>
        </div>
      </div>
    </section>
  );
}
