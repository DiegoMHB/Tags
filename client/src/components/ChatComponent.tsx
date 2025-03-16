import { useEffect, useState } from "react";
import { ChatType } from "../types/appTypes";

type ChatComponentProps = {
  open: boolean;
  chat: ChatType;
};
export default function ChatComponent({ open, chat }: ChatComponentProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(
    () => setIsOpen(open),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <main className="flex flex-col justify-end items-center  w-[100%] space-y-4 p-2  h-max-[800px]">
      {isOpen &&
        <div>
          <p>Chat :</p>
          <br />
          {chat?.notOwnerId}
          <br />
          {chat?.ownerId}
          <br />
          {chat?.postId}
        </div>
      }
    </main>
  );
}
