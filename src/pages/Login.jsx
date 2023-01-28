import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Method, Line, Input, FormBtn, isValid } from "../components/form";
import Footer from "../components/Footer";
import { updateUserState } from "../store/reducers";
import axios from "axios";
const { VITE_API_KEY } = process.env;

export default function Login() {
  // @ts-ignore
  const { userReducer } = useSelector((state) => state);
  const [userState, setUserState] = useState({ login: true });
  const [loginSpin, setLoginSpin] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loginBtn, setLoginBtn] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userReducer.userState) {
      navigate("/");
    }
    //@ts-ignore
    setLoginBtn(document.querySelector("form #Login"));
  }, [userReducer.userState]);

  let [inputsHealth] = useState({
    email: false,
    password: false,
  });
  function handelInput(target) {
    isValid(inputsHealth, target, target.name, target.value, loginBtn);
    setInputs((inputs) => ({ ...inputs, [target.name]: target.value }));
  }
  async function login() {
    setLoginSpin(true);
    const options = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/login`, inputs, options);
    const user = await req.data;

    if (user.login) {
      setLoginSpin(false);
      dispatch(updateUserState(user));
    } else {
      setLoginSpin(false);
      setUserState(user);
    }
  }

  const boxStyle = "border border-blue-300 rounded-xl relative pb-3 pt-7 w-80 mx-auto";
  const boxTitleStyle = "absolute tracking-[-1px] bg-white p-2 -top-6 left-1 border-blue-300 border rounded-xl text-sm text-gray-700";

  return (
    <main className='h-[calc(100vh_-_52px)] overflow-auto customScroll'>
      <div className='container'>
        <h2 className='text-center text-2xl font-bold px-5 mt-14 mb-8'>Get the best Memorization experience, for free!</h2>
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
              fieldName='email'
              type='text'
              placeholder='userId or email'
              name='email'
              method={(e) => {
                handelInput(e.target);
              }}
            />
            <Input
              fieldName='password'
              type='password'
              placeholder='password'
              name='password'
              method={(e) => {
                handelInput(e.target);
              }}
            />
            <div className='flex justify-between'>
              <div className='flex my-4'>
                <input type='checkBox' id='rememberMe' className='block mr-2' />
                <label htmlFor='rememberMe'>remember me!</label>
              </div>
              <Link className='text-blue-500 flex items-center' to='rest-pass'>
                forget password?
              </Link>
            </div>
            <FormBtn name='Login' addStyle='w-full' loading={loginSpin} />
          </form>
        </div>
        <p className='px-5 my-2 text-center'>
          you don't have an account!{" "}
          <Link className='text-blue-500' to='/sign-in'>
            create one?
          </Link>
        </p>
        <Footer />
      </div>
    </main>
  );
}
