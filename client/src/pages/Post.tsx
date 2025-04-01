import { useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import BtnMain from "../components/buttons/BtnMain";
import PostComponent from "../components/PostComponent";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatListElement, PostType } from "../types/postTypes";
import { checkExistingChat } from "../assets/helperFunctions/checkExistingChat";
import { chatStore } from "../zustand/chatStore";
import { postStore } from "../zustand/postStore";
import {
  populateStoreWithChatData,
  populateStoreWithChatDataList,
} from "../assets/helperFunctions/chatFunctions";

export default function Post() {
  const {
    fotoUrl,
    selectedFile,
    allActivePosts,
    selectedUser,
    authUserPostsList,
    authUserActivePost,
  } = appStore();
  const { createChat } = chatStore();
  const { deletePost, closeActivePost } = postStore();
  const { user } = userStore();

  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (selectedUser && user.id === selectedUser.id) {
      appStore.setState({ selectedUser: null });
    }
    const allPosts = [...allActivePosts!, ...authUserPostsList!];
    const postById = allPosts.find((post) => post.id == id);
    setPost(postById!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allActivePosts, authUserPostsList, id]);

  async function handleChatClick() {
    if (post!.userId === user.id) {
      //owner
      populateStoreWithChatDataList(post!.id);
      navigate(`/chat/${post!.id}`);
    } else {
      //not owner
      const chat = checkExistingChat(user.id, post!) as ChatListElement;

      if (chat) {
        const { chatId } = chat;
        await populateStoreWithChatData(chatId);
        navigate(`/chat/${chatId}`);
      } else {
        const newChat = await createChat(post!.id, post!.userId, user.id);
        await populateStoreWithChatData(newChat!.id);
        navigate(`/chat/${newChat!.id}`);
      }
    }
  }

  //TODO: component for the map with props and attributes
  //TODO: Profileheader of the user

  return (
    <main className="flex flex-col justify-center items-center w-screen">
      {/*POST HEADER*/}

      {authUserActivePost && post && post.id === authUserActivePost.id && (
        <h3 className="text-xl text-center mb-3">You have an active post:</h3>
      )}

      <div
        className="flex flex-col justify-center items-center gap-3
                    bg-gradient-to-t from-[#FFFFFF]/60 to-[#FFFFFF]/40 rounded-2xl "  >
        {post &&
          post.userId == user.id &&
          post.id !== authUserActivePost?.id && (
            <h3 className="text-2xl text-center m-3">Closed post:</h3>
          )}
        {selectedUser && post && post.userId !== user.id && (
          <h3 className="text-xl text-center m-1">
            Active post from: {selectedUser.name}
          </h3>
        )}

        <div className="flex flex-col justify-center items-center ">
          {post && (
            <div className=" flex flex-col items-center w-[350px] p-2 gap-2">
              <PostComponent post={post!}></PostComponent>
            </div>
          )}

          {post && post.userId === user.id && (
            <div className="flex flex-row justify-center gap-6 items-center w-[100%] ">
              {authUserActivePost &&
                post &&
                post.id === authUserActivePost.id && (
                  <BtnMain
                    text="Edit Post"
                    disabled={selectedFile && !fotoUrl ? true : false}
                    mode={3}
                    link=""
                    onClick={() => navigate("/postForm")}
                  />
                )}
              <BtnMain
                text="Delete Post"
                disabled={selectedFile && !fotoUrl ? true : false}
                mode={2}
                link=""
                onClick={() => {
                  deletePost(post!.id);
                  navigate("/Profile");
                }}
              />
              {authUserActivePost &&
                post &&
                post.id === authUserActivePost.id && (
                  <BtnMain
                    text="Close Post"
                    disabled={selectedFile && !fotoUrl ? true : false}
                    mode={2}
                    link=""
                    onClick={() => {
                      closeActivePost();
                      navigate("/Profile");
                    }}
                  />
                )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-center mb-5 w-full ">
          <BtnMain
            text="GO TO THE CHAT"
            disabled={false}
            mode={0}
            link=""
            onClick={handleChatClick}
          />
        </div>
      </div>
    </main>
  );
}
