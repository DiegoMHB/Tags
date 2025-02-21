import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import "leaflet/dist/leaflet.css";
import { mapStore } from "../zustand/mapStore";
import {  LatLngTuple } from "leaflet";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import PostMarker from "../components/PostMarker";

//TODO: show on the marker the time (color? wheel? minutes left?)
//TODO: create a marker component
//TODO: Pop-up with some info and link to the post. include name of the user and picture

export default function Map() {
  const { coordinates } = mapStore();
  const { posts } = appStore();
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
            <Marker position={coordinates as LatLngTuple}></Marker>
          ) : (
            <PostMarker post={activePost} />
          )}

          {posts.map((post) => (
            <PostMarker post={post} />
          ))}
        </MapContainer>
      </main>
    </>
  );
}
