import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushNote, switchNoteModifyMode, updateNote } from "../../store/reducers";
import axios from "axios";
import {
  //
  TextControl,
  textActions,
  TextSize,
  textSizeActions,
  TextFont,
  textFontActions,
  showFonts,
  Theme,
  editorThemeActions,
  showThemes,
  validStyle,
  checkChanges,
  setInputs,
  getFolder,
  goBack,
} from "./editor/EditorComponents";
const { VITE_API_KEY } = process.env;

export default function CreateBlock() {
  //@ts-ignore
  const { userReducer, noteModifyMode } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [title, setTitleNote] = useState("");
  const [note, setNote] = useState("");

  function initIframeDoc(iframe) {
    let editorDoc = iframe.contentDocument;
    editorDoc.oninput = () => {
      validStyle();
      setNote(editorDoc.body.innerHTML);
    };
  }
  async function addNote() {
    let theme = getComputedStyle(document.querySelector(".title input"));
    const Note = {
      ownerId: userReducer.user.id,
      title,
      note,
      folder: getFolder(),
      bgColor: theme.backgroundColor,
      color: theme.color,
      atTime: `${new Date().toLocaleDateString("en-CA")} ${new Date().toLocaleTimeString("ca")}`,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/addNote`, Note, options);
    const res = await req.data;
    if (res.isPush) {
      dispatch(pushNote({ id: res.noteId, ...Note }));
      goBack();
    }
  }

  function cancel() {
    dispatch(switchNoteModifyMode({ editMode: false, title: "", note: "", bgColor: "white", id: null }));
    setNote("");
    setTitleNote("");
    goBack();
  }
  function cancelChanges() {
    let confirmAction;
    if (checkChanges(title, noteModifyMode.title).isChanged || checkChanges(note, noteModifyMode.note).isChanged) {
      confirmAction = confirm("discard changes");
      if (confirmAction) {
        cancel();
      }
    } else {
      cancel();
    }
  }
  async function saveChanges() {
    let theme = getComputedStyle(document.querySelector(".title input"));
    if (checkChanges(title, noteModifyMode.title).isChanged || checkChanges(note, noteModifyMode.note).isChanged) {
      const Note = {
        id: noteModifyMode.id,
        newTitle: checkChanges(title, noteModifyMode.title).inputValue,
        newNote: checkChanges(note, noteModifyMode.note).inputValue,
        bgColor: theme.backgroundColor,
        color: theme.color,
      };
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const req = await axios.post(`${VITE_API_KEY}/updateNote`, Note, options);
      const res = await req.data;
      if (res.isUpdate) {
        dispatch(updateNote(Note));
        cancel();
      }
    }
  }

  useEffect(() => {
    setInputs(noteModifyMode.title, noteModifyMode.note, noteModifyMode.bgColor, noteModifyMode.color);
  }, [noteModifyMode.editMode]);

  return (
    <div className='createBlock absolute top-0 w-full h-full bg-slate-100 -right-[100vw] transition-right'>
      <div className='container'>
        <div className='noteControls flex justify-between items-center border-b border-b-gray-300 mb-2 px-3'>
          {noteModifyMode.editMode ? (
            <>
              <div className='cancelChanges'>
                <i onClick={() => cancelChanges()} className='iconoir-cancel font-black text-3xl cursor-pointer'></i>
              </div>
              <div onClick={() => saveChanges()} className='saveChanges text-green-200 bg-green-100 border border-green-100 rounded-md text-2xl cursor-pointer  py-[2px] px-1 h-6 grid place-content-center pointer-events-none'>
                <i className='iconoir-double-check'></i>
              </div>
            </>
          ) : (
            <>
              <div>
                <i className='iconoir-arrow-left font-black text-3xl cursor-pointer' onClick={() => goBack()}></i>
              </div>
              <div>
                <i className='iconoir-send text-green-500 bg-green-100 border border-green-300 text-2xl rounded-md cursor-pointer py-[2px] px-1 h-6 grid place-content-center' onClick={() => addNote()}></i>
              </div>
            </>
          )}
        </div>
        <div className='noteView text-xl border-b border-b-gray-300 pb-2 grid px-2 gap-x-2'>
          <div className='textControls flex gap-x-4 items-center overflow-x-scroll scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'>
            {textActions.map((action) => {
              const { icon, cmd, group } = action;
              return <TextControl key={cmd} icon={icon} cmd={cmd} group={group} />;
            })}
            {textSizeActions.map((action) => {
              const { icon, cmd, type, group } = action;
              return <TextSize key={type} icon={icon} cmd={cmd} type={type} group={group} />;
            })}
          </div>
          <div className='theme flex justify-center gap-x-5'>
            <div className='fonts relative grid place-content-center'>
              <i onClick={(e) => showFonts(e.target)} className='iconoir-missing-font cursor-pointer border rounded-md'></i>
              <ul className='themeList absolute -right-1/2 bg-gray-200 mt-9 rounded p-1 hidden'>
                {textFontActions.map((action) => {
                  const { name, cmd, type } = action;
                  return <TextFont key={name} name={name} cmd={cmd} type={type} />;
                })}
              </ul>
            </div>
            <div className='themeColor relative grid place-content-center'>
              <i onClick={(e) => showThemes(e.target)} className='iconoir-flower cursor-pointer border rounded-md'></i>
              <ul className='themeList absolute flex-col gap-1 -right-1/2 mt-9 bg-gray-200 p-1 rounded hidden'>
                {editorThemeActions.map((action) => {
                  const { cmd, bgColor, textColor } = action;
                  return <Theme key={bgColor} cmd={cmd} textColor={textColor} bgColor={bgColor} />;
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='noteContent'>
          <div className='title'>
            <input
              type='text'
              placeholder='Title'
              onInput={(e) => {
                validStyle();
                //@ts-ignore
                setTitleNote(e.target.value);
              }}
              className='w-full outline-none font-black text-lg pl-2 py-2'
            />
          </div>
          <div className='note w-full h-'>
            <iframe
              onMouseEnter={(e) => {
                // @ts-ignore
                initIframeDoc(e.target);
              }}
              className='w-full h-full outline-none bg-white'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
