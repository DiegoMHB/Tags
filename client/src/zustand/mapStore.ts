import { LatLngTuple } from "leaflet";
import { create } from "zustand";

export type MapStoreType ={
 coordinates : LatLngTuple,
 loading : boolean,
 error: string,
 getCoords : ()=> void
}

export const mapStore = create<MapStoreType>()((set) => ({

    coordinates : [0,0],
    loading : false,
    error : "",

    getCoords: ()=> {
        set({loading:true})
        navigator.geolocation.getCurrentPosition( (position) => {
            const res = [position.coords.latitude, position.coords.longitude];
            set({coordinates: res as LatLngTuple , loading:false });
          },
          (error) => {
            console.error("No location found:", error);
            if(error) set({error: error.message}) 
            
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          })

    }
    
}))