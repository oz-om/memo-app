import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Folder from "./folder/Folder";
import { switchAddMode, switchMoveMode, updateActivated, moveNote } from "../../store/reducers";
import { getFoldersBlock, useActivatedFolder } from "../../global";
import axios from "axios";
const { VITE_API_KEY } = process.env;

export default function FoldersBlock() {
  //@ts-ignore
  const { foldersReducer, folderAddMode, activatedReducer, notesReducer, moveMode } = useSelector((state) => state);

  const dispatch = useDispatch();

  async function activeFolder(item) {
    let folder = item.parentElement;
    //check if we in moe mode
    if (moveMode.moveMode) {
      await changeNoteCategory(folder.dataset.id);
      dispatch(switchMoveMode({ moveMode: false }));
      return;
    }

    const AllFolders = document.querySelectorAll(".foldersContainer .folder");

    AllFolders.forEach((folder) => {
      folder.classList.remove("activatedFolder");
    });

    folder.classList.add("activatedFolder");

    dispatch(updateActivated(folder.dataset.id));
    getFoldersBlock();

    let filterNotes = useActivatedFolder(folder.dataset.id, dispatch, notesReducer.notes);
    filterNotes();
  }

  function autoActiveFolder() {
    let allFolders = Array.from(document.querySelectorAll(".foldersContainer .folder"));
    allFolders.forEach((folder) => {
      //@ts-ignore
      if (folder.dataset.id == activatedReducer) {
        folder.classList.add("activatedFolder");
      } else {
        folder.classList.remove("activatedFolder");
      }
    });
  }

  function goBack() {
    dispatch(switchMoveMode({ moveMode: false }));
    getFoldersBlock();
  }

  async function changeNoteCategory(to) {
    let data = {
      noteId: moveMode.noteId,
      to,
    };
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/change-category`, data, options);
    const res = await req.data;
    if (res.isChange) {
      dispatch(moveNote({ category: to, noteId: moveMode.noteId }));
      dispatch(updateActivated(to));
      getFoldersBlock();
    } else {
      console.log(res.msg);
    }
  }

  useEffect(() => {
    if (foldersReducer.folders.length > 0) {
      autoActiveFolder();
    }
  }, [activatedReducer]);

  const initFolders = foldersReducer.folders.map((folder) => {
    let itemsCount = notesReducer.notes.filter((note) => {
      return note.category_id == folder.id;
    });
    return <Folder key={folder.id} folder_id={folder.id} name={folder.folder} itemsCount={itemsCount.length} addMode={false} method={activeFolder} />;
  });

  return (
    <div className='foldersBlock absolute top-0 w-full bg-white transition-right right-[100vw] md:h-full lg:foldersBlockInLg'>
      <div className='bar py-1 mb-2 shadow-md relative'>
        <div className={"basis-1/5 ml-2 text-xl cursor-pointer " + (moveMode.moveMode ? "lg:visible" : "lg:invisible")}>
          {moveMode.moveMode ? (
            <span className='text-xs font-bold block relative -top-1' onClick={goBack}>
              cancel
            </span>
          ) : (
            <i className='iconoir-reply' onClick={() => goBack()}></i>
          )}
        </div>
        <h2 className='basis-10/12 text-center font-bold absolute  w-40 translate-x-[50%] right-[50%] top-0'> {moveMode.moveMode ? "select folder" : "folders"}</h2>
      </div>
      <div style={{ height: "calc(100vh - 163px)" }} className='foldersContainer overflow-y-scroll scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100/25 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'>
        {!moveMode.moveMode && (
          <div data-name='All' data-id={0} className='folder  bg-gray-100 border mx-2 mb-1 rounded-md cursor-pointer hover:bg-transparent activatedFolder'>
            <div
              onClick={(e) => {
                activeFolder(e.currentTarget);
              }}
              className='info flex items-center gap-x-1 px-2 py-2'
            >
              <span className='text-[12px]'>{notesReducer.notes.length}</span>
              <h2 className='text-lg font-black px-2'>All</h2>
            </div>
          </div>
        )}

        {folderAddMode && (
          <Folder
            addMode={folderAddMode}
            method={(e) => {
              activeFolder(e.currentTarget);
            }}
          />
        )}
        {initFolders}
      </div>
      <div onClick={() => dispatch(switchAddMode(true))} className='createNewFolder fixed w-full h-11 cursor-pointer py-3 bg-orange-100 text-orange-500 grid place-content-center rounded-md bottom-0 md:absolute md:bottom-6 lg:bottom-1'>
        <i className='iconoir-add-folder mx-auto text-2xl'></i>
        <span className='text-[11px] font-bold pl-3'>New Folder</span>
      </div>
    </div>
  );
}
