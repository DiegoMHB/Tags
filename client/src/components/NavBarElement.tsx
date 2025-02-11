import { useLocation, useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";

type NavBarElementProps = {
  text: string;
  link: string;
};

export default function NavBarElement({ text, link }: NavBarElementProps) {

    const {setMapRender ,mapRender} = appStore()

    const navigate = useNavigate();
    const url = useLocation().pathname;


    function handleClick () {
        if( url === "/"  && mapRender || url === "/map"  &&  mapRender) {
            setMapRender();
            navigate(`${link}`)
        }
        navigate(`${link}`)
        
    }


  return (
    <div className=" w-15 h-5 flex justify-center items-center bg-[#c6eef7] rounded-full">
      <p className=" text-xs text-black" onClick={handleClick}>
        {text}
      </p>
    </div>
  );
}
