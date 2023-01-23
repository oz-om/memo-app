import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserState } from "../../store/reducers";

function Options(props) {
  const { path, name, addStyle, method } = props;
  return (
    <li className={"px-3 " + addStyle} onClick={method}>
      <Link to={path}>{name}</Link>
    </li>
  );
}
export default function User() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  function optionsDropDown() {
    document.querySelector(".user .headLinks").classList.toggle("w-0");
    document.querySelector(".user .headLinks").classList.toggle("w-40");
  }
  async function logout() {
    const req = await axios.get("http://127.0.0.1:4011/logout", { withCredentials: true });
    const res = await req.data;
    if (res.logout) {
      dispatch(updateUserState({ login: false, user: "" }));
    } else {
      console.log(res);
    }
  }
  return (
    <div className='user relative'>
      <div className='flex items-center cursor-pointer' onClick={() => optionsDropDown()}>
        <div className='avatar w-8 h-8 rounded-full overflow-hidden'>
          <img src='https://avatars.dicebear.com/api/bottts/avatar.svg' alt='avatar' />
        </div>
        <span>
          <i className='iconoir-vertical-split text-sm'></i>
        </span>
      </div>
      <ul className='headLinks absolute backdrop-blur-md shadow-md rounded-md right-0 z-10 mt-2 overflow-hidden w-0 transition-width'>
        <li className='flex text-[12px] px-3 mb-1 py-1 border-b border-b-gray-300'>
          <span className='whitespace-nowrap'>Signed in as </span>
          <span className='font-semibold ml-1'>{userReducer.user.username}</span>
        </li>
        <Options path='/' name='home' method={() => optionsDropDown()} />
        <Options path='/' name='profile' method={() => optionsDropDown()} />
        <Options path='/' name='setting' method={() => optionsDropDown()} />
        <Options
          path='/'
          name='logout'
          addStyle='border-t border-t-gray-300 my-1 text-red-400'
          method={() => {
            optionsDropDown();
            logout();
          }}
        />
      </ul>
    </div>
  );
}
