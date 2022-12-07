import SearchAndAdd from "./body/SearchAnaAdd";
import Bar from "./body/Bar";
import Notes from "./body/Notes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateBlock from "./body/CreateBlock";
import FoldersBlock from "./body/FoldersBlock";

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
    <main className='mainBody pt-5 overflow-hidden relative'>
      <div className='container'>
        <SearchAndAdd />
        <Bar />
        <Notes />
      </div>
      <CreateBlock />
      <FoldersBlock />
    </main>
  );
}
