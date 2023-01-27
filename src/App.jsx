import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Head from "./components/Head";
import Body from "./components/Body";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useSelector, useDispatch } from "react-redux";
import { isUser, fetchFolders, fetchNotes } from "./store/reducers";

export default function App() {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userReducer.userState) {
      // @ts-ignore
      dispatch(isUser());
    }
    if (userReducer.userState) {
      //@ts-ignore
      dispatch(fetchNotes());
      //@ts-ignore
      dispatch(fetchFolders());
    }
  }, [userReducer.userState]);

  return (
    <>
      {userReducer.loading ? (
        <Loading />
      ) : (
        <>
          <Head />
          <Routes>
            <Route path='/' element={<Body />} />

            <Route path='/log-in' element={<Login />} />
            <Route path='/sign-in' element={<Signin />} />

            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </>
      )}
    </>
  );
}
