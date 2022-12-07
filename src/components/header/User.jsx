import { Link } from "react-router-dom";

function Options(props) {
  const { path, name, addStyle } = props;
  return (
    <li className={"px-3 " + addStyle}>
      <Link to={path}>{name}</Link>
    </li>
  );
}
export default function User() {
  function optionsDropDown() {
    document.querySelector(".options").classList.toggle("hidden");
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
      <ul className='options absolute backdrop-blur-md shadow-md rounded-md right-0 z-10 mt-2 hidden'>
        <li className='flex text-[12px] px-3 mb-1 py-1 border-b border-b-gray-300'>
          <span className='whitespace-nowrap'>Signed in as </span>
          <span className='font-semibold ml-1'>UserName</span>
        </li>
        <Options path='/' name='home' />
        <Options path='/' name='profile' />
        <Options path='/' name='setting' />
        <Options path='/' name='logout' addStyle='border-t border-t-gray-300 my-1 text-red-400' />
      </ul>
    </div>
  );
}
