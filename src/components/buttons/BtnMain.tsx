type BtnMainProps = {
  text: string;
  mode: number
};



export default function BtnMain({ text,mode }: BtnMainProps) {

    const btnStyle = mode===0 ?
     " text-white bg-black h-12 ":
     " text-black bg-white h-16 mb-5"

    return (
    <button 
    className={`w-[80%] max-w-[330px] rounded-full uppercase text-2xl ${btnStyle}`}>
      {text}
    </button>
  );
}
