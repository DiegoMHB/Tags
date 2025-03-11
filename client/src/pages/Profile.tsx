import { useEffect } from "react";
import BtnMain from "../components/buttons/BtnMain";
import PostComponent from "../components/PostComponent";
import ProfileHeader from "../components/ProfileHeader";
import { PostType } from "../types/postTypes";
import { userStore } from "../zustand/userStore";

export default function Profile() {
  const { logOut, allUserPosts, user, getAllUsersPosts,activePost } = userStore();

  useEffect(() => {
    getAllUsersPosts(user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePost]);

  const sortedPosts = allUserPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col justify-between items-center w-screen space-y-4 p-2">
      <div className="w-full">
        <ProfileHeader />
      </div>
      <div className="w-full flex-grow overflow-y-auto scrollbar-hidden rounded-2xl h-[300px]">
        {sortedPosts.map((post: PostType) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>

      <div className=" w-full flex justify-center mb-5 h-[5%]">
        <BtnMain
          mode={0}
          text={"Log Out"}
          onClick={() => logOut()}
          link="/"
          disabled={false}
        />
      </div>
    </div>
  );
}
