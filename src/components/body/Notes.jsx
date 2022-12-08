import Note from "./note/Note";
import Masonry from "react-responsive-masonry";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function EmptyBlock() {
  function getCreateBlock() {
    document.querySelector(".createBlock").classList.toggle("hidden");
  }

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
  const { notesReducer, activatedReducer } = useSelector((state) => state);
  const [setupNotes, setNotes] = useState([]);

  useEffect(() => {
    let initNotes;
    if (activatedReducer == "All") {
      initNotes = notesReducer.map((n) => {
        const { id, title, note, folder, atTime } = n;
        return <Note key={id} id={id} title={title} note={note} folder={folder} atTime={timestamp(atTime)} />;
      });
    } else {
      let activatedOnly = notesReducer.filter((active) => {
        return active.folder == activatedReducer;
      });
      initNotes = activatedOnly.map((n) => {
        const { id, title, note, folder, atTime } = n;
        return <Note key={id} id={id} title={title} note={note} folder={folder} atTime={timestamp(atTime)} />;
      });
    }
    setNotes(initNotes);
  }, [activatedReducer, notesReducer]);

  return (
    <div className='notes px-4 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100/25 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'>
      {setupNotes.length > 0 ? (
        <Masonry columnsCount={2} gutter={"16px"} style={{ paddingBottom: "50px" }}>
          {setupNotes}
          <input />
        </Masonry>
      ) : (
        <EmptyBlock />
      )}
    </div>
  );
}

// let empty;
// let initNotes;
// if (notesReducer.length > 0) {
//   initNotes = notesReducer.map((n) => {
//     const { id, title, note, folder, atTime } = n;
//     return <Note key={id} id={id} title={title} note={note} folder={folder} atTime={timestamp(atTime)} />;
//   });
// } else {
//   initNotes = "";
//   empty = <EmptyBlock />;
// }
