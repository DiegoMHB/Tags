import { PostType } from "../types/postTypes";
import { appStore } from "../zustand/appStore";
import image from "../assets/processed_cv_photo.jpg";

type PopUpPostProps = {
  post: PostType;
};

export default function PopUpPost({ post }: PopUpPostProps) {
  const { selectedUser } = appStore();

  return (
    <main className="flex flex-col gap-3 w-[200px]">
      <div className="flex justify-between gap-3">
        <img
          className="w-15 h-15 object-cover rounded-full items-center"
          src={
            post.picture
              ? post.picture
              : selectedUser?.profilePicture
              ? selectedUser?.profilePicture
              : image
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
            <span className="font-bold text-xs">to calculate</span>
          </section>
        </div>
      </div>
      <span className="text-xs">{post.description}</span>
    </main>
  );
}
