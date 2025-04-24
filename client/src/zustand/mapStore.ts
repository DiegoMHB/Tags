import { LatLngTuple } from "leaflet";
import { create } from "zustand";
import { appStore } from "./appStore";

export type MapStoreType ={
 coordinates : LatLngTuple,
 loading : boolean,
 getCoords : ()=> void
}

export const mapStore = create<MapStoreType>()((set) => ({

    coordinates : [0,0],
    loading : false,
    error : "",

    getCoords: ()=> {
        set({loading:true})
        console.log("getCoords")
        navigator.geolocation.getCurrentPosition( (position) => {
            const res = [position.coords.latitude, position.coords.longitude];
            // let [lat, long] = res;

            //creating a variaton in the coordinates --DEV-- 0.05 = 5km 
            // lat = lat + ((Math.random() < 0.5)? (0.05*(Math.random()) ): (- 0.05*(Math.random())))
            // long = long + ((Math.random() < 0.5)? (0.05*(Math.random()) ): (- 0.05*(Math.random())))
            
            set({coordinates: res as LatLngTuple , loading:false });
          },
          (error) => {
            console.error("No location found:", error);
            if(error) appStore.setState({error: error.message}) 
            
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          })

    }
    
}))