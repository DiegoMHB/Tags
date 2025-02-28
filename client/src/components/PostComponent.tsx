import { useEffect, useState } from "react";
import { PostType } from "../types/postTypes";
import { TimeLeft } from "../types/appTypes";
import calculateTimeLeft from "../assets/helperFunctions/calculateTimeLeft";
import { useNavigate } from "react-router-dom";

type PostComponentProps = {
  post: PostType;
};
export default function PostComponent({ post }: PostComponentProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(post.destroyAt, post.createdAt)
  );

  useEffect(() => {
    if (timeLeft.percentage <= 0) {
      navigate(0);
    } else {
      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(post.destroyAt, post.createdAt));
      }, 8000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  return (
    <section className="flex flex-col justify-between h-full w-full">
      <div className="flex m-5 gap-5 ">
        {!imageLoaded && (
          <div className="w-25 h-25 bg-indigo-200 animate-pulse"></div>
        )}
        {post.picture && (
          <img
            className={`w-25 h-25 object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={post.picture}
            alt="photo"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        <div className=" flex flex-col w-full h-20">
          <div className="flex flex-row items-center gap-3">
            <div
              className={`${
                post.isActive ? "bg-green-500" : "bg-red-600"
              } w-3 h-3 rounded-xl`}
            ></div>
            <h3 className="text-xl">{post.title}</h3>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Category:</p>
            <p className="text-xs">{post!.category}</p>
          </div>
          <div className="flex justify-between items-baseline ">
            <p className="text-xs">Duration:</p>
            <p className="text-xs">{timeLeft.minutes}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-baseline ">
        <p className="text-xs">Description:</p>
        <p className="text-xs">{post.description}</p>
      </div>
    </section>
  );
}
