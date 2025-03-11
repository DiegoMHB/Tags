import { useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import BtnMain from "../components/buttons/BtnMain";
import PostComponent from "../components/PostComponent";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { mapUtilities } from "../data/mapUtilities";
import { useEffect } from "react";

export default function Post() {
  const { fotoUrl, selectedFile } = appStore();

  const {
    activePost,
    deleteActivePost,
    closeActivePost,
  } = userStore();

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!activePost) {
      navigate('/profile')
    }
  }, [activePost, navigate]);

  //TODO: component for the map with props and attributes
  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl text-center m-3">You have an active post:</h3>
      <div className=" flex flex-col items-center w-[350px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl p-2 gap-2">
       { activePost && <div><PostComponent post={activePost!}></PostComponent>

        <MapContainer
          center={activePost!.coordinates as LatLngTuple}
          zoom={15}
          id="mapPost"
          zoomControl={false}
        >
          <TileLayer
            url={mapUtilities.url}
            attribution={mapUtilities.attribution}
            id="map"
          />
          <Marker position={activePost!.coordinates as LatLngTuple}></Marker>
        </MapContainer>
        </div>}

        <div className="flex flex-col justify-between items-center w-[100%] pb-5 mt-5">
          <BtnMain
            text="Edit Post"
            disabled={selectedFile && !fotoUrl ? true : false}
            mode={1}
            link=""
            onClick={() => navigate("/postForm")}
          />
          <div className="flex flex-col gap-3 w-full justify-center items-center">
            <BtnMain
              text="Delete Post"
              disabled={selectedFile && !fotoUrl ? true : false}
              mode={0}
              link=""
              onClick={() => {
                deleteActivePost();
                navigate("/Profile");
              }}
            />
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
          </div>
        </div>
      </div>
    </main>
  );
}
