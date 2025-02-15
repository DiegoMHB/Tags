import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { newPostType, PostType } from "../types/postTypes";
import { categories } from "../data/listUtilities";
import { useEffect, useRef, useState } from "react";
import BtnMain from "../components/buttons/BtnMain";
import { uploadFile } from "../assets/firebase/firebase";
import { appStore } from "../zustand/appStore";

export default function NewPost() {

  const [selectedFile, setselectedFile] = useState<null | File>(null);
    const [url, setUrl] = useState("");
   const fileInputRef = useRef<HTMLInputElement>(null!);
   const { setError, error } = appStore();

   
   const {
       register,
       handleSubmit,
       formState: { errors },
    } = useForm<PostType>();
  
    async function createPost(post: newPostType) {
        post = { ...post };
    }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setselectedFile(file);
  };

    //uploads picture and handle errors
    useEffect(() => {
      if (selectedFile) {
        const upload = async () => {
          try {
            const urlPic = await uploadFile(selectedFile, "/Profile_pics/");
            if (!urlPic) {
              setError("Failed uploading");
              return;
            }
            setUrl(urlPic);
          } catch (e) {
            console.log(e);
            setError("Failed uploading");
          }
        };
  
        upload();
      }
    }, [selectedFile, setError]);


  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl">CREATE AN ACCOUNT :</h3>

      <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
        <section className=" flex flex-col justify-center items-start gap-7 p-5 ">
          <div className="relative w-full">
            <fieldset className=" flex justify-around items-center text-sm mb-2">
              <div className="flex gap-2 items-center">
                <label htmlFor="need">NEED: </label>
                <input {...register("need")} type="radio" value="NEED" />
              </div>
              <div className="flex gap-2 items-center">
                <label htmlFor="offer">OFFER: </label>
                <input {...register("need")} type="radio" value="OFFER" />
              </div>
            </fieldset>

            <select
              className="w-[100%] text-gray-500"
              {...register("category", {
                required: "category is required",
                value: "",
              })}
            >
              <option value="" className=" text-gray-500" disabled>
                -- Select a Category --
              </option>
              {categories.map((cat) => (
                <option
                  value={cat.value}
                  key={cat.id}
                  className=" text-gray-500"
                >
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && <Error> {errors.category?.message} </Error>}
          </div>

          <div className="relative w-full">
            <input
              placeholder="...title*"
              className="w-[100%]"
              type="text"
              {...register("title", {
                required: "Title is required",
                maxLength: { value: 15, message: "Maximal 15 characters" },
              })}
            />
            {errors.title && <Error> {errors.title?.message} </Error>}
          </div>

          <div className="relative w-full h-30">
            <textarea
              placeholder="...description (max 50 characters)*"
              className="w-[100%] "
              {...register("description", {
                required: "Description is required",
                maxLength: { value: 50, message: "Maximal 50 characters" },
              })}
            />
            {errors.description && (
              <Error> {errors.description?.message} </Error>
            )}
          </div>

          <div className="relative w-full">
            <input
              placeholder="...duration*"
              className="w-[100%]"
              type="number"
              step={15}
              min={15}
              {...register("duration", {
                required: "Duration is required",
              })}
            />
            {errors.description && (
              <Error> {errors.description?.message} </Error>
            )}
          </div>
          <div className=" flex flex-col justify-center items-center w-[100%] my-3">
            <BtnMain
              text="Post it!"
              disabled={false}
              mode={1}
              link=""
              onClick={handleSubmit(createPost)}
            />
            <span className="text-red-600 text-sm uppercase ">{}</span>
          </div>
        </section>
      </form>
    </main>
  );
}
