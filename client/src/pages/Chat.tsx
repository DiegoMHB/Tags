import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";
import ChatComponent from "../components/ChatComponent";
import ChatListComponent from "../components/ChatListComponent";
import { chatStore } from "../zustand/chatStore";
import { postStore } from "../zustand/postStore";

export default function Chat() {

  const {  getChatsByPostId, getChatById ,currentChat} = chatStore();
  const { user } = userStore();
  const { userPostsList } = postStore();
  const { id } = useParams();
  const [ pageContent, setPageContent] = useState<string>("")


  useEffect(() => {
    if(id === user.id){
        // getAllChats(id);
        setPageContent("all")
    }
    //id is a post
    else if (checkIdType(id!, userPostsList)) {
        getChatsByPostId(id!);
        setPageContent("post")
    } else {
        //id is a chat
        getChatById(id!);
        setPageContent("chat")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col justify-start w-[100%] space-y-4 ">
      {pageContent =="all" && <ChatListComponent/>}
      {pageContent =="chat" && <ChatListComponent/>}
      {pageContent == "post" && <ChatComponent   chat={currentChat!}/>}
    </main>
  );
}

{/*owner={false}*/}