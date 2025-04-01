
import { NavLink } from "react-router-dom";
type BtnMainProps = {
  text: string;
  mode: number;
  link: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean
};

export default function BtnMain({ text, mode, link, onClick,disabled }: BtnMainProps) {
  const btnStyle =
    mode === 0
      ? "w-[80%] max-w-[330px] rounded-full uppercase text-2xl  text-white bg-black h-12 ":
      mode ===1?
       "w-[80%] max-w-[330px] rounded-full uppercase text-2xl  text-black bg-white h-16 mb-5":
       mode === 2?
       " p-2 rounded-full uppercase text-xs  text-white bg-black":
       mode === 3?
       "p-2 rounded-full uppercase text-xs  text-black bg-white":
       null

  return (
    <button
      className={`${btnStyle} ${
        disabled ? "text-zinc-500 cursor-not-allowed" : null
      } `}
      onClick={onClick} disabled={disabled}
    >
      <NavLink to={link}> {text} </NavLink>
    </button>
  );
}
