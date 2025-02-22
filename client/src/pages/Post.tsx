import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { NewPostType, PostType } from "../types/postTypes";
import { categories } from "../data/listUtilities";
import BtnMain from "../components/buttons/BtnMain";
import FotoUploader from "../components/buttons/FotoUploader";
import { appStore } from "../zustand/appStore";
import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/userStore";
import { mapStore } from "../zustand/mapStore";
import PostComponent from "../components/PostComponent";
import { useEffect, useState } from "react";

export default function NewPost() {
  const { fotoUrl, selectedFile, setFotoUrl, setSelectedFile, error } =
    appStore();
  const { activePost, createActivePost, user, deleteActivePost } = userStore();
  const { coordinates } = mapStore();
  const [edit, setEdit] = useState<null | PostType>(null);
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewPostType>();

  async function createPost(post: NewPostType) {
    post = { ...post, picture: fotoUrl, userId: user.id, coordinates };
    await createActivePost(post);
    if (error) {
      return;
    }
    if (!error) {
      reset();
      setFotoUrl("");
      setSelectedFile(null);

      navigate("/map");
    }
  }

  useEffect(() => {
    if (edit) {
      setValue("category", edit!.category);
      setValue("duration", edit!.duration);
      setValue("need", edit!.need);
      setValue("description", edit!.description);
      setValue("title", edit!.title);
    }
  }, [edit, setValue]);

  function editPost() {}

  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      {activePost && !edit ? (
        <div>
          <h3 className="text-2xl text-center m-3">
            You have an active post:{" "}
          </h3>
          <div className="  w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
            <PostComponent activePost={activePost}></PostComponent>
            <div className="flex flex-col justify-between items-center w-[90%] pb-5">
              <BtnMain
                text="Edit Post"
                disabled={selectedFile && !fotoUrl ? true : false}
                mode={1}
                link=""
                onClick={() => setEdit(activePost)}
              />

              <BtnMain
                text="Delete Post"
                disabled={selectedFile && !fotoUrl ? true : false}
                mode={0}
                link=""
                onClick={() => {
                  deleteActivePost(activePost.id);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-2xl text-center mt-4">New Post :</h3>
          <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
            <section className=" flex flex-col justify-center items-start gap-7 p-5 ">
              <fieldset className=" flex justify-around items-center text-sm mb-2 relative w-full">
                <div className="flex gap-2 items-center">
                  <label htmlFor="need">NEED: </label>
                  <input {...register("need")} type="radio" value="NEED" />
                </div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="offer">OFFER: </label>
                  <input {...register("need")} type="radio" value="OFFER" />
                </div>
              </fieldset>

              <div className="relative w-full">
                <select
                  className="w-[100%] text-gray-500"
                  {...register("category", {
                    required: "category is required",
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
                {errors.duration && <Error> {errors.duration?.message} </Error>}
              </div>

              <div className="relative w-full h-20 ">
                <textarea
                  placeholder="...description (max 80 characters)"
                  className="w-[100%] resize-none"
                  maxLength={80}
                  {...register("description", {
                    required: "A description is required",
                  })}
                />
              </div>
            </section>

            {edit && <img src={edit.picture } className="w-[40px] h-[40px] object-cover mx-auto"/>}
            <FotoUploader text={edit? "Change Picture" : "Upload a Picture" } />

            <div className=" flex flex-col justify-center items-center w-[100%] my-3">
              {!edit ? (
                <BtnMain
                  text="Post it!"
                  disabled={selectedFile && !fotoUrl ? true : false}
                  mode={1}
                  link=""
                  onClick={handleSubmit(createPost)}
                />
              ) : (
                <BtnMain
                  text="Edit"
                  disabled={selectedFile && !fotoUrl ? true : false}
                  mode={1}
                  link=""
                  onClick={handleSubmit(editPost)}
                />
              )}
              <span className="text-red-600 text-sm uppercase ">{error}</span>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
