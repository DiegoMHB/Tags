import BtnMain from "../components/buttons/BtnMain";

export default function Login() {


  return     (
  <main className="flex flex-col justify-center items-center w-screen space-y-4 ">
        <h3 className="text-2xl">LOGIN :</h3>
  
        <form className=" w-[300px] bg-gradient-to-t from-[#FFFFFF]/20 to-[#FFFFFF]/30 border-gray-500 rounded-3xl">
          <section className=" flex flex-col justify-center items-start gap-2 p-5">
            <input
              placeholder="...mail*"
              className="w-[100%]"
              type="text"
              name="mail"
              required
              value=""
              />
            <input
              placeholder="...password* "
              className="w-[100%]"
              type="password"
              name="password"
              required
              value=""
              />
    
          </section>
  
          <div className=" flex flex-col justify-center items-center w-[100%] my-3">
            <BtnMain text="Submit" mode={1} link=""  />
          </div>

        </form>
        <span id="fileName" className=" ">
          If error uploading
        </span>
      </main>
    );
}
