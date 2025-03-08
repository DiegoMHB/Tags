import { useEffect } from "react";
import BtnMain from "../components/buttons/BtnMain";
import PostComponent from "../components/PostComponent";
import ProfileHeader from "../components/ProfileHeader";
import { PostType } from "../types/postTypes";
import { userStore } from "../zustand/userStore";

export default function Profile() {
  const { logOut, allUserPosts, user, getAllUsersPosts } = userStore();

  useEffect(() => {
    getAllUsersPosts(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedPosts = allUserPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col  items-center w-screen space-y-4 p-2">
      <div className="flex-1 w-full">
        <ProfileHeader />
      </div>

      <div className="flex-5 w-full">
        {sortedPosts.map((post: PostType) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>

      <div className=" w-full flex justify-center mb-5">
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
