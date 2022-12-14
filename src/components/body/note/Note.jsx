import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNote, switchNoteModifyMode, switchSearchMode } from "../../../store/reducers";
import { getCreateBlock, useToggleSearchUI } from "../../../global";
const { VITE_API_KEY } = process.env;

function toggleOptions(target) {
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
  //@ts-ignore
  const { notesReducer, activatedReducer, searchMode } = useSelector((state) => state);
  const dispatch = useDispatch();

  async function deleteNote(ele) {
    const noteId = ele.dataset.delete;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/deleteNote`, { noteId }, options);
    const res = await req.data;
    if (res.deleted) {
      dispatch(removeNote(+noteId));
    }
  }

  function editNote(edit) {
    if (searchMode) {
      dispatch(switchSearchMode(false));
      let toggleSearchUI = useToggleSearchUI(false, activatedReducer, dispatch, notesReducer);
      toggleSearchUI();
    }
    getCreateBlock();
    const specificNote = notesReducer.filter((note) => {
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
          <ul className='noteControlsOptions absolute -right-4 -top-16 overflow-hidden transition-width backdrop-blur-md shadow-md rounded-md text-sm w-0 '>
            <li data-edit={id} onClick={(e) => editNote(e.currentTarget)} className='flex gap-x-1 items-center px-2  cursor-pointer'>
              <i className='iconoir-edit'></i>
              <span>edit</span>
            </li>
            <li data-move={id} onClick={(e) => deleteNote(e.currentTarget)} className='flex gap-x-1 items-center px-2  cursor-pointer'>
              <i className='iconoir-share-ios'></i>
              <span>move</span>
            </li>
            <li data-delete={id} onClick={(e) => deleteNote(e.currentTarget)} className='flex gap-x-1 items-center px-2  cursor-pointer'>
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
