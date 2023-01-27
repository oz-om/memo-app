import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActivated } from "../../store/reducers";
import BarFolder from "./folder/BarFolder";
import { LoadFolders } from "../Loading";
import { getFoldersBlock, useActivatedFolder } from "../../global";
import { Error } from "../Error";

export default function Bar() {
  //@ts-ignore
  const { foldersReducer, activatedReducer, notesReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  function active_toggle(e) {
    document.querySelector(".bar .all").classList.remove("active");
    document.querySelectorAll(".folders li").forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");

    let filterNotes = useActivatedFolder(e.target.dataset.id, dispatch, notesReducer.notes);
    filterNotes();

    dispatch(updateActivated(e.target.dataset.id));
  }
  function autoActiveFolder() {
    if (activatedReducer == 0) {
      document.querySelector(".bar .all").classList.add("active");
    } else {
      document.querySelector(".bar .all").classList.remove("active");
    }
    let allFolders = Array.from(document.querySelectorAll(".bar .folders li"));
    allFolders.forEach((li) => {
      //@ts-ignore
      if (li.dataset.id == activatedReducer) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }

  useEffect(() => {
    if (foldersReducer.folders.length > 0) {
      autoActiveFolder();
    }
  }, [activatedReducer]);

  return (
    <div className='bar p-1 my-3 grid grid-cols-two shadow'>
      <ul className='flex gap-x-2'>
        <li className='all rounded px-4 py-2 cursor-pointer border border-transparent active' data-id={0} onClick={active_toggle}>
          All
        </li>
        <ul className='folders flex overflow-auto customScroll'>
          {foldersReducer.loading ? (
            <>
              <LoadFolders />
              <LoadFolders />
              <LoadFolders />
            </>
          ) : (
            foldersReducer.folders.length > 0 && foldersReducer.folders.map((folder) => <BarFolder key={folder.id} id={folder.id} name={folder.folder} click={active_toggle} />)
          )}
          {foldersReducer.errMsg.length > 0 && <Error msg={foldersReducer.errMsg.split(",")[0]} />}
        </ul>
      </ul>
      <span className='flex items-center' onClick={() => getFoldersBlock()}>
        <i className='iconoir-folder rounded px-4 py-2 font-black text-orange-400 text-xl bg-orange-100/25 cursor-pointer -z-[1]'></i>
      </span>
    </div>
  );
}
