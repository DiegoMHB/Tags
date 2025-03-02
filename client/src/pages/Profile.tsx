import BtnMain from "../components/buttons/BtnMain";
import PostComponent from "../components/PostComponent";
import ProfileHeader from "../components/ProfileHeader";
import { PostType } from "../types/postTypes";
import { userStore } from "../zustand/userStore";

export default function Profile() {
  const { logOut, allUserPosts } = userStore();

  return (
    <div className="flex flex-col  items-center w-screen space-y-4 ">
      <div className="flex-1 w-full">
        <ProfileHeader />
      </div>

      <div className="flex-5 ">
        {allUserPosts.map((post : PostType) => (
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
