import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { NewPostType } from "../types/postTypes";
import { categories } from "../data/listUtilities";
import BtnMain from "../components/buttons/BtnMain";
import FotoUploader from "../components/buttons/FotoUploader";
import { appStore } from "../zustand/appStore";
import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/userStore";
import { mapStore } from "../zustand/mapStore";
import PostComponent from "../components/PostComponent";

export default function NewPost() {
  const { fotoUrl, selectedFile, setFotoUrl, setSelectedFile, error } =
    appStore();
  const { activePost, createActivePost, user, deleteActivePost } = userStore();
  const { coordinates } = mapStore();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
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

  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      {activePost ? (
        <div className="w-[80%] flex flex-col gap-10 justify-center">
          <h1 className="text-2xl text-center">You have an active post: </h1>
          <PostComponent></PostComponent>
          <div className=" flex flex-col justify-center items-center w-[100%] my-3">
            <BtnMain
              text="Edit Post"
              disabled={selectedFile && !fotoUrl ? true : false}
              mode={1}
              link=""
              onClick={() => {}}
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
      ) : (
        <div>
          <h3 className="text-2xl text-center">New Post :</h3>
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

            <FotoUploader />

            <div className=" flex flex-col justify-center items-center w-[100%] my-3">
              <BtnMain
                text="Post it!"
                disabled={selectedFile && !fotoUrl ? true : false}
                mode={1}
                link=""
                onClick={handleSubmit(createPost)}
              />
              <span className="text-red-600 text-sm uppercase ">{error}</span>
            </div>
          </form>{" "}
        </div>
      )}
    </main>
  );
}
