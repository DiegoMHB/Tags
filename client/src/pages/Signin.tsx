//

import { useState } from "react";
import BtnMain from "../components/buttons/BtnMain";
import { NewUser } from "../types/userTypes";
import { userStore } from "../zustand/userStore";
import { useNavigate } from "react-router-dom";
import { appStore } from "../zustand/appStore";

const initialUser: NewUser = {
  name: "",
  userName: "",
  email: "",
  password: "",
  city: "",
  profilePicture: null,
};

export default function Signin() {

  const {signIn} = userStore();
  const {setAuth} = appStore();
  const navigate = useNavigate();

  const [user, setUser] = useState<NewUser>(initialUser);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const data = e.target;
    setUser((prev: NewUser) => {
      return {
        ...prev,
        [data.name]: data.value,
      };
    });
  }

  function handelSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    signIn(user);
    navigate('/profile');
    setAuth()
  }

  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl">CREATE AN ACCOUNT :</h3>

      <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
        <section className=" flex flex-col justify-center items-start gap-2 p-5">
          <input
            placeholder="...username*"
            className="w-[100%]"
            type="text"
            name="userName"
            required
            onChange={handleChange}
            value={user.userName}
            />
          <input
            placeholder="...name* "
            className="w-[100%]"
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={user.name}
            />
          <input
            placeholder="...email*"
            className="w-[100%]"
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={user.email}
            />
          <input
            placeholder="...password*"
            className="w-[100%]"
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={user.password}
            />

          <select
            className="w-[100%] text-gray-500"
            name="city"
            required
            onChange={handleChange}
            value={user.city}
          >
            <option className=" text-gray-500">-- Select a City --</option>
            <option value="Berlin" className=" text-gray-500">
              Berlin
            </option>
            <option value="London" className=" text-gray-500">
              London
            </option>
            <option value="Madrid" className=" text-gray-500">
              Madrid
            </option>
            <option value="Paris" className=" text-gray-500">
              Paris
            </option>
          </select>
        </section>

        <div className=" flex flex-col justify-center items-center w-[100%] my-6">
          <input style={{ display: "none" }} type="file" name="" value="" />
          <BtnMain text="Upload a Picture" mode={0} link="" />

          <span id="fileName" className=" ">
            If error uploading
          </span>
        </div>

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
