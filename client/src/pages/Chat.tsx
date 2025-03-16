import { useEffect, useState } from "react";
import { appStore } from "../zustand/appStore";
import { useParams } from "react-router-dom";
import { checkIdType } from "../assets/helperFunctions/checkIdType";
import { userStore } from "../zustand/userStore";

export default function Chat() {
  const { currentChat } = appStore();
  const { userPostsList } = userStore();
  const { postId } = useParams();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    if (checkIdType(postId!, userPostsList)) {
      setIsOwner(true);
      console.log(postId, "es post",  )
    };
    console.log(postId, )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col justify-end w-[100%] space-y-4 ">
      {isOwner && (
        <div>
          <p>ChatList :</p>
        </div>
      )}
      {!isOwner && (
        <div>
          <p>Chat :</p>
          <br />
          {currentChat?.notOwnerId}
          <br />
          {currentChat?.ownerId}
          <br />
          {currentChat?.postId}
        </div>
      )}
    </main>
  );
}
