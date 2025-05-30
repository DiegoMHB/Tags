import { useEffect } from "react";
import BtnMain from "../components/buttons/BtnMain";
import PostComponent from "../components/PostComponent";
import ProfileHeader from "../components/ProfileHeader";
import { PostType } from "../types/postTypes";
import { userStore } from "../zustand/userStore";
import { postStore } from "../zustand/postStore";
import { appStore } from "../zustand/appStore";

export default function Profile() {
  const { logOut } = userStore();
  const { authUserPostsList } = appStore();
  const { getUserPosts } = postStore();

  useEffect(() => {
    getUserPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedPosts = authUserPostsList?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col justify-between items-center w-screen space-y-4 p-2">
      <div className="w-full">
        <ProfileHeader />
      </div>
      <div className="w-full flex-grow overflow-y-auto scrollbar-hidden rounded-2xl h-[300px]">
        <div className="flex flex-col justify-between items-center gap-3">
          {sortedPosts!.map((post: PostType) => (
            <PostComponent key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className=" w-full flex justify-center mb-5 h-[5%]">
        <BtnMain
          mode={0}
          text={"Log Out"}
          onClick={() => {
            userStore.setState({ loggedOut: true });
            logOut();
          }}
          link="/"
          disabled={false}
        />
      </div>
    </div>
  );
}
