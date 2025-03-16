import { appStore } from "../zustand/appStore"
import ChatComponent from "./ChatComponent"



export default function ChatListComponent() {

    const {allPostChats} = appStore()
 
  return (
    <main className="flex flex-col justify-end items-center  w-[100%] space-y-4 p-2  h-max-[800px]">
        <p>Owner</p>
    {
        allPostChats?.map((chat)=>(
            <ChatComponent open={false} chat={chat}/>
        ))
    }
  </main>
  )
}
