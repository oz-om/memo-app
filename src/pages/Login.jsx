
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Method, Line, Input, FormBtn} from "../components/form";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function isUser(){
    let req = await fetch('http://127.0.0.1:4011/isuser');
    let res = await req.json();
    console.log(res)
  }
  useEffect(()=>{
    console.log("get user state");
    isUser()
  }, []);
  
  function collectData(data, method) {
    method(data.target.value)
  }
  async function login(e){
    e.preventDefault();
    const data = {email,password};
    const options = {
      method:'POST',
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify(data)
    }
    const req = await fetch("http://127.0.0.1:4011/login", options);
    const res = await req.json();
    console.log(res)
  }
  
  const boxStyle = "border border-blue-300 rounded-xl relative pb-3 pt-7 w-80 mx-auto";
  const boxTitleStyle = "absolute tracking-[-1px] bg-white p-2 -top-6 left-1 border-blue-300 border rounded-xl text-sm text-gray-700";
  
  return (
    <main className="h-[calc(100vh_-_52px)] overflow-auto">
      <div className="container">
        <h2 className="text-center text-2xl font-bold px-5 mt-14 mb-8">Get the best Memorisation experience, for free!</h2>
        <div className={boxStyle}>
          <p className={boxTitleStyle} style={{wordSpacing:"-4px"}}>faster login using</p>
          <ul className="grid place-content-center gap-y-2">
            <Method name="google" theme="bg-red-500"/>
            <Method name="facebook" theme="bg-blue-500"/>
          </ul>
        </div>
        <Line />
        <div className={boxStyle + " mt-10 w-96"}>
          <p className={boxTitleStyle} style={{wordSpacing:"-4px"}}>using your account</p>
          <form className="px-5" onSubmit={e=>login(e)}>
            <Input type="text" fieldName="user/email" placeholder="userId or email" method={(e)=>{collectData(e,setEmail)}}/>
            <Input type="password" fieldName="password" placeholder="password" method={(e)=>{collectData(e,setPassword)}}/>
            <div className="flex justify-between">
              <div className="flex my-4">
                <input type="checkBox" id="remomberMe" className="block mr-2"/>
                <label htmlFor="remomberMe">remomber me!</label>
              </div>
              <Link className="text-blue-500 flex items-center" to="rest-pass">forget password?</Link>
            </div>
            <FormBtn name="Login" addStyle="w-full"/>
          </form>
        </div>
        <p className="px-5 my-2 text-center">you don't have an account! <Link className="text-blue-500" to="/sing-in">create one?</Link></p>
        <Footer />
      </div>
    </main>
  )
}