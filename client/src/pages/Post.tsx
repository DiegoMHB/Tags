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
import { PostType } from "../types/postTypes";
import { User } from "../types/userTypes";

export default function Post() {
  const { fotoUrl, selectedFile, posts, getUserFromId, selectedUser } =
    appStore();
  const { deletePost, closeActivePost, allUserPosts, activePost, user } =
    userStore();

  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType | null>(null);
  const [postUser, setPostUser] = useState<User | null>(null);

  useEffect(() => {
    const allPosts = [...posts, ...allUserPosts];
    const idPost = allPosts.filter((post) => post.id == id)[0];
    setPost(idPost);
  }, [posts, allUserPosts, id]);

  useEffect(() => {
    getUserFromId(id!); //in case not coming the Map
    setPostUser(selectedUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: component for the map with props and attributes
  //TODO: Profileheader of the user
  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      {/*POST HEADER*/}
      {activePost && post && post.id === activePost.id && (
        <h3 className="text-2xl text-center m-3">You have an active post:</h3>
      )}

      {post && post.userId == user.id && post.id !== activePost?.id && (
        <h3 className="text-2xl text-center m-3">Closed post:</h3>
      )}
      {postUser && post && post.userId !== user.id && (
        <h3 className="text-2xl text-center m-3">
          Active post from: {postUser.name}
        </h3>
      )}

      <div className=" flex flex-col items-center w-[350px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl p-2 gap-2">
        {post && (
          <div>
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
        
          <BtnMain
            text="GO TO THE CHAT"
            disabled={false}
            mode={0}
            link=""
            onClick={() => {
              navigate(`/chat/${id}`)
            }}
          />
        
      </div>
    </main>
  );
}
