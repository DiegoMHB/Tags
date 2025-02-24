import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {  LatLngTuple } from "leaflet";
import { mapStore } from "../zustand/mapStore";
import { userStore } from "../zustand/userStore";
import { appStore } from "../zustand/appStore";
import { mapUtilities } from "../data/mapUtilities";
import PostMarker from "../components/PostMarker";

//TODO: show on the marker the time (color? wheel? minutes left?)


export default function Map() {
  const { coordinates } = mapStore();
  const { posts } = appStore();
  const { activePost } = userStore();

//   useEffect(()=>getPosts(),[getPosts])

  return (
    <>
      <main className="w-screen h-[100%]">
        <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map">
          <TileLayer
            url={mapUtilities.url}
            attribution={mapUtilities.attribution}
            id="map"
          />
          {!activePost && <Marker position={coordinates as LatLngTuple}></Marker> }

          {posts.map((post) => (
            <PostMarker post={post} />
          ))}
        </MapContainer>
      </main>
    </>
  );
}
