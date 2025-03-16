import { appStore } from "../zustand/appStore";

export default function Chat() {
const {currentChat} = appStore()


  return (
    <main className="flex flex-col justify-end w-[100%] space-y-4 ">
        Chat :
        <br/>
        {currentChat?.notOwnerId}
        <br/>
        {currentChat?.ownerId}
        <br/>
        {currentChat?.postId}
    </main>
  );
}
