import BtnMain from "../components/buttons/BtnMain";

export default function Landing() {
  return (
    <div className="flex flex-col justify-center items-center w-screen space-y-4">
      <BtnMain text={"Check Around"} mode={1}></BtnMain>
      <BtnMain text={"Log In"} mode={0}></BtnMain>
      <BtnMain text={"Sign In"} mode={0}></BtnMain>
      
    </div>
  );
}
