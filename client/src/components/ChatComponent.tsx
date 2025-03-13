type ChatComponentProps = {
  chatId?: string;
};
export default function ChatComponent({ chatId }: ChatComponentProps) {
  return (
    <main className="flex flex-col justify-end items-center  w-[100%] space-y-4 p-2  h-max-[800px]">
      <section className="w-full flex-1 overflow-y-auto scrollbar-hidden rounded-2xl bg-sky-200 p-5 flex flex-col-reverse">
        <div className="p-5 flex flex-col-reverse h-[100%]">
       
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
