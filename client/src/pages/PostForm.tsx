import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";
import { userStore } from "../zustand/userStore";
import { mapStore } from "../zustand/mapStore";
import BtnMain from "../components/buttons/BtnMain";
import FotoUploader from "../components/buttons/FotoUploader";
import { NewPostType } from "../types/postTypes";
import Error from "../components/Error";
import { categories } from "../data/listUtilities";

export default function PostForm() {
  const { fotoUrl, selectedFile, setFotoUrl, setSelectedFile, error, getPosts } = appStore();
  const { activePost, user, createActivePost, editActivePost,getAllUsersPosts } = userStore();
  const { coordinates } = mapStore();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewPostType>();

  const [edit, setEdit] = useState<null | NewPostType>(null);

  useEffect(() => {//if theres an activePost put the data in the form
    if (activePost) {
      setValue("category", activePost.category);
      setValue("duration", activePost.duration);
      setValue("description", activePost.description);
      setValue("title", activePost.title);
      setEdit(activePost); 
    }
  }, [activePost, setValue]); 

  async function registerPost(post: NewPostType) {
    if (!edit) {
      post = { ...post, picture: fotoUrl, userId: user.id, coordinates };
      await createActivePost(post);
      await getAllUsersPosts(user.id);
      if (error) return;
    } else { //create an object with changes, and use it to edit the post
      const changes: Partial<NewPostType> = {};
      for (const prop of Object.keys(edit) as Array<keyof Partial<NewPostType>>) {
        if (post[prop] !== edit[prop] && edit[prop]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          changes[prop] = post[prop] as any;
        }
      }
      editActivePost(changes);
      getPosts();
    }
    
    if (!error) {
      reset();
      setFotoUrl("");
      setSelectedFile(null);
      navigate("/map");
    }
  }

  return (
    <div className="flex flex-col items-center w-screen space-y-4 p-2">
      <h3 className="text-2xl text-center mt-4">New Post :</h3>
      <form className="w-[350px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
        <section className="flex flex-col justify-center items-start gap-5 p-5">
          <div className="relative w-full">
            <span className={errors.category ? "text-red-600 text-xs uppercase" : "text-xs uppercase"}>Category</span>
            {errors.category && <Error>{errors.category?.message}</Error>}
            <select
              className="w-full text-gray-500"
              {...register("category", { required: " is required" })}
              defaultValue=""
            >
              <option value="" className="text-gray-500" disabled>-- Select a Category --</option>
              {categories.map((cat) => (
                <option value={cat.value} key={cat.id} className="text-gray-500">
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full">
            <span className={errors.title ? "text-red-600 text-xs uppercase" : "text-xs uppercase"}>Title</span>
            {errors.title && <Error>{errors.title?.message}</Error>}
            <input
              placeholder="your tag*"
              className="w-full"
              type="text"
              {...register("title", {
                required: " is required",
                maxLength: { value: 15, message: ": Maximal 15 characters" },
              })}
            />
          </div>

          <div className="relative w-full">
            <span className={errors.duration ? "text-red-600 text-xs uppercase" : "text-xs uppercase"}>Duration</span>
            {edit && <span className="text-xs uppercase"> from now</span>}
            {errors.duration && <Error>{errors.duration?.message}</Error>}
            <input
              placeholder="minutes*"
              className="w-full"
              type="number"
              step={15}
              min={15}
              {...register("duration", { required: " is required" })}
            />
          </div>

          <div className="relative w-full h-20">
            <span className={errors.description ? "text-red-600 text-xs uppercase" : "text-xs uppercase"}>Description</span>
            {errors.description && <Error>{errors.description?.message}</Error>}
            <textarea
              placeholder="80 characters max"
              className="w-full resize-none"
              maxLength={80}
              {...register("description", { required: " is required" })}
            />
          </div>
        </section>

        {activePost?.picture && (
          <img src={activePost.picture} className="w-[40px] h-[40px] object-cover mx-auto" />
        )}
        <FotoUploader text={edit ? "Change Picture" : "Upload a Picture"} location="/Post_pics/" />

        <div className="flex flex-col justify-center items-center w-full my-3">
          <BtnMain
            text="Post it!"
            disabled={selectedFile && !fotoUrl ? true : false}
            mode={1}
            link=""
            onClick={handleSubmit(registerPost)}
          />
          <span className="text-red-600 text-sm uppercase">{error}</span>
        </div>
      </form>
    </div>
  );
}
