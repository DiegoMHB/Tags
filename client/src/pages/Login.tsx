import { useState } from "react";
import BtnMain from "../components/buttons/BtnMain";
import { LoginForm } from "../types/appTypes";
import { userStore } from "../zustand/userStore";

export default function Login() {

    const  {logIn} = userStore();

  const [loginForm, setLoginForm] = useState <LoginForm>({
    email: "",
    password: "",
  });

  function handleChange (e :React.ChangeEvent<HTMLInputElement>) {
    const {name,value} = e.target;
    setLoginForm((prev) => {
        return {
            ...prev,
            [name] : value
        }
    })
  }

  function handelSubmit (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    logIn(loginForm)
    

  }



  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl">LOGIN :</h3>

      <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
        <section className=" flex flex-col justify-center items-start gap-2 p-5">
          <input
            placeholder="...mail*"
            className="w-[100%]"
            type="email"
            name="email"
            required
            value={loginForm.email}
            onChange={handleChange}
            />
          <input
            placeholder="...password* "
            className="w-[100%]"
            type="password"
            name="password"
            required
            value={loginForm.password}
            onChange={handleChange}
          />
        </section>

        <div className=" flex flex-col justify-center items-center w-[100%] my-3">
          <BtnMain text="Submit" mode={1} link="" onClick={handelSubmit} />
        </div>
      </form>
      <span id="fileName" className=" ">
        If error uploading
      </span>
    </main>
  );
}
