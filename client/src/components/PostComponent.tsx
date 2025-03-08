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
    if(post.isActive){
    if (timeLeft.percentage <= 0) {
      getAllUsersPosts(user.id)
    } else {
      const interval = setInterval(() => {
        if (post.isActive){
            console.log(post.title)
        setTimeLeft(calculateTimeLeft(post.destroyAt, post.createdAt));}
      }, 15000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }}, [timeLeft]);

  return (
    <section className="flex flex-col w-full p-2 rounded-2xl
    bg-gradient-to-t from-[#FFFFFF]/30 to-[#FFFFFF]/40">
      <div className="flex flex-row gap-3">
        {!imageLoaded && post.picture && (
          <div className="w-20 h-20 bg-indigo-200 animate-pulse "></div>
        )}
        {post.picture && (
          <img
            className={`w-20 h-20 object-cover transition-opacity  rounded-[100%] duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={post.picture}
            alt="photo"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        <div className=" flex flex-col w-full">
          <div className="flex flex-row items-center gap-3">
            <div
              className={`${
                post.isActive ? "bg-green-500" : "bg-red-600"
              } w-3 h-3 rounded-xl`}
            ></div>
            <h3 className="text-xl font-bold">{post.title}</h3>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Category:</p>
            <p className="text-xs font-bold">{post!.category}</p>
          </div>
         { post.isActive && <div className="flex justify-between items-baseline ">
            <p className="text-xs">Duration:</p>
            <p className="text-xs font-bold">{timeLeft.minutes}'</p>
          </div>}
          {activePost?.userId && user.id ? null : (
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">User:</p>
              <p className="text-xs font-bold">{user.userName}</p>
            </div>
          )}
        </div>
        
      </div>
      <div className="flex flex-col items-baseline mt-2 ">
        <p className="text-xs">Description:</p>
        <p className="text-xs">{post.description}</p>
      </div>
    </section>
  );
}
