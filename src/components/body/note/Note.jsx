import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNote, switchNoteModifyMode } from "../../../store/reducers";

function toggleOptions(target) {
  target.nextElementSibling.classList.toggle("hidden");
}
function getCreateBlock() {
  document.querySelector(".createBlock").classList.toggle("hidden");
  let iframe = document.querySelector(".noteContent iframe");
  //@ts-ignore
  iframe.contentDocument.designMode = "on";
  //@ts-ignore
  iframe.contentDocument.body.style.margin = "0";
  //@ts-ignore
  iframe.contentDocument.body.style.padding = "8px";
  //@ts-ignore
  window.myEditor = iframe.contentDocument.body;
}

export default function Note(props) {
  //@ts-ignore
  const { notesReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  async function deleteNote(ele) {
    const noteId = ele.dataset.delete;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post("http://127.0.0.1:4011/deleteNote", { noteId }, options);
    const res = await req.data;
    if (res.deleted) {
      dispatch(removeNote(+noteId));
    }
  }

  function editNote(edit) {
    getCreateBlock();
    const specificNote = notesReducer.filter((note) => {
      return note.id == edit.dataset.edit;
    });
    const { title, note, id, bgColor, color } = specificNote[0];
    dispatch(switchNoteModifyMode({ editMode: true, title, note, id, bgColor, color }));
    edit.parentElement.classList.toggle("hidden");
  }

  const { id, title, note, atTime, folder, bgColor, color } = props;
  function changeColorOpacity(opacity) {
    let newColor = color.split(")");
    newColor[1] = opacity;
    return newColor.join();
  }
  return (
    <div
      data-name={folder}
      className='Note p-4 mb-3.5 rounded-lg max-h-48 shadow'
      style={{
        backgroundColor: bgColor,
        color,
      }}
    >
      <h4 className='font-bold'>{title}</h4>

      <div
        dangerouslySetInnerHTML={{ __html: note }}
        className='shortNote line-clamp-5 whitespace-pre-line'
        style={{
          color: changeColorOpacity(" 0.65)"),
        }}
      ></div>
      <div className='details flex justify-between'>
        <span
          className='text-sm'
          style={{
            color: changeColorOpacity(" 0.40)"),
          }}
        >
          {atTime}
        </span>
        <div className='options relative'>
          <i onClick={(e) => toggleOptions(e.target)} className='iconoir-more-vert cursor-pointer font-black text-xl rounded'></i>
          <ul className='noteControlsOptions absolute right-0 backdrop-blur-md shadow-md rounded-md text-sm hidden'>
            <li data-edit={id} onClick={(e) => editNote(e.currentTarget)} className='flex gap-x-1 items-center px-2 text-emerald-400 bg-emerald-50 cursor-pointer'>
              <i className='iconoir-edit'></i>
              <span>edit</span>
            </li>
            <li data-delete={id} onClick={(e) => deleteNote(e.currentTarget)} className='flex gap-x-1 items-center px-2 text-red-400 bg-red-50 cursor-pointer'>
              <i className='iconoir-trash'></i>
              <span>delete</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// export default React.memo(Note)
