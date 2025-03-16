import { appStore } from "../zustand/appStore"
import { userStore } from "../zustand/userStore"
import ChatComponent from "./ChatComponent"



export default function ChatListComponent() {

    const {allPostChats} = appStore()
    const {user} = userStore()
 
  return (
    <main className="flex flex-col justify-end items-center  w-[100%] space-y-4 p-2  h-max-[800px]">
        <p>Owner{user.userName}</p>
    {
        allPostChats?.map((chat)=>(
            <ChatComponent open={false} chat={chat} owner={true}/>
        ))
    }
  </main>
  )
}
