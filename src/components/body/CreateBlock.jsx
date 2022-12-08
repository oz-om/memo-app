import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushNote } from "../../store/reducers";
import axios from "axios";

function goBack() {
  rest();
  document.querySelector(".createBlock").classList.toggle("hidden");
}
function showFonts() {
  document.querySelector(".fonts ul").classList.toggle("hidden");
}
function showThemes() {
  document.querySelector(".themeColor ul").classList.toggle("hidden");
}
function rest() {
  let noteTitle = document.querySelector(".noteContent input");
  let noteContent = document.querySelector(".noteContent textarea");
  noteTitle.value = "";
  noteContent.value = "";
}
export default function CreateBlock() {
  //@ts-ignore
  const { notesReducer, userReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [title, setTitleNote] = useState("");
  const [note, setNote] = useState("");
  function getFolder() {
    const folders = document.querySelectorAll(".mainBody .folders li");
    const folder = [...folders].filter((f) => {
      return f.classList.contains("active");
    });
    if (folder.length > 0) {
      return folder[0].textContent;
    } else {
      return "all";
    }
  }
  async function addNote() {
    const Note = {
      ownerId: userReducer.user.id,
      title,
      note,
      folder: getFolder(),
      atTime: `${new Date().toLocaleDateString("en-CA")} ${new Date().toLocaleTimeString()}`,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post("http://127.0.0.1:4011/addNote", Note, options);
    const res = await req.data;
    if (res.isPush) {
      dispatch(pushNote({ id: res.noteId, ...Note }));
      rest();
      goBack();
    }
  }

  const textControlsStyle = "cursor-pointer";
  return (
    <div className='hidden createBlock absolute top-0 w-full h-full bg-slate-100'>
      <div className='container'>
        <div className='noteControls flex justify-between items-center border-b border-b-gray-300 mb-2 px-3'>
          <div>
            <i className='iconoir-arrow-left font-black text-3xl cursor-pointer' onClick={() => goBack()}></i>
          </div>
          <div>
            <i className='iconoir-send text-green-500 bg-green-100 border border-green-300 text-2xl rounded-md cursor-pointer py-[2px] px-1 h-6 grid place-content-center' onClick={() => addNote()}></i>
          </div>
        </div>
        <div className='noteView text-xl border-b border-b-gray-300 pb-2 grid px-2 gap-x-2'>
          <div className='textControls flex gap-x-4 items-center overflow-x-scroll scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'>
            <i className={"iconoir-align-left " + textControlsStyle}></i>
            <i className={"iconoir-align-center " + textControlsStyle}></i>
            <i className={"iconoir-align-right " + textControlsStyle}></i>
            <i className={"iconoir-italic " + textControlsStyle}></i>
            <i className={"iconoir-underline " + textControlsStyle}></i>
            <i className={"iconoir-bold " + textControlsStyle}></i>
            <i className={"iconoir-text " + textControlsStyle}></i>
            <i className={"iconoir-text-size " + textControlsStyle}></i>
          </div>
          <div className='theme flex justify-center gap-x-5'>
            <div className='fonts relative'>
              <i className='iconoir-missing-font cursor-pointer' onClick={() => showFonts()}></i>
              <ul className='absolute right-0 bg-gray-200 mt-2 rounded p-1 hidden'>
                <li className='font-cur  border-2 border-orange-100 px-2 rounded-sm mt-1 cursor-pointer'>cursive</li>
                <li className='italic  border-2 border-orange-100 px-2 rounded-sm mt-1 cursor-pointer'>italic</li>
              </ul>
            </div>
            <div className='themeColor relative'>
              <i className='iconoir-flower cursor-pointer' onClick={() => showThemes()}></i>
              <ul className='absolute flex hidden right-0 mt-2 gap-1 bg-orange-200 p-1 rounded'>
                <li className='h-6 w-10 rounded cursor-pointer bg-red-400'></li>
                <li className='h-6 w-10 rounded cursor-pointer bg-orange-400'></li>
                <li className='h-6 w-10 rounded cursor-pointer bg-blue-400'></li>
                <li className='h-6 w-10 rounded cursor-pointer bg-green-400'></li>
                <li className='h-6 w-10 rounded cursor-pointer bg-pink-400'></li>
                <li className='h-6 w-10 rounded cursor-pointer bg-yellow-400'></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='noteContent bg-red-100'>
          <div className=''>
            <input type='text' placeholder='Title' onInput={(e) => setTitleNote(e.target.value)} className='w-full outline-none font-black text-lg pl-2 py-2' />
          </div>
          <div>
            <textarea placeholder='start typing' onInput={(e) => setNote(e.target.value)} className='resize-none w-full outline-none pl-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100/25 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
