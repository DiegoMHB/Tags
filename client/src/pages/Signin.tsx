import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewUser } from "../types/userTypes";
import { userStore } from "../zustand/userStore";
import { useForm } from "react-hook-form";
import BtnMain from "../components/buttons/BtnMain";
import Error from "../components/Error";
import { cities } from "../data/listUtilities";
import { appStore } from "../zustand/appStore";
import FotoUploader from "../components/buttons/FotoUploader";

export default function Signin() {
  const { signIn, error, auth } = userStore();
  const { fotoUrl, selectedFile,setFotoUrl,setSelectedFile  } = appStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewUser>();

  //creates profile->useEffect to show error or navigate to map if auth=true
  async function createProfile(user: NewUser) {
    user = { ...user, profilePicture: fotoUrl };
    
    await signIn(user);
  }

  useEffect(() => {
    if (!auth) {
      return;
    } else {
      reset();
      setFotoUrl('');
      setSelectedFile(null)  
      
      navigate("/map");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
                minLength: { value: 1, message: "Minimum 8 characters" },
              })}
            />
            {errors.password && <Error> {errors.password?.message} </Error>}
          </div>

          <div className="relative w-full">
            <select
              className="w-[100%] text-gray-500"
              {...register("city", {
                required: "City is required",
                value: "",
              })}
            >
              <option value="" className=" text-gray-500" disabled>
                -- Select a City --
              </option>
              {cities.map((city) => (
                <option
                  value={city.value}
                  key={city.id}
                  className=" text-gray-500"
                >
                  {city.label}
                </option>
              ))}
            </select>
            {errors.city && <Error> {errors.city?.message} </Error>}
          </div>
        </section>

        <FotoUploader text={"Upload a Picture"} />

        <div className=" flex flex-col justify-center items-center w-[100%] my-3">
          <BtnMain
            text="Submit"
            mode={1}
            link=""
            onClick={handleSubmit(createProfile)}
            disabled={selectedFile && !fotoUrl ? true : false}
          />
          <span className="text-red-600 text-sm uppercase ">
            {error}
          </span>
        </div>

      </form>
    </main>
  );
}
