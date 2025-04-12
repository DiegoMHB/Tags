import { PostType } from "../types/postTypes";
import { appStore } from "../zustand/appStore";
import { TimeLeft } from "../types/appTypes";
import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/userStore";
import {  categories } from "../data/listUtilities";

type PopUpPostProps = {
  post: PostType;
  timeLeft: TimeLeft;
};

export default function PopUpPost({ post, timeLeft }: PopUpPostProps) {
  const { selectedUser, setSelectedPost } = appStore();
  const { auth } = userStore();
  const navigate = useNavigate();
  const { minutes } = timeLeft;

  const image = (categories.filter((cat)=> cat.value == post.category))[0]
  const {value} = image


  return (
    <main className="flex flex-col gap-3 w-[200px]">
      <div className="flex justify-between gap-3">
        <img
          className="w-15 h-15 object-cover rounded-full"
          src={
            post.picture
              ? post.picture
              : `../assets/images/${value}.svg`
          }
          alt={"photo"}
        />

        <div className="flex flex-col flex-1">
          <section className="flex justify-end mb-1">
            
            <h2 className="font-bold text-xl">#{post.title} </h2>
          </section>
          <section className="flex justify-between">
            <span className="text-xs">User:</span>
            <span className="font-bold text-xs">{selectedUser?.userName} </span>
          </section>
          <section className="flex justify-between">
            <span className="text-xs">Time left:</span>
            <span className="font-bold text-xs">{minutes}'</span>
          </section>
        </div>
      </div>
      <span className="text-xs">{post.description}</span>
      {auth && (
        <button
          className=" w-15 h-5 m-auto bg-[#c6eef7] rounded-full"
          onClick={() => {
            setSelectedPost(post.id);
            navigate(`/post/${post.id}`);
          }}
        >
          View
        </button>
      )}
    </main>
  );
}
