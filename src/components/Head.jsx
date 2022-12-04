import Menu from "./header/Menu";
import Logo from "./header/Logo";
import Guest from "./header/Guest";
import User from "./header/User";
import { useSelector } from "react-redux";

export default function Head() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);

  return (
    <header>
      <div className='container'>
        <div className='flex justify-between items-center px-2 py-2 shadow shadow-cyan-500/50 rounded-lg'>
          <Menu />
          <Logo />
          {userReducer.userState ? <User /> : <Guest />}
        </div>
      </div>
    </header>
  );
}
