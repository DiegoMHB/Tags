import { useNavigate } from "react-router-dom";
import { appStore } from "../../zustand/appStore";

type NavBarElementProps = {
  text: string;
  link: string;
  url: string;
};

export default function NavBarElement({ text, link, url }: NavBarElementProps) {
  const { setMapRender, mapRender, setSelectedPost, authUserActivePost } = appStore();

  const navigate = useNavigate();

  function handleClick() {
    if ((url === "/" && mapRender) || (url === "/map" && mapRender)) {
      setMapRender();
      navigate(`${link}`);
    }
    if(text === "Post"){
        setSelectedPost(authUserActivePost!.id)
    }
    navigate(`${link}`);
  }

  return (
    <div className=" w-15 h-5 flex justify-center items-center bg-black rounded-full">
      <p
        className={`text-xs ${
          url == link ? "text-amber-300" : "text-white"
        }  `}
        onClick={handleClick}
      >
        {text}
      </p>
    </div>
  );
}
