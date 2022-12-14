import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Method, Line, Input, FormBtn } from "../components/form";
import Footer from "../components/Footer";
import { setEmail, setPassword, updateUserState } from "../store/reducers";
import axios from "axios";
const { VITE_API_KEY } = process.env;

export default function Login() {
  // @ts-ignore
  const { userReducer, loginReducer } = useSelector((state) => state);
  const [userState, setUserState] = useState({ login: true });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userReducer.userState) {
      navigate("/");
    }
  }, [userReducer.userState]);
  async function login() {
    const options = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/login`, loginReducer, options);
    const user = await req.data;
    if (user.login) {
      dispatch(updateUserState(user));
    } else {
      setUserState(user);
    }
  }

  const boxStyle = "border border-blue-300 rounded-xl relative pb-3 pt-7 w-80 mx-auto";
  const boxTitleStyle = "absolute tracking-[-1px] bg-white p-2 -top-6 left-1 border-blue-300 border rounded-xl text-sm text-gray-700";

  return (
    <main className='h-[calc(100vh_-_52px)] overflow-auto'>
      <div className='container'>
        <h2 className='text-center text-2xl font-bold px-5 mt-14 mb-8'>Get the best Memorisation experience, for free!</h2>
        <div className={boxStyle}>
          <p className={boxTitleStyle} style={{ wordSpacing: "-4px" }}>
            faster login using
          </p>
          <ul className='grid place-content-center gap-y-2'>
            <Method name='google' theme='bg-red-500' />
            <Method name='facebook' theme='bg-blue-500' />
          </ul>
        </div>
        <Line />
        <div className={boxStyle + " mt-10 w-96"}>
          <p className={boxTitleStyle} style={{ wordSpacing: "-4px" }}>
            using your account
          </p>
          {
            // @ts-ignore
            !userState.login && (
              <p className='bg-red-100 text-red-500 py-1 mt-2 border border-red-500 rounded text-center w-80 mx-auto'>
                {
                  // @ts-ignore
                  userState.msg
                }
              </p>
            )
          }
          <form
            className='px-5'
            onSubmit={(event) => {
              event.preventDefault();
              login();
            }}
          >
            <Input
              type='text'
              fieldName='user/email'
              placeholder='userId or email'
              method={(e) => {
                dispatch(setEmail(e.target.value));
              }}
            />
            <Input
              type='password'
              fieldName='password'
              placeholder='password'
              method={(e) => {
                dispatch(setPassword(e.target.value));
              }}
            />
            <div className='flex justify-between'>
              <div className='flex my-4'>
                <input type='checkBox' id='remomberMe' className='block mr-2' />
                <label htmlFor='remomberMe'>remomber me!</label>
              </div>
              <Link className='text-blue-500 flex items-center' to='rest-pass'>
                forget password?
              </Link>
            </div>
            <FormBtn name='Login' addStyle='w-full' />
          </form>
        </div>
        <p className='px-5 my-2 text-center'>
          you don't have an account!{" "}
          <Link className='text-blue-500' to='/sing-in'>
            create one?
          </Link>
        </p>
        <Footer />
      </div>
    </main>
  );
}
