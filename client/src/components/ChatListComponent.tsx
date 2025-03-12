import { useEffect } from "react"
import { appStore } from "../zustand/appStore"

type ChatListProps = {
    chatIds : string[]
}
export default function ChatListComponent({chatIds}:ChatListProps) {

    const [getChatById] = appStore()
    useEffect(()=>{
        for(let id of chatIds){
            const chat = getPostByChatId(id)
        }
    },[])
  return (
    <div>ChatListComponent</div>
  )
}
