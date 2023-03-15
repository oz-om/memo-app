import Note from "./note/Note";
// import Masonry from "react-responsive-masonry";
import Masonry from "./note/Masonry";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupNotes } from "../../store/reducers";
import { getCreateBlock, useActivatedFolder } from "../../global";
import { LoadNotes } from "../Loading";
import { lazy, Suspense } from "react";
const Error = lazy(() => import("../Error").then((module) => ({ default: module.Error })));

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
  const givenTime = new Date(atTime);
  const currentTime = new Date();
  //@ts-ignore
  const timeDifference = currentTime - givenTime;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const hours = givenTime.getHours();
  const minutes = givenTime.getMinutes();
  const day = givenTime.getDate();
  const month = givenTime.toLocaleString("en-us", { month: "short" });
  const year = givenTime.getFullYear();

  if (daysDifference === 0) {
    return `${hours}:${minutes}`;
  } else if (daysDifference === 1) {
    return `Yesterday at ${hours}:${minutes}`;
  } else if (currentTime.getFullYear() === year) {
    return `${day} ${month}`;
  } else {
    return `${day} ${month} ${year}`;
  }
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
    <div className='notes px-4 overflow-x-hidden overflow-y-scroll customScroll  md:notesInMd lg:notesInLg'>
      {notesReducer.loading ? (
        <>
          <Masonry columnsCount={2} gap={3}>
            <LoadNotes height={"h-48"} />
            <LoadNotes height={"h-[136px]"} />
            <LoadNotes height={"h-[136px]"} />
            <LoadNotes height={"h-48"} />
            <LoadNotes height={"h-48"} />
            <LoadNotes height={"h-[136px]"} />
          </Masonry>
        </>
      ) : virtualNotes.length > 0 ? (
        <Masonry columnsCount={2} gap={3}>
          {virtualNotes.map((n) => {
            const { id, title, note, folder, atTime, bgColor, color } = n;
            return <Note key={id} id={id} title={title} note={note} folder={folder} atTime={timestamp(atTime)} bgColor={bgColor} color={color} />;
          })}
        </Masonry>
      ) : notesReducer.errMsg.length > 0 ? (
        <Suspense>
          <Error msg={notesReducer.errMsg} />
        </Suspense>
      ) : (
        <EmptyBlock />
      )}
    </div>
  );
}
