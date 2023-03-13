import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNote, switchNoteModifyMode, switchSearchMode } from "../../../store/reducers";
import { getCreateBlock, useToggleSearchUI } from "../../../global";
import { useState } from "react";
const { VITE_API_KEY } = process.env;

function toggleOptions(e, show, hide) {
  e.stopPropagation();
  let options = document.querySelectorAll(".Note .options .noteControlsOptions");
  if (show) {
    options.forEach((list) => {
      if (show.nextElementSibling == list) {
        show.nextElementSibling.classList.toggle("h-0");
        show.nextElementSibling.classList.toggle("h-11");
      } else {
        list.classList.add("h-0");
        list.classList.remove("h-11");
      }
    });
  } else {
    options.forEach((list) => {
      if (hide.parentElement == list) {
        hide.parentElement.classList.toggle("h-0");
        hide.parentElement.classList.toggle("h-11");
      } else {
        list.classList.add("h-0");
        list.classList.remove("h-11");
      }
    });
  }
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
  let image = {
    include: false,
    src: "",
  };
  let line_clamp = "line-clamp-5";

  function changeColorOpacity(opacity) {
    let newColor = color.split(")");
    newColor[1] = opacity;
    return newColor.join();
  }

  // check if the note content includes images then change line-clamp
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(note, "text/html");
  const images = htmlDoc.getElementsByTagName("img");
  if (images.length > 0) {
    line_clamp = "line-clamp-3";
    image.include = true;
    image.src = images[0].src;
  }

  // customize note text
  const paragraphs = htmlDoc.getElementsByTagName("p");
  const filteredParagraphs = Array.from(paragraphs).filter((p) => !p.querySelector("img"));
  let shortNote = "";
  for (let i = 0; i < 4; i++) {
    if (!filteredParagraphs[i]) {
      break;
    }
    shortNote += filteredParagraphs[i].innerHTML;
  }

  return (
    <div
      data-name={folder}
      data-edit={id}
      className={"Note p-4 mb-3.5 rounded-lg shadow cursor-pointer relative" /*+ (image.include && "h-72")*/}
      style={{
        backgroundColor: bgColor,
        color,
      }}
      onClick={(e) => editNote(e.currentTarget)}
    >
      <h4 className='font-bold'>{title}</h4>
      {image.include && <img src={image.src} className='max-w-40 max-h-36 rounded'></img>}
      <div
        dangerouslySetInnerHTML={{ __html: shortNote }}
        className={"shortNote whitespace-pre-line " + line_clamp}
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
        <div className='options'>
          <i onClick={(e) => toggleOptions(e, e.target, null)} className='iconoir-more-vert cursor-pointer font-black text-xl rounded'></i>
          <ul className='noteControlsOptions flex justify-between absolute right-0 bottom-0 overflow-hidden transition-height backdrop-blur-md shadow-md rounded-md text-sm w-full border h-0 '>
            <div className='flex flex-wrap'>
              <li data-move={id} onClick={(e) => deleteNote(e.currentTarget)} className='flex gap-x-1 items-center px-2  cursor-pointer'>
                <i className='iconoir-share-ios'></i>
                <span>move</span>
              </li>
              <li data-delete={id} onClick={(e) => deleteNote(e, e.currentTarget)} className={"flex gap-x-1 items-center px-2  cursor-pointer " + (deleteSpin && "pointer-events-none")}>
                <i className={deleteSpin ? "iconoir-refresh-double animate-spin" : "iconoir-trash"}></i>
                <span>delete</span>
              </li>
            </div>
            <i className='iconoir-nav-arrow-down grid place-content-center px-3 cursor-pointer' onClick={(e) => toggleOptions(e, null, e.target)}></i>
          </ul>
        </div>
      </div>
    </div>
  );
}

// export default React.memo(Note)
