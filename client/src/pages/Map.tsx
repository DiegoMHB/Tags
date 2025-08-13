import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { mapStore } from "../zustand/mapStore";
import { appStore } from "../zustand/appStore";
import { mapUtilities } from "../data/mapUtilities";
import PostMarker from "../components/PostMarker";
import SearchBar from "../components/SearchBar";
import LocationMarker from "../components/LocationMarker";

export default function Map() {
  const { coordinates, getCoords } = mapStore();
  const { allActivePosts, authUserActivePost, resetSelected, getAllPosts } =
    appStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getCoords();
    resetSelected();
    //TODO: create in appStore a property that reflects that there was a change to call getAllPosts
    getAllPosts();
  }, []);

  // Filtering post by category
  const filteredPosts = allActivePosts?.filter(
    (post) =>
      (!selectedCategory || post.category === selectedCategory) &&
      post.id !== authUserActivePost?.id
  );

  return (
    <main className="w-screen relative">
      <SearchBar setSelectedCategory={setSelectedCategory} />

      <MapContainer
        center={coordinates as LatLngTuple}
        zoom={15}
        id="map"
        zoomControl={false}
      >
        <TileLayer
          url={mapUtilities.url}
          attribution={mapUtilities.attribution}
          id="map"
        />

        {authUserActivePost ? (
          (!selectedCategory ||
            authUserActivePost.category === selectedCategory) && (
            <PostMarker
              post={authUserActivePost}
              key={authUserActivePost.id}
              isUsers={true}
            />
          )
        ) : (
          <LocationMarker location={coordinates} />
        )}

        {filteredPosts?.map((post) => (
          <PostMarker post={post} key={post.id} isUsers={false} />
        ))}
      </MapContainer>
    </main>
  );
}
//todo button to post
//skeleton
