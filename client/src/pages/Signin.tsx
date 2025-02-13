import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewUser } from "../types/userTypes";
import { userStore } from "../zustand/userStore";
import { appStore } from "../zustand/appStore";
import BtnMain from "../components/buttons/BtnMain";
import { uploadFile } from "../assets/firebase/firebase";

const initialUser: NewUser = {
  name: "",
  userName: "",
  email: "",
  password: "",
  city: "",
  profilePicture: null,
};

export default function Signin() {
  const { signIn, message } = userStore();
  const { setAuth } = appStore();
  const navigate = useNavigate();
  const fileInputRef = useRef <HTMLInputElement>(null!);

  const [user, setUser] = useState<NewUser>(initialUser);
  const [selectedFile, setselectedFile] = useState<null | File>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setUser((prev: NewUser) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; 
    const file = e.target.files[0];
    setselectedFile(file);
  };

  function handelSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    signIn(user);
    navigate("/profile");
    setAuth();
  }

  useEffect(() => {
    if (selectedFile) {
      
      const upload = async () => {
        try {
          const url = await uploadFile(selectedFile, "/Profile_pics/");
          if (typeof url !== "string") {
            throw new Error();
          }
          setUser((prevForm) => ({
            ...prevForm,
            profilePicture: url, 
          }));
          setIsUploaded(true);
        } catch (e) {
          setselectedFile(null);
          console.log(e);
        }
      };
  
      upload(); 
    }
  }, [selectedFile])

  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl">CREATE AN ACCOUNT :</h3>

      <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
        <section className=" flex flex-col justify-center items-start gap-2 p-5">
          <input
            placeholder="...username*"
            className="w-[100%]"
            type="text"
            name="userName"
            required
            onChange={handleChange}
            value={user.userName}
          />
          <input
            placeholder="...name* "
            className="w-[100%]"
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={user.name}
          />
          <input
            placeholder="...email*"
            className="w-[100%]"
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={user.email}
          />
          <input
            placeholder="...password*"
            className="w-[100%]"
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={user.password}
          />

          <select
            className="w-[100%] text-gray-500"
            name="city"
            required
            onChange={handleChange}
            value={user.city}
          >
            <option className=" text-gray-500">-- Select a City --</option>
            <option value="Berlin" className=" text-gray-500">
              Berlin
            </option>
            <option value="London" className=" text-gray-500">
              London
            </option>
            <option value="Madrid" className=" text-gray-500">
              Madrid
            </option>
            <option value="Paris" className=" text-gray-500">
              Paris
            </option>
          </select>
        </section>

        <div className=" flex flex-col justify-center items-center w-[100%] my-6">
          <input
            style={{ display: "none" }}
            ref={fileInputRef}
            type="file"
            onInput={handleFile}
          />
          <BtnMain
            text="Upload a Picture"
            mode={0}
            link=""
            onClick={() => fileInputRef.current.click()}
            disabled={false}
          />

          <span className="text-xs font-bold ">
          {selectedFile ? `${selectedFile.name}` : !isUploaded? "No file chosen" : ""}
          </span>
        </div>

        <div className=" flex flex-col justify-center items-center w-[100%] my-3">
          <BtnMain text="Submit" mode={1} link="" onClick={handelSubmit} 
          disabled={selectedFile && !isUploaded? true:false} 
          />
        </div>
      </form>
      <span  className=" ">
        {message}
      </span>
    </main>
  );
}
