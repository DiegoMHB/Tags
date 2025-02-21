import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import "leaflet/dist/leaflet.css";
import { mapStore } from "../zustand/mapStore";
import { divIcon, LatLngTuple } from "leaflet";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import PopUpPost from "../components/PopUpPost";

//TODO: show on the marker the time (color? wheel? minutes left?)
//TODO: create a marker component
//TODO: Pop-up with some info and link to the post. include name of the user and picture

export default function Map() {
  const { coordinates } = mapStore();
  const { posts, getUserFromPost } = appStore();
  const { activePost } = userStore();

  return (
    <>
      <main className="w-screen h-[100%]">
        <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map">
          <TileLayer
            url={mapUtilities.url}
            attribution={mapUtilities.attribution}
            id="map"
          />
          {!activePost ? (
            <Marker position={coordinates as LatLngTuple}>
              <Popup>You are here</Popup>
            </Marker>
          ) : (
            <Marker
              position={activePost.coordinates}
              icon={divIcon({
                className: "",
                html: `<div class="marker_container">
                   <div  class="post_marker_LED"></div>
                <h2 class="my_post_marker"> ${"# " + activePost.title} </h2>
                </div>`,
              })}
            >
              <Popup>You´re active post</Popup>
            </Marker>
          )}

          {posts.map((post) => (
            <Marker
              eventHandlers={{ click: () => getUserFromPost(post.userId) }}
              position={post.coordinates}
              key={post.id}
              icon={divIcon({
                className: "marker_icon",
                html: `<div class="marker_container">
                <div  class="post_marker_LED"></div>
             <h2 class="my_post_marker"> ${"# " + post.title} </h2>
             </div>`,
              })}
            >
              <Popup>
                <PopUpPost post={post}></PopUpPost>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
    </>
  );
}
