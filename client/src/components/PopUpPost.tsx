import { PostType } from "../types/postTypes";
import { appStore } from "../zustand/appStore";
import defaultUser from "../assets/processed_cv_photo.jpg";
import { TimeLeft } from "../types/appTypes";
import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/userStore";

type PopUpPostProps = {
  post: PostType;
  timeLeft: TimeLeft;
};

export default function PopUpPost({ post, timeLeft }: PopUpPostProps) {
  const { selectedUser, loading, setSelectedPost } = appStore();
  const { auth } = userStore();
  const navigate = useNavigate();
  const { minutes } = timeLeft;

  return (
    <main className="flex flex-col gap-3 w-[200px]">
      <div className="flex justify-between gap-3">
        {loading ? (
          <div className="w-15 h-15rounded-full bg-indigo-200" />
        ) : (
          <img
            className="w-15 h-15 object-cover rounded-full items-center"
            src={
              post.picture
                ? post.picture
                : selectedUser?.profilePicture
                ? selectedUser?.profilePicture // TODO: icon depending on category
                : defaultUser
            }
            alt={"photo"}
          />
        )}
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
            setSelectedPost(post)
            navigate(`/post/${post.id}`)}}
        >
          View
        </button>
      )}
    </main>
  );
}
