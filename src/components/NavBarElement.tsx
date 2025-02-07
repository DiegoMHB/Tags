import { NavLink } from "react-router-dom";
import { appStore } from "../zustand/appStore";


type NavBarElementProps = {
    text: string;
    link: string;
};

export default function NavBarElement({ text, link }: NavBarElementProps) {

    const { auth } = appStore();
    
  return (

    <div
      className={` px-5 py-2 flex justify-center items-center bg-[#c6eef7] rounded-full 
        ${!auth ? "disabled-link opacity-80" : ""}
          `}
    >
      <NavLink className=" text-s text-black" to={link}>
        {text}
      </NavLink>
    </div>
  );
}
