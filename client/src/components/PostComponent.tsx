import { PostType } from "../types/postTypes";

type PostComponentProps = {
  activePost: PostType;
};
export default function PostComponent({ activePost }: PostComponentProps) {
  return (
    <div>
      <section className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl p-5">
        <div className=" flex flex-col w-full gap-5">
          <div>
            <div className="flex flex-row items-center gap-3">
              <h3 className="text-xl font-bold">#{activePost?.title}</h3>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">Category:</p>
              <p className="text-xs">{activePost!.category}</p>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">Description:</p>
              <p className="text-xs">{activePost!.description}</p>
            </div>
            <div className="flex justify-between items-baseline ">
              <p className="text-xs">duration:</p>
              <p className="text-xs">{activePost?.duration}</p>
            </div>
          </div>
          {activePost?.picture && (
            <img
              className="w-[100%]  object-cover self-center"
              src={activePost?.picture ? activePost.picture : ""}
              alt={"photo"}
            />
          )}
        </div>
      </section>
    </div>
  );
}
