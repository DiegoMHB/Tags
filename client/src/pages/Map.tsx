import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { mapStore } from "../zustand/mapStore";
import { appStore } from "../zustand/appStore";
import { mapUtilities } from "../data/mapUtilities";
import PostMarker from "../components/PostMarker";
import SearchBar from "../components/SearchBar";

export default function Map() {
  const { coordinates, getCoords } = mapStore();
  const { allActivePosts, authUserActivePost, resetSelected } = appStore();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getCoords();
    resetSelected();
  }, []);

  // Filtering post by category
  const filteredPosts = allActivePosts?.filter((post) => 
    (!selectedCategory || post.category === selectedCategory) && post.id !== authUserActivePost?.id
  );

  return (
    <main className="w-screen relative">

      <SearchBar setSelectedCategory={setSelectedCategory} />

      <MapContainer center={coordinates as LatLngTuple} zoom={15} id="map" zoomControl={false}>
        <TileLayer url={mapUtilities.url} attribution={mapUtilities.attribution} id="map" />
        
        {!authUserActivePost ? ( //my post or the pin (if cat selected also filtering)
          <Marker position={coordinates as LatLngTuple}></Marker>
        ) : ( authUserActivePost.category === selectedCategory && 
          <PostMarker post={authUserActivePost} key={authUserActivePost.id} isUsers={true} />
        )}

        {filteredPosts?.map((post) => (
          <PostMarker post={post} key={post.id} isUsers={false} />
        ))}
      </MapContainer>
    </main>
  );
}
