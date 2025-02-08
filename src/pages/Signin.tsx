import BtnMain from "../components/buttons/BtnMain";

export default function Signin() {
  return (
    <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
      <h3 className="text-2xl">CREATE AN ACCOUNT :</h3>
      <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
        <section className=" flex flex-col justify-center items-start gap-2 p-5">
          <input
            placeholder="...username*"
            className="w-[100%]"
            type="text"
            name="username"
            required
          />
          <input
            placeholder="...name* "
            className="w-[100%]"
            type="text"
            name="name"
            required
          />
          <input
            placeholder="...email*"
            className="w-[100%]"
            type="email"
            name="email"
            required
          />
          <input
            placeholder="...password*"
            className="w-[100%]"
            type="password"
            name="password"
            required
          />

          <select className="w-[100%] text-gray-500" name="city" required>
            <option value="" className=" text-gray-500">
              -- Select a City --
            </option>
            <option value="" className=" text-gray-500">
              Berlin
            </option>
            <option value="" className=" text-gray-500">
              London
            </option>
            <option value="" className=" text-gray-500">
              Madrid
            </option>
            <option value="" className=" text-gray-500">
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
          <BtnMain text="Submit" mode={1} link="" />
        </div>
      </form>
      <span id="fileName" className=" ">
        If error uploading
      </span>
    </main>
  );
}
