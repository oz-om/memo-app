import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateActivated } from "../../store/reducers";
import BarFolder from "./folder/BarFolder";
import { getFoldersBlock, useActivatedFolder } from "../../global";

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

    let filterNotes = useActivatedFolder(e.target.textContent, dispatch, notesReducer);
    filterNotes();

    dispatch(updateActivated(e.target.textContent));
  }
  function autoActiveFolder() {
    if (activatedReducer == "All") {
      document.querySelector(".bar .all").classList.add("active");
    } else {
      document.querySelector(".bar .all").classList.remove("active");
    }
    let allFolders = Array.from(document.querySelectorAll(".bar .folders li"));
    allFolders.forEach((li) => {
      //@ts-ignore
      if (li.dataset.name == activatedReducer) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }

  useEffect(() => {
    if (foldersReducer.length > 0) {
      autoActiveFolder();
    }
  }, [activatedReducer]);

  let folder_li = foldersReducer.map((folder) => <BarFolder key={folder} name={folder} click={active_toggle} />);

  return (
    <div className='bar p-1 my-3 grid grid-cols-two shadow'>
      <ul className='flex gap-x-2'>
        <li className='all rounded px-4 py-2 cursor-pointer border border-transparent active' onClick={active_toggle}>
          All
        </li>
        <ul className='folders flex overflow-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100/25 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'>{folder_li}</ul>
      </ul>
      <span className='flex items-center' onClick={() => getFoldersBlock()}>
        <i className='iconoir-folder rounded px-4 py-2 font-black text-orange-400 text-xl bg-orange-100/25 cursor-pointer -z-[1]'></i>
      </span>
    </div>
  );
}
