import Note from "./note/Note";
import Masonry from "react-responsive-masonry";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes } from "../../store/reducers";

export default function Notes() {
  //@ts-ignore
  const { userReducer, notesReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userReducer.userState) {
      //@ts-ignore
      dispatch(fetchNotes({ ownerId: userReducer.user.id }));
    }
  }, []);

  let initNotes = notesReducer.map((note) => {
    return <Note key={note.id} title={note.title} note={note.note} />;
  });
  return (
    <div className='notes px-4 border-red-900 overflow-hidden overflow-y-scroll'>
      <Masonry columnsCount={2} gutter={"16px"}>
        {initNotes}
      </Masonry>
    </div>
  );
}
