import {useState} from "react"
import {Link} from "react-router-dom";
import { Input, Line, Method, FormBtn } from "../components/form";
import Footer from "../components/Footer";

export default function Singin() {
  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [user, setUser] = useState({
    register:true
  });
  async function register(e) {
    e.preventDefault();
    const data = {username,email,password};
    const options = {
        method: "POST",
        mode: 'cors',
        headers: { 
          "Content-type": "application/json" 
        },
        body: JSON.stringify(data),
      };
    const req = await fetch("http://127.0.0.1:4011/register", options);
    const res = await req.json()
    setUser(res)
  }
  
  function collectData(data, method) {
    method(data.target.value)
  }

  return (
    <main className="pt-20 h-[calc(100vh_-_52px)] overflow-auto">
      <div className='container'>
        <div className='partOne grid place-content-center'>
          <h2 className='text-3xl font-black'>Register For Free</h2>
          <span className='font-black text-orange-300 text-center my-5'>with</span>
          <div className='auth-options'>
            <ul className='grid gap-y-2 place-content-center'>
              <Method name='google' theme='bg-red-500' />
              <Method name='facebook' theme='bg-blue-500' />
            </ul>
          </div>
        </div>
        <Line />
        <div className='parTow'>
          <h2 className='text-center'>create an account</h2>
          {!user.register && <p className="bg-red-100 text-red-500 py-1 mt-2 border border-red-500 rounded text-center w-80 mx-auto">{user.msg}</p>}
          <form className='grid place-content-center' onSubmit={(e)=>register(e)}>
            <Input fieldName='username' type='text' placeholder='username' method={(e)=>collectData(e,setUserName)}/>
            <Input fieldName='email' type='email' placeholder='examle@mail.com' method={(e)=>collectData(e,setEmail)}/>
            <Input fieldName='password' type='password' placeholder='password' method={(e)=>collectData(e,setPassword)} />
            <FormBtn name="register"/>
            <p>
              already have an account ? <Link to="/log-in" className="text-orange-500">login!</Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
    </main>
  );
}
