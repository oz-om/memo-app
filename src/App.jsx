import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Head from './components/Head';
import Body from './components/Body';
import Login from './pages/Login';
import Singin from './pages/Singin';
import About from './pages/About';
import Contact from './pages/Contact';
import {useSelector, useDispatch} from "react-redux"
import {isUser} from "./store/reducers"

export default function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(isUser())
  }, []);
  
  return (
    <>
      <Head />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sing-in" element={<Singin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
};



