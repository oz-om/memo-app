import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Line, Method, FormBtn, isValid } from "../components/form";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
const { VITE_API_KEY } = process.env;

export default function Signin() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);
  const [registerState, setRegisterState] = useState({ register: true });
  const [signSpin, setSignSpin] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (userReducer.userState) {
      navigate("/");
    }
  }, [userReducer.userState]);

  let [inputsHealth] = useState({
    username: false,
    email: false,
    password: false,
  });
  function handelInputs(target) {
    let registerBtn = document.querySelector("form #register");
    isValid(inputsHealth, target, target.name, target.value, registerBtn);
    setInputs((inputs) => ({ ...inputs, [target.name]: target.value }));
  }

  async function register(e) {
    setSignSpin(true);
    e.preventDefault();
    const options = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const req = await axios.post(`${VITE_API_KEY}/register`, inputs, options);
    const res = await req.data;
    if (res.register) {
      setSignSpin(false);
      navigate("/log-in");
    } else {
      setSignSpin(false);
      setRegisterState(res);
    }
  }

  return (
    <main className='pt-20 h-[calc(100vh_-_52px)] overflow-auto customScroll'>
      {!userReducer.userState && userReducer.loading ? (
        <Loading />
      ) : (
        <div className='container md:w-[calc(100%_-_180px)] md:left-40 md:relative md:ml-0'>
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
              <Input fieldName='username' type='text' placeholder='username' name='username' method={(e) => handelInputs(e.target)} />
              <Input fieldName='email' type='email' placeholder='examle@mail.com' name='email' method={(e) => handelInputs(e.target)} />
              <Input fieldName='password' type='password' placeholder='password' name='password' method={(e) => handelInputs(e.target)} />
              <FormBtn name='register' loading={signSpin} />
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
      )}
    </main>
  );
}
