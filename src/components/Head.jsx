import Menu from "./header/Menu";
import Logo from "./header/Logo";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
const User = lazy(() => import("./header/User"));
const Guest = lazy(() => import("./header/Guest"));

function LoadHeader() {
  return <div className='h-5 w-10'></div>;
}
export default function Head() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);

  return (
    <>
      <header>
        <div className='container'>
          <div className='flex justify-between items-center px-2 py-2 shadow shadow-cyan-500/50 rounded-lg headInMd'>
            <Menu />
            <Logo />
            <Suspense fallback={<LoadHeader />}>{userReducer.userState ? <User /> : <Guest />}</Suspense>
          </div>
        </div>
      </header>
    </>
  );
}
