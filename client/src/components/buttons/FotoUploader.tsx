import { useEffect, useRef } from "react";
import { appStore } from "../../zustand/appStore";
import { uploadFile } from "../../assets/firebase/firebase";
import BtnMain from "./BtnMain";

type fotoUploaderProps = {
    text:string,
    location:string
}

export default function FotoUploader({text, location}: fotoUploaderProps) {

  const {fotoUrl,setFotoUrl,selectedFile,setSelectedFile,setError, error } = appStore()
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setSelectedFile(file);
  };

    //uploads picture and handle errors
    useEffect(() => {
      if (selectedFile) {
        const upload = async () => {
          try {
            const urlPic = await uploadFile(selectedFile, location);
            if (!urlPic) {
              setError("Failed uploading");
              return;
            }
            setFotoUrl(urlPic);
          } catch (e) {
            console.log(e);
            setError("Failed uploading");
          }
        };
        upload();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile]);

  return (
    <div className=" flex flex-col justify-center items-center w-[100%] my-6">
      <input
        style={{ display: "none" }}
        ref={fileInputRef}
        type="file"
        onInput={handleFile}
      />
      <BtnMain
        text={text}
        mode={0}
        link=""
        onClick={() => fileInputRef.current.click()}
        disabled={false}
      />

      <span className="text-xs uppercase">
        {!selectedFile
          ? ""
          : selectedFile && error === "Failed uploading"
          ? error
          : selectedFile.name}
      </span>
      <span className="text-xs uppercase text-green-800">
        {fotoUrl ? "Succeded!" : null}
      </span>
    </div>
  );
}
