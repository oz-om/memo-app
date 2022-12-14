import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Line, Method, FormBtn } from "../components/form";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setRegisterUsername, setRegisterEmail, setRegisterPassword } from "../store/reducers";
const { VITE_API_KEY } = process.env;

export default function Signin() {
  //@ts-ignore
  const { userReducer, registerReducer } = useSelector((state) => state);
  const [registerState, setRegisterState] = useState({ register: true });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userReducer.userState) {
      navigate("/");
    }
  }, [userReducer.userState]);
  async function register(e) {
    e.preventDefault();
    const options = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/register`, registerReducer, options);
    const res = await req.data;
    if (res.register) {
      navigate("/log-in");
    } else {
      setRegisterState(res);
    }
  }

  return (
    <main className='pt-20 h-[calc(100vh_-_52px)] overflow-auto'>
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
          {
            // @ts-ignore
            !registerState.register && (
              <p className='bg-red-100 text-red-500 py-1 mt-2 border border-red-500 rounded text-center w-80 mx-auto'>
                {
                  // @ts-ignore
                  registerState.msg
                }
              </p>
            )
          }
          <form className='grid place-content-center' onSubmit={(e) => register(e)}>
            <Input fieldName='username' type='text' placeholder='username' method={(e) => dispatch(setRegisterUsername(e.target.value))} />
            <Input fieldName='email' type='email' placeholder='examle@mail.com' method={(e) => dispatch(setRegisterEmail(e.target.value))} />
            <Input fieldName='password' type='password' placeholder='password' method={(e) => dispatch(setRegisterPassword(e.target.value))} />
            <FormBtn name='register' />
            <p>
              already have an account ?{" "}
              <Link to='/log-in' className='text-orange-500'>
                login!
              </Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
    </main>
  );
}
