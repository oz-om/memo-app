import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function toggleMenu() {
  document.querySelector(".menu ul").classList.toggle("w-72");
  document.querySelector(".menu ul").classList.toggle("w-0");
}
function LiElement(props) {
  const { path, name, method } = props;
  return (
    <li className='px-4 py-2'>
      <Link to={path} onClick={method}>
        {name}
      </Link>
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
      <ul className='fixed h-full transition-width w-0 top-0 left-0 bg-slate-700 space-y-3 text-white z-10 overflow-hidden'>
        <li className='flex justify-end py-3 mb-2 text-indigo-300' onClick={toggleMenu}>
          <i className='iconoir-fast-arrow-left-box text-3xl cursor-pointer'></i>
        </li>
        {loggedIn ? (
          <>
            <LiElement path='/' name='home' method={() => toggleMenu()} />
            <LiElement path='/profile' name='profile' method={() => toggleMenu()} />
            <LiElement path='/setting' name='setting' method={() => toggleMenu()} />
          </>
        ) : (
          <>
            <LiElement path='/log-in' name='login' method={() => toggleMenu()} />
            <LiElement path='/sign-in' name='register' method={() => toggleMenu()} />
          </>
        )}
        <LiElement path='/about' name='about' method={() => toggleMenu()} />
        <LiElement path='/contact' name='contact' method={() => toggleMenu()} />
      </ul>
    </div>
  );
}
