import { NavLink } from "react-router-dom";

type NavBarElementProps = {
  text: string;
  link: string;
};

export default function NavBarElement({ text, link }: NavBarElementProps) {
  return (
    <div className=" px-5 py-2 flex justify-center items-center bg-gray-200 rounded-full">
      <NavLink
        className=" text-m   text-black   "
        to={link}
      >
        {text}
      </NavLink>
    </div>
  );
}
