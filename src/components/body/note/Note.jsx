import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNote, switchNoteModifyMode, switchSearchMode } from "../../../store/reducers";
import { getCreateBlock, useToggleSearchUI } from "../../../global";
import { useState } from "react";
const { VITE_API_KEY } = process.env;

function toggleOptions(e, target) {
  e.stopPropagation();
  let options = document.querySelectorAll(".Note .options .noteControlsOptions");
  options.forEach((list) => {
    if (target.nextElementSibling == list) {
      target.nextElementSibling.classList.toggle("w-0");
      target.nextElementSibling.classList.toggle("w-20");
    } else {
      list.classList.add("w-0");
      list.classList.remove("w-20");
    }
  });
}

export default function Note(props) {
  const [deleteSpin, setDeleteSpin] = useState(false);
  //@ts-ignore
  const { notesReducer, activatedReducer, searchMode } = useSelector((state) => state);
  const dispatch = useDispatch();

  let deleteNoteRequestController;
  async function deleteNote(e, ele) {
    // to disable click event for note while deleting it
    let note = document.querySelector(`[data-edit='${ele.dataset.delete}']`);
    note.classList.add("pointer-events-none");

    e.stopPropagation();
    setDeleteSpin(true);
    if (deleteNoteRequestController) {
      deleteNoteRequestController.abort();
      deleteNoteRequestController = null;
    }
    deleteNoteRequestController = new AbortController();
    const { signal } = deleteNoteRequestController;
    const noteId = ele.dataset.delete;
    const options = {
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/deleteNote`, { noteId }, options);
    deleteNoteRequestController = null;
    const res = await req.data;
    if (res.deleted) {
      dispatch(removeNote(+noteId));
      setDeleteSpin(false);
    } else {
      setDeleteSpin(false);
      console.log(res.msg);
    }
  }

  function editNote(edit) {
    if (searchMode) {
      dispatch(switchSearchMode(false));
      let toggleSearchUI = useToggleSearchUI(false, activatedReducer, dispatch, notesReducer.notes);
      toggleSearchUI();
    }
    getCreateBlock();
    const specificNote = notesReducer.notes.filter((note) => {
      return note.id == edit.dataset.edit;
    });
    const { title, note, id, bgColor, color } = specificNote[0];

    dispatch(switchNoteModifyMode({ editMode: true, title, note, id, bgColor, color }));
    edit.parentElement.classList.toggle("w-0");
    edit.parentElement.classList.toggle("w-20");
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
      data-edit={id}
      className='Note p-4 pb-0 mb-3.5 rounded-lg max-h-48 shadow cursor-pointer'
      style={{
        backgroundColor: bgColor,
        color,
      }}
      onClick={(e) => editNote(e.currentTarget)}
    >
      <h4 className='font-bold'>{title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: note }}
        className='shortNote line-clamp-5 whitespace-pre-line'
        style={{
          color: changeColorOpacity(" 0.65)"),
        }}
      ></div>
      <div className='details flex justify-between mt-3'>
        <span
          className='text-sm'
          style={{
            color: changeColorOpacity(" 0.40)"),
          }}
        >
          {atTime}
        </span>
        <div className='options relative'>
          <i onClick={(e) => toggleOptions(e, e.target)} className='iconoir-more-vert cursor-pointer font-black text-xl rounded'></i>
          <ul className='noteControlsOptions absolute -right-4 -top-16 overflow-hidden transition-width backdrop-blur-md shadow-md rounded-md text-sm w-0 '>
            <li data-move={id} onClick={(e) => deleteNote(e.currentTarget)} className='flex gap-x-1 items-center px-2  cursor-pointer'>
              <i className='iconoir-share-ios'></i>
              <span>move</span>
            </li>
            <li data-delete={id} onClick={(e) => deleteNote(e, e.currentTarget)} className={"flex gap-x-1 items-center px-2  cursor-pointer " + (deleteSpin && "pointer-events-none")}>
              <i className={deleteSpin ? "iconoir-refresh-double animate-spin" : "iconoir-trash"}></i>
              <span>delete</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// export default React.memo(Note)
