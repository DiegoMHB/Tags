import BtnMain from "../components/buttons/BtnMain";

export default function Landing() {
  return (
    <div className="flex flex-col justify-center items-center w-screen space-y-4">
      <BtnMain text={"Check Around"} mode={1} link="/map"></BtnMain>
      <BtnMain text={"Log In"} mode={0} link="/login"></BtnMain>
      <BtnMain text={"Sign In"} mode={0} link="/signin"></BtnMain>
      
    </div>
  );
}
