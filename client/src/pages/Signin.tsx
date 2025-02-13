import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewUser } from "../types/userTypes";
import { userStore } from "../zustand/userStore";
import { appStore } from "../zustand/appStore";
import { uploadFile } from "../assets/firebase/firebase";
import BtnMain from "../components/buttons/BtnMain";
import Error from "../components/Error";
import { useForm } from "react-hook-form";

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
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const [user, setUser] = useState<NewUser>(initialUser);
  const [selectedFile, setselectedFile] = useState<null | File>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUser>();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setselectedFile(file);
  };

  function createProfile(user: NewUser) {
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
            throw "No pic uploaded";
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
  }, [selectedFile]);

  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl">CREATE AN ACCOUNT :</h3>

      <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
        <section className=" flex flex-col justify-center items-start gap-7 p-5 ">
          <div className="relative w-full">
            <input
              placeholder="...username*"
              className="w-[100%]"
              type="text"
              {...register("userName", {
                required: "User Name is required",
                maxLength: { value: 15, message: "Maximal 15 characters" },
              })}
            />
            {errors.userName && <Error> {errors.userName?.message} </Error>}
          </div>

          <div className="relative w-full">
            <input
              placeholder="...name* "
              className="w-[100%]"
              type="text"
              {...register("name", {
                required: "Name is required",
                maxLength: { value: 25, message: "Maximal 25 characters" },
              })}
            />
            {errors.name && <Error> {errors.name?.message} </Error>}
          </div>

          <div className="relative w-full">
            <input
              placeholder="...email*"
              className="w-[100%]"
              type="email"
              {...register("email", {
                required: "El Email es Obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email is required",
                },
              })}
            />
            {errors.email && <Error> {errors.email?.message} </Error>}
          </div>

          <div className="relative w-full">
            <input
              placeholder="...password*"
              className="w-[100%]"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && <Error> {errors.password?.message} </Error>}
          </div>

          <div className="relative w-full">
            <select
              className="w-[100%] text-gray-500"
              {...register("city", {
                required: "City is required",
                value:"",
              })}
            >
              <option value="" className=" text-gray-500" disabled>
                -- Select a City --
              </option>
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
            {errors.city && <Error> {errors.city?.message} </Error>}
          </div>
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
            {selectedFile
              ? `${selectedFile.name}`
              : !isUploaded
              ? "No file chosen"
              : ""}
          </span>
        </div>

        <div className=" flex flex-col justify-center items-center w-[100%] my-3">
          <BtnMain
            text="Submit"
            mode={1}
            link=""
            onClick={handleSubmit(createProfile)}
            disabled={selectedFile && !isUploaded ? true : false}
          />
        </div>
      </form>
      <span className=" ">{message}</span>
    </main>
  );
}
