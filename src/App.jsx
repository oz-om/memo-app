import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Loading = lazy(() => import("./components/Loading"));
const Head = lazy(() => import("./components/Head"));
const Body = lazy(() => import("./components/Body"));
const Login = lazy(() => import("./pages/Login"));
const Signin = lazy(() => import("./pages/Signin"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userReducer.userState) {
      // @ts-ignore
      import("./store/reducers").then((module) => dispatch(module.isUser()));
    }
    if (userReducer.userState) {
      //@ts-ignore
      import("./store/reducers").then((module) => dispatch(module.fetchFolders()));
      //@ts-ignore
      import("./store/reducers").then((module) => dispatch(module.fetchNotes()));
    }
  }, [userReducer.userState]);

  return (
    <>
      {userReducer.loading ? (
        <Loading />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <Head />
            <Routes>
              <Route path='/' element={<Body />} />

              <Route path='/log-in' element={<Login />} />
              <Route path='/sign-in' element={<Signin />} />

              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
}
