import {Link} from 'react-router-dom';

function toggleMenu(e) {
  document.querySelector('.menu ul').classList.toggle('hidden')
}
export default function Menu() {
  return (
    <div className="menu basis-1/4">
      <i className="iconoir-add-keyframes text-3xl cursor-pointer" onClick={toggleMenu}></i>
      <ul className="fixed h-full w-2/4 top-0 left-0 bg-slate-700 space-y-3 text-white hidden z-10">
        <li className="flex justify-end py-3 mb-2 text-indigo-300" onClick={toggleMenu}>
          <i className="iconoir-fast-arrow-left-box text-3xl cursor-pointer"></i>
        </li>
        <li className="px-4 py-2">
          <Link to="/">home</Link>
        </li>
        <li className="px-4 py-2">
          <Link to="/log-in">login</Link>
        </li>
        <li className="px-4 py-2">
          <Link to="/sing-in">register</Link>
        </li>
        <li className="px-4 py-2">
          <Link to="/about">about</Link>
        </li>
        <li className="px-4 py-2">
          <Link to="/contact">contact</Link>
        </li>
      </ul>
    </div>
  )
}