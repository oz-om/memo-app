import Note from "./note/Note";
import Masonry from "react-responsive-masonry";
import { useSelector } from "react-redux";

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

export default function Notes() {
  //@ts-ignore
  const { notesReducer } = useSelector((state) => state);

  let initNotes;
  let empty;
  if (notesReducer.length > 0) {
    initNotes = notesReducer.map((n) => {
      const { id, title, note, folder, atTime } = n;
      const Hours = new Date(atTime).getHours() < 10 ? `0${new Date(atTime).getHours()}` : new Date(atTime).getHours();
      const Minutes = new Date(atTime).getMinutes() < 10 ? `0${new Date(atTime).getMinutes()}` : new Date(atTime).getMinutes();
      const timestamp = `${Hours}:${Minutes}`;
      return <Note key={id} id={id} title={title} note={note} folder={folder} atTime={timestamp} />;
    });
  } else {
    initNotes = "";
    empty = <EmptyBlock />;
  }
  return (
    <div className='notes px-4 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100/25 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'>
      <Masonry columnsCount={2} gutter={"16px"} style={{ paddingBottom: "50px" }}>
        {initNotes}
      </Masonry>
      {empty}
    </div>
  );
}
