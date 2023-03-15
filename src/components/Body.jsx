import SearchAndAdd from "./body/SearchAnaAdd";
import Bar from "./body/Bar";
import Notes from "./body/Notes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "./body/Editor";
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
    <main className='mainBody overflow-hidden relative h-full md:h-screen md:mainBodyInMd'>
      {userReducer.userState && (
        <>
          <div className='notesBlock container transition-left left-0 relative lg:notesBlockInLg'>
            <SearchAndAdd />
            <Bar />
            <Notes />
          </div>
          <Editor />
          <FoldersBlock />
        </>
      )}
    </main>
  );
}
