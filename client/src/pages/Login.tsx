import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../types/appTypes";
import { userStore } from "../zustand/userStore";
import { appStore } from "../zustand/appStore";
import BtnMain from "../components/buttons/BtnMain";

export default function Login() {
  const { logIn, error, auth, getUserPosts } = userStore();
  const { getAllPosts } = appStore();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handelSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    await logIn(loginForm);
  }

  //execute login -> useEffect to show error or navigate to map if auth=true
  useEffect(() => {
    if (!auth) {
      return;
    } else {
      getAllPosts();
      getUserPosts();

      navigate("/map");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl">LOGIN :</h3>

      <form className=" w-[350px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
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
          <BtnMain
            text="Submit"
            mode={1}
            link=""
            onClick={handelSubmit}
            disabled={false}
          />
          <span
            id="fileName"
            className="text-red-600 text-xs uppercase text-center "
          >
            {error}
          </span>
        </div>
      </form>
    </main>
  );
}
