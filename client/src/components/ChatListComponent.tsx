import { userStore } from "../zustand/userStore"



export default function ChatListComponent() {

    const {user} = userStore()
 
  return (
    <main className="flex flex-col justify-start items-center  w-[100%] space-y-4 p-2  h-max-[800px]">
        <p>Owner{user.userName}</p>
    {
      
    }
  </main>
  )
}

