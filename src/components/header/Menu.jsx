import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserState } from "../../store/reducers";
import { logoutACtion } from "../../global";

function toggleMenu() {
  document.querySelector(".menu ul").classList.toggle("w-3/6");
  document.querySelector(".menu ul").classList.toggle("w-0");
}
function LiElement(props) {
  const { path, name, icon, style, method } = props;
  return (
    <li className={"px-4 py-2 flex items-center gap-x-2 " + style}>
      <i className={`iconoir-${icon} text-lg font-extrabold`}></i>
      <Link to={path} onClick={method}>
        {name}
      </Link>
    </li>
  );
}
export default function Menu() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const loggedIn = userReducer.userState;
  function logout() {
    logoutACtion().then((res) => {
      if (res.logout) {
        dispatch(updateUserState({ login: false, user: "" }));
      } else {
        console.log(res);
      }
    });
  }
  return (
    <div className='menu'>
      <i className='iconoir-add-keyframes text-3xl cursor-pointer' onClick={toggleMenu}></i>
      <ul className='absolute h-full transition-width w-0 top-0 left-0 bg-slate-700 space-y-3 text-white shadow-sm z-10 overflow-hidden md:border-2 md:w-36 md:bg-white md:text-black '>
        <li className='flex justify-end py-3 mb-2 text-indigo-300 md:hidden' onClick={toggleMenu}>
          <i className='iconoir-fast-arrow-left-box text-3xl cursor-pointer'></i>
        </li>
        {loggedIn ? (
          <>
            <div className='items-center cursor-pointer px-2 gap-x-2 hidden md:flex'>
              <div className='avatar w-8 h-8 rounded-full overflow-hidden'>
                <img src='https://avatars.dicebear.com/api/bottts/avatar.svg' alt='avatar' />
              </div>
              <span>{userReducer.user.username}</span>
            </div>
            <LiElement path='/' name='home' icon='home-simple' method={() => toggleMenu()} />
            <LiElement path='/profile' name='profile' icon='profile-circle' method={() => toggleMenu()} />
            <LiElement path='/setting' name='setting' icon='settings' method={() => toggleMenu()} />
          </>
        ) : (
          <>
            <LiElement path='/log-in' name='login' icon='log-in' method={() => toggleMenu()} />
            <LiElement path='/sign-in' name='register' icon='add-user' method={() => toggleMenu()} />
          </>
        )}
        <LiElement path='/about' name='about' icon='info-empty' method={() => toggleMenu()} />
        <LiElement path='/contact' name='contact' icon='antenna' method={() => toggleMenu()} />

        {loggedIn && <LiElement path='/' name='logout' icon='system-shut' method={() => logout()} style='absolute bottom-0 text-red-400' />}
      </ul>
    </div>
  );
}
