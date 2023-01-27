import Note from "./note/Note";
import Masonry from "react-responsive-masonry";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupNotes } from "../../store/reducers";
import { getCreateBlock, useActivatedFolder } from "../../global";
import { LoadNotes } from "../Loading";
import { Error } from "../Error";

function EmptyBlock() {
  return (
    <div className='empty grid place-content-center'>
      <div className='w-72'>
        <img src='https://svgshare.com/i/oan.svg' alt='empty' />
      </div>
      <p className='text-gray-600 mt-3'>
        there is no notes yet
        <span className='text-orange-400 cursor-pointer ml-1' onClick={() => getCreateBlock()}>
          create one ?
        </span>
      </p>
    </div>
  );
}
function timestamp(atTime) {
  const Hours = new Date(atTime).getHours() < 10 ? `0${new Date(atTime).getHours()}` : new Date(atTime).getHours();
  const Minutes = new Date(atTime).getMinutes() < 10 ? `0${new Date(atTime).getMinutes()}` : new Date(atTime).getMinutes();
  const timestamp = `${Hours}:${Minutes}`;
  return timestamp;
}

export default function Notes() {
  //@ts-ignore
  const { virtualNotes, notesReducer, activatedReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!virtualNotes.length) {
      dispatch(setupNotes(notesReducer.notes));
    }
    let filterNotes = useActivatedFolder(activatedReducer, dispatch, notesReducer.notes);
    filterNotes();
  }, [notesReducer.notes]);

  return (
    <div className='notes px-4 overflow-x-hidden overflow-y-scroll customScroll  h-'>
      {notesReducer.loading ? (
        <>
          <Masonry columnsCount={2} gutter={"16px"} style={{ paddingBottom: "50px" }}>
            <LoadNotes height={"h-48"} />
            <LoadNotes height={"h-[136px]"} />
            <LoadNotes height={"h-[136px]"} />
            <LoadNotes height={"h-48"} />
            <LoadNotes height={"h-48"} />
            <LoadNotes height={"h-[136px]"} />
          </Masonry>
        </>
      ) : virtualNotes.length > 0 ? (
        <Masonry columnsCount={2} gutter={"16px"} style={{ paddingBottom: "50px" }}>
          {virtualNotes.map((n) => {
            const { id, title, note, folder, atTime, bgColor, color } = n;
            return <Note key={id} id={id} title={title} note={note} folder={folder} atTime={timestamp(atTime)} bgColor={bgColor} color={color} />;
          })}
        </Masonry>
      ) : (
        <EmptyBlock />
      )}
      {notesReducer.errMsg.length > 0 && <Error msg={notesReducer.errMsg} />}
    </div>
  );
}
