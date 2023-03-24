import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushFolder, removeFolder, reNameFolder, switchAddMode } from "../../../store/reducers";
const { VITE_API_KEY } = process.env;
export default function Folder(props) {
  const { itemsCount, name, folder_id, addMode, method } = props;
  //@ts-ignore
  const { userReducer, moveMode } = useSelector((state) => state);
  const [newFolder, setNewFolder] = useState("");
  const [renameState, setRenameState] = useState(false);
  const [newName, setNewName] = useState("");
  const [addSpin, setAddSpin] = useState(false);
  const [saveSpin, setSaveSpin] = useState(false);
  const [deleteSpin, setDeleteSpin] = useState(false);
  const [moveSpin, setMoveSpin] = useState(false);
  const dispatch = useDispatch();
  const ownerId = userReducer.user.id;

  function rest() {
    //@ts-ignore
    document.querySelector(".folderName input").value = "";
    dispatch(switchAddMode(false));
  }

  function handleAddStyle_Value(value) {
    let addBtn = document.querySelector(".controls .addNewFolder");
    if (value.length > 0) {
      addBtn.classList.remove("text-emerald-100", "pointer-events-none");
      addBtn.classList.add("text-emerald-400", "cursor-pointer");
    } else {
      addBtn.classList.add("text-emerald-100", "pointer-events-none");
      addBtn.classList.remove("text-emerald-400", "cursor-pointer");
    }
    setNewFolder(value);
  }
  let addRequestController;
  async function addFolder() {
    setAddSpin(true);
    if (addRequestController) {
      addRequestController.abort();
      addRequestController = null;
    }

    addRequestController = new AbortController();
    const { signal } = addRequestController;
    const folder = {
      newFolder,
      ownerId,
    };
    const options = {
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/addFolder`, folder, options);
    addRequestController = null;
    const res = await req.data;
    if (res.isAdd) {
      setAddSpin(true);
      dispatch(
        pushFolder({
          id: res.id,
          folder: newFolder,
        }),
      );
      rest();
    } else {
      setAddSpin(true);
      console.log(res.msg);
    }
  }

  let DRequestController;
  async function deleteFolder(folderId) {
    setDeleteSpin(true);
    if (DRequestController) {
      DRequestController.abort();
      DRequestController = null;
    }
    DRequestController = new AbortController();
    const { signal } = DRequestController;
    const selectedFolder = {
      id: folderId,
    };
    const options = {
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/deleteFolder`, selectedFolder, options);
    DRequestController = null;
    const res = await req.data;
    if (res.isDeleted) {
      dispatch(removeFolder(+folderId));
      setDeleteSpin(false);
    } else {
      console.log(res.msg);
      setDeleteSpin(false);
    }
  }

  // rename functionality
  function renameFolder() {
    setRenameState(true);
    document.getElementById(`folder_name_${name}`).textContent = "";
  }
  function handleRenameStyle_Value(value) {
    let saveChangesBtn = document.getElementById(folder_id);
    if (value.length > 0) {
      saveChangesBtn.classList.remove("text-emerald-100", "pointer-events-none");
      saveChangesBtn.classList.add("text-emerald-400", "cursor-pointer");
    } else {
      saveChangesBtn.classList.add("text-emerald-100", "pointer-events-none");
      saveChangesBtn.classList.remove("text-emerald-400", "cursor-pointer");
    }
    setNewName(value);
  }
  function cancelRename() {
    setRenameState(false);
    document.getElementById(`folder_name_${name}`).textContent = name;
  }
  let renameRequestController;
  async function saveNewName(target) {
    setSaveSpin(true);
    if (renameRequestController) {
      renameRequestController.abort();
      renameRequestController = null;
    }

    renameRequestController = new AbortController();
    const { signal } = renameRequestController;

    const update = {
      oldName: name,
      id: target,
      newName,
    };
    const options = {
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/renameFolder`, update, options);
    renameRequestController = null;
    const res = await req.data;
    if (res.isUpdate) {
      setSaveSpin(false);
      dispatch(reNameFolder(update));
      setRenameState(false);
    } else {
      setSaveSpin(false);
      console.log(res.msg);
    }
  }
  useEffect(() => {
    if (!moveMode.moveMode) {
      setMoveSpin(false);
    }
  }, [moveMode.moveMode]);
  return (
    <div data-name={name} data-id={folder_id} className='folder grid grid-cols-twoCol bg-gray-100 justify-between border mx-2 mb-1 rounded-md cursor-pointer hover:bg-transparent'>
      <div
        onClick={(e) => {
          !addMode && method(e.currentTarget);
          moveMode.moveMode && setMoveSpin(true);
        }}
        className='info flex gap-x-1 items-center w-full px-2 py-3'
      >
        <span className='text-[12px]'>{addMode ? 0 : itemsCount}</span>
        <div className='folderName relative w-full grid content-center h-6 -top-[2px]'>
          <h2 id={"folder_name_" + name} className='text-lg font-black px-2'>
            {addMode ? "" : name}
          </h2>
          {addMode && (
            <input
              type='text'
              onInput={(e) =>
                handleAddStyle_Value(
                  // @ts-ignore
                  e.target.value,
                )
              }
              className='bg-transparent outline-none  absolute left font-black text-xl pl-3 w-full'
              autoFocus
            />
          )}
          {renameState && (
            <input
              type='text'
              onInput={(e) =>
                handleRenameStyle_Value(
                  // @ts-ignore
                  e.target.value,
                )
              }
              className='bg-transparent outline-none  absolute left font-black text-xl pl-3 w-full'
              placeholder={name}
              autoFocus
            />
          )}
        </div>
      </div>
      <div className='controls flex gap-x-2'>
        {addMode ? (
          <>
            <div onClick={() => rest()} className='grid place-content-center text-red-400 cursor-pointer'>
              <i className='iconoir-cancel mx-auto text-xl'></i>
              <span className='text-[10px] font-bold'>cancel</span>
            </div>
            <div onClick={() => addFolder()} className={"addNewFolder grid place-content-center text-emerald-100 pointer-events-none " + (addSpin && "pointer-events-none text-emerald-100")}>
              <i className={"mx-auto text-xl " + (addSpin ? "iconoir-refresh-double animate-spin" : "iconoir-double-check")}></i>
              <span className='text-[10px] font-bold'>add</span>
            </div>
          </>
        ) : renameState ? (
          <>
            <div onClick={() => cancelRename()} className='grid place-content-center text-red-400'>
              <i className='iconoir-cancel mx-auto text-xl'></i>
              <span className='text-[10px] font-bold'>cancel</span>
            </div>
            <div id={folder_id} onClick={(e) => saveNewName(e.currentTarget.id)} className={"grid place-content-center pointer-events-none " + (saveSpin ? " pointer-events-none text-emerald-400" : "text-emerald-100")}>
              <i className={"mx-auto text-xl" + (saveSpin ? " iconoir-refresh-double animate-spin" : " iconoir-send")}></i>
              <span className='text-[10px] font-bold'>save</span>
            </div>
          </>
        ) : (
          name != "uncategorized" &&
          !moveMode.moveMode && (
            <>
              <div id={folder_id} onClick={(e) => deleteFolder(e.currentTarget.id)} className={"grid place-content-center text-red-400 cursor-pointer" + (deleteSpin && "pointer-events-none")}>
                <i className={"mx-auto text-xl " + (deleteSpin ? "iconoir-refresh-double animate-spin" : "iconoir-trash")}></i>
                <span className='text-[10px] font-bold'>delete</span>
              </div>
              <div onClick={(e) => renameFolder()} className='grid place-content-center text-emerald-400 cursor-pointer '>
                <i className='iconoir-edit mx-auto text-xl'></i>
                <span className='text-[10px] font-bold'>rename</span>
              </div>
            </>
          )
        )}
        {moveSpin && <i className={"mx-auto text-xl iconoir-refresh-double animate-spin grid place-content-center"}></i>}
      </div>
    </div>
  );
}
