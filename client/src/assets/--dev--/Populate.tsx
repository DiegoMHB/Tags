import { NewUser } from "../../types/userTypes.js";
import { userStore } from "../../zustand/userStore";

const users = [
    {
        name: "Diego Martin",
        userName: "catherine82",
        email: "dmhb1@gmail.com",
        password: "1234",
        city: "Berlin",
        profilePicture: '',
        post:""
    },
    {
        name: "Emily Martin",
        userName: "harrismelissa",
        email: "dmhb2@gmail.com",
        password: "1234",
        city: "Berlin",
        profilePicture: '',
        post:""
    },
    {
        name: "Scott Soto",
        userName: "moorejames",
        email: "dmhb3@gmail.com",
        password: "1234",
        city: "Berlin",
        profilePicture: '',
        post:""
    },
    {
        name: "Marvin Miller",
        userName: "garcialisa",
        email: "dmhb4@gmail.com",
        password: "1234",
        city: "Berlin",
        profilePicture: '',
        post:""
    },
    {
        name: "Samuel Pierce",
        userName: "tiffany98",
        email: "dmhb5@gmail.com",
        password: "1234",
        city: "Berlin",
        profilePicture: '',
        post:""
    },
];






export default function Populate() {
  const {  signIn } = userStore();

  const handleClick = () => {
    users.forEach((user: NewUser)=> {signIn(user)})
  };

  return (
    <div className="w-5 h-5 bg-black rounded-b-full text-white" onClick={handleClick}>
      Pop
    </div>
  );
}
