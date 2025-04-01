type BtnSmallProps = {
  onClick: () => void;
  text: string;
  active: boolean;
};

export default function BtnSmall({ onClick, text, active }: BtnSmallProps) {
  return (
    <button
      onClick={onClick}
      className={`m-2 py-1 bg-black rounded-full w-[80px] text-xs ${
        active ? "text-amber-300" : "text-white"
      }`}
    >
      {text}
    </button>
  );
}
