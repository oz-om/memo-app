import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushFolder, removeFolder, reNameFolder, switchModifyMode } from "../../../store/reducers";
const { VITE_API_KEY } = process.env;
export default function Folder(props) {
  //@ts-ignore
  const { userReducer } = useSelector((state) => state);
  const [newFolder, setNewFolder] = useState("");
  const [renameState, setRenameState] = useState(false);
  const [newName, setNewName] = useState("");
  const [addSpin, setAddSpin] = useState(false);
  const [saveSpin, setSaveSpin] = useState(false);
  const [deleteSpin, setDeleteSpin] = useState(false);
  const dispatch = useDispatch();
  const ownerId = userReducer.user.id;

  function rest() {
    //@ts-ignore
    document.querySelector(".folderName input").value = "";
    dispatch(switchModifyMode(false));
  }

  async function addFolder() {
    setAddSpin(true);
    const folder = {
      newFolder,
      ownerId,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/addFolder`, folder, options);
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

  async function deleteFolder(folderId) {
    setDeleteSpin(true);
    const selectedFolder = {
      id: folderId,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/deleteFolder`, selectedFolder, options);
    const res = await req.data;
    if (res.isDeleted) {
      dispatch(removeFolder(+folderId));
      setDeleteSpin(false);
    } else {
      console.log(res.msg);
      setDeleteSpin(false);
    }
  }

  function renameFolder() {
    setRenameState(true);
    document.getElementById(`folder_name_${name}`).textContent = "";
  }

  function cancelRename() {
    setRenameState(false);
    document.getElementById(`folder_name_${name}`).textContent = name;
  }

  async function saveNewName(target) {
    setSaveSpin(true);
    const update = {
      oldName: name,
      id: target,
      newName,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/renameFolder`, update, options);
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

  useEffect(() => {});
  const { itemsCount, name, folder_id, modifyMode, method } = props;
  return (
    <div data-name={name} data-id={folder_id} className='folder grid grid-cols-twoCol bg-gray-100 justify-between border mx-2 mb-1 rounded-md cursor-pointer hover:bg-transparent'>
      <div
        onClick={(e) => {
          !modifyMode && method(e.currentTarget);
        }}
        className='info flex gap-x-1 items-center w-full px-2 py-3'
      >
        <span className='text-[12px]'>{modifyMode ? 0 : itemsCount}</span>
        <div className='folderName relative w-full grid content-center h-6 -top-[2px]'>
          <h2 id={"folder_name_" + name} className='text-lg font-black px-2'>
            {modifyMode ? "" : name}
          </h2>
          {modifyMode && (
            <input
              type='text'
              onInput={(e) =>
                setNewFolder(
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
                setNewName(
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
        {modifyMode ? (
          <>
            <div onClick={() => rest()} className='grid place-content-center text-red-400'>
              <i className='iconoir-cancel mx-auto text-xl'></i>
              <span className='text-[10px] font-bold'>cancel</span>
            </div>
            <div onClick={() => addFolder()} className='saveNewFolder grid place-content-center text-emerald-400 cursor-pointer'>
              <i className={"mx-auto text-xl " + (addSpin ? "iconoir-refresh-double animate-spin cursor-no-drop" : "iconoir-double-check")}></i>
              <span className='text-[10px] font-bold cursor-pointer'>add</span>
            </div>
          </>
        ) : renameState ? (
          <>
            <div onClick={() => cancelRename()} className='grid place-content-center text-red-400'>
              <i className='iconoir-cancel mx-auto text-xl'></i>
              <span className='text-[10px] font-bold'>cancel</span>
            </div>
            <div id={folder_id} onClick={(e) => saveNewName(e.currentTarget.id)} className='grid place-content-center text-emerald-400 cursor-pointer'>
              <i className={"mx-auto text-xl" + (saveSpin ? " iconoir-refresh-double animate-spin cursor-no-drop" : " iconoir-send")}></i>
              <span className='text-[10px] font-bold'>save</span>
            </div>
          </>
        ) : (
          name != "uncategorized" && (
            <>
              <div id={folder_id} onClick={(e) => deleteFolder(e.currentTarget.id)} className='grid place-content-center text-red-400'>
                <i className={"mx-auto text-xl " + (deleteSpin ? "iconoir-refresh-double animate-spin cursor-no-drop" : "iconoir-trash")}></i>
                <span className='text-[10px] font-bold'>delete</span>
              </div>
              <div onClick={() => renameFolder()} className='grid place-content-center text-emerald-400 cursor-pointer'>
                <i className='iconoir-edit mx-auto text-xl'></i>
                <span className='text-[10px] font-bold'>rename</span>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
