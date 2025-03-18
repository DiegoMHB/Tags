import { useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import BtnMain from "../components/buttons/BtnMain";
import PostComponent from "../components/PostComponent";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatListElement, PostType } from "../types/postTypes";
import { checkExistingChat } from "../assets/helperFunctions/checkExistingChat";
import { chatStore } from "../zustand/chatStore";
import { postStore } from "../zustand/postStore";

export default function Post() {
  const { fotoUrl, selectedFile, posts, selectedUser } = appStore();
  const { getChatById, createChat } = chatStore();
  const { deletePost, closeActivePost, userPostsList, activePost } = postStore()
  const {  user } =  userStore();

  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const allPosts = [...posts, ...userPostsList];
    const postById = allPosts.find((post) => post.id == id);
    setPost(postById!);
  }, [posts, userPostsList, id]);

  async function handleChatClick() {
    //owner
    if (post!.userId === user.id) {
      navigate(`/chat/${post!.id}`);
    } else {
      //not owner
      const chat = checkExistingChat(user.id, post!) as ChatListElement;

      if (chat) {
        const { chatId } = chat;
        await getChatById(chatId);
        navigate(`/chat/${chatId}`);
      } else {
        const chat = await createChat(post!.id, post!.userId, user.id);
        navigate(`/chat/${chat!.id}`);
      }
    }
  }

  //TODO: component for the map with props and attributes
  //TODO: Profileheader of the user
  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      {/*POST HEADER*/}
      {activePost && post && post.id === activePost.id && (
        <h3 className="text-xl text-center m-0">You have an active post:</h3>
      )}

      {post && post.userId == user.id && post.id !== activePost?.id && (
        <h3 className="text-2xl text-center m-3">Closed post:</h3>
      )}
      {selectedUser && post && post.userId !== user.id && (
        <h3 className="text-xl text-center m-1">
          Active post from: {selectedUser.name}
        </h3>
      )}

      <div>
        {post && (
          <div className=" flex flex-col items-center w-[350px] mt-0 p-2 gap-2">
            <PostComponent post={post!}></PostComponent>

            <MapContainer
              center={post!.coordinates! as LatLngTuple}
              zoom={15}
              id="mapPost"
              zoomControl={false}
            >
              <TileLayer
                url={mapUtilities.url}
                attribution={mapUtilities.attribution}
                id="map"
              />
              <Marker position={post!.coordinates as LatLngTuple}></Marker>
            </MapContainer>
          </div>
        )}

        {post && post.userId === user.id && (
          <div className="flex flex-col justify-between items-center w-[100%] pb-5 mt-5">
            {activePost && post && post.id === activePost.id && (
              <BtnMain
                text="Edit Post"
                disabled={selectedFile && !fotoUrl ? true : false}
                mode={1}
                link=""
                onClick={() => navigate("/postForm")}
              />
            )}
            <div className="flex flex-col gap-3 w-full justify-center items-center">
              <BtnMain
                text="Delete Post"
                disabled={selectedFile && !fotoUrl ? true : false}
                mode={0}
                link=""
                onClick={() => {
                  deletePost(post!.id);
                  navigate("/Profile");
                }}
              />
              {activePost && post && post.id === activePost.id && (
                <BtnMain
                  text="Close Post"
                  disabled={selectedFile && !fotoUrl ? true : false}
                  mode={0}
                  link=""
                  onClick={() => {
                    closeActivePost();
                    navigate("/Profile");
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <BtnMain
        text="GO TO THE CHAT"
        disabled={false}
        mode={0}
        link=""
        onClick={handleChatClick}
      />
    </main>
  );
}
