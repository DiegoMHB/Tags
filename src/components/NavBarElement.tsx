import { NavLink } from "react-router-dom";

type NavBarElementProps = {
  text: string;
  link: string;
};

export default function NavBarElement({ text, link }: NavBarElementProps) {
  return (
    <NavLink className="" to={link}>
      {text}
    </NavLink>
  );
}
