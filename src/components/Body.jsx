import Search from "./body/Search";
import Bar from "./body/Bar";
import Notes from "./body/Notes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Body() {
  // @ts-ignore
  const { userReducer } = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userReducer.userState) {
      navigate("/log-in");
    }
  }, [userReducer.userState]);
  return (
    <main className='container'>
      <Search />
      <Bar />
      <Notes />
    </main>
  );
}
