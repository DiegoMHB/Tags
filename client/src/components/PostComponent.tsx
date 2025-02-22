import { PostType } from "../types/postTypes";

type PostComponentProps = {
  activePost: PostType;
};
export default function PostComponent({ activePost }: PostComponentProps) {
  return (
        <section className=" flex flex-col gap-5 w-[80%] justify-center align-middle mx-auto py-5">
          <div>
            <div className="flex flex-row items-center gap-3">
              <h3 className="text-xl font-bold">#{activePost?.title}</h3>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">Category:</p>
              <p className="text-xs">{activePost!.category}</p>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">Duration:</p>
              <p className="text-xs">{activePost?.duration}</p>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">Description:</p>
              <p className="text-xs">{activePost!.description}</p>
            </div>
          </div>
          {activePost?.picture && (
            <img
              className="w-[100%]  object-cover self-center"
              src={activePost?.picture ? activePost.picture : ""}
              alt={"photo"}
            />
          )}
        </section>
  );
}
