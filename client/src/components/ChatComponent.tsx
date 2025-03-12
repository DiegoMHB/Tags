type ChatComponentProps = {
  chatId?: string;
};
export default function ChatComponent({ chatId }: ChatComponentProps) {
  return (
    <main className="flex flex-col justify-between items-center w-screen space-y-4 p-2  h-max-[800px]">
      <section className="w-full flex-grow overflow-y-auto scrollbar-hidden rounded-2xl bg-sky-200 p-5 flex flex-col-reverse">
        <div className="p-5 ">
          <p>afrag argarg arg</p>
          <p>arg arg arg arg </p>
          <p>arg arg arg </p>
          <p>
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde culpa
            iure, dolores eius eaque porro velit reiciendis laborum quia dicta
            temporibus veritatis quas eveniet suscipit ducimus laboriosam.
            Similique, iusto ea.
          </p>
          <p>arg arg a rg</p>
        </div>
      </section>
      <section className="w-full flex items-center gap-2 p-2">
        <input className="w-[70%] bg-gray-200 h-[40px] px-3 rounded-full outline-none" />
        <button className="w-[25%] bg-blue-500 text-white h-[40px] rounded-full">
          Send
        </button>
      </section>
    </main>
  );
}
