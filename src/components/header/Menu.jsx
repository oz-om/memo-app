import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function toggleMenu(e) {
  document.querySelector(".menu ul").classList.toggle("hidden");
}
function LiElement(props) {
  const { path, name } = props;
  return (
    <li className='px-4 py-2'>
      <Link to={path}>{name}</Link>
    </li>
  );
}
export default function Menu() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);
  const loggedIn = userReducer.userState;
  return (
    <div className='menu'>
      <i className='iconoir-add-keyframes text-3xl cursor-pointer' onClick={toggleMenu}></i>
      <ul className='fixed h-full w-72 top-0 left-0 bg-slate-700 space-y-3 text-white hidden z-10'>
        <li className='flex justify-end py-3 mb-2 text-indigo-300' onClick={toggleMenu}>
          <i className='iconoir-fast-arrow-left-box text-3xl cursor-pointer'></i>
        </li>
        {loggedIn ? (
          <>
            <LiElement path='/' name='home' />
            <LiElement path='/profile' name='profile' />
            <LiElement path='/setting' name='setting' />
          </>
        ) : (
          <>
            <LiElement path='/log-in' name='login' />
            <LiElement path='/sign-in' name='register' />
          </>
        )}
        <LiElement path='/about' name='about' />
        <LiElement path='/contact' name='contact' />
      </ul>
    </div>
  );
}
