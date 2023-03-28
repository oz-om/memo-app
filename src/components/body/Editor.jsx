import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushNote, switchNoteModifyMode, updateNote } from "../../store/reducers";
import axios from "axios";
import {
  //
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
  dataURItoBlob,
} from "./editor/EditorComponents";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { VITE_API_KEY } = process.env;

export default function CreateBlock() {
  //@ts-ignore
  const { noteModifyMode, foldersReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [title, setTitleNote] = useState("");
  const [note, setNote] = useState("");
  const [createSpin, setCreateSpin] = useState(false);
  const [saveSpin, setSaveSpin] = useState(false);
  const [uploadSpin, setUploadSpin] = useState(false);

  let addRequestController;
  async function addNote() {
    setCreateSpin(true);
    if (addRequestController) {
      addRequestController.abort();
      addRequestController = null;
    }

    addRequestController = new AbortController();
    const { signal } = addRequestController;

    let theme = getComputedStyle(document.querySelector(".ql-container.ql-snow .noteTitle"));
    let folder;
    if (!getFolder()) {
      foldersReducer.folders.forEach((f) => {
        if (f.folder == "uncategorized") {
          folder = f.id;
        }
      });
    } else {
      folder = getFolder();
    }

    const Note = {
      title,
      note,
      category_id: +folder,
      bgColor: theme.backgroundColor,
      color: theme.color,
      atTime: `${new Date().toISOString().slice(0, 10)} ${new Date().toLocaleTimeString("ca")}`,
    };

    const options = {
      signal,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const req = await axios.post(`${VITE_API_KEY}/addNote`, Note, options);
    addRequestController = null;
    const res = await req.data;
    if (res.isPush) {
      setCreateSpin(false);
      dispatch(pushNote({ id: res.noteId, ...Note }));
      goBack();
    } else {
      setCreateSpin(false);
      console.log(res.msg);
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

  let editNoteRequestController;
  async function saveChanges() {
    setSaveSpin(true);
    if (editNoteRequestController) {
      editNoteRequestController.abort();
      editNoteRequestController = null;
    }
    let theme = getComputedStyle(document.querySelector(".ql-container.ql-snow .noteTitle"));
    if (checkChanges(title, noteModifyMode.title).isChanged || checkChanges(note, noteModifyMode.note).isChanged) {
      editNoteRequestController = new AbortController();
      const { signal } = editNoteRequestController;
      const Note = {
        noteId: noteModifyMode.id,
        newTitle: title,
        newNote: note,
        bgColor: theme.backgroundColor,
        color: theme.color,
      };
      const options = {
        signal,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const req = await axios.post(`${VITE_API_KEY}/updateNote`, Note, options);
      editNoteRequestController = null;
      const res = await req.data;
      if (res.isUpdate) {
        setSaveSpin(false);
        dispatch(updateNote(Note));
        cancel();
      } else {
        setSaveSpin(false);
        console.log(res.msg);
      }
    }
  }

  useEffect(() => {
    setInputs(noteModifyMode.title, noteModifyMode.note, noteModifyMode.bgColor, noteModifyMode.color);
    setTitleNote(noteModifyMode.title);
    setNote(noteModifyMode.note);
  }, [noteModifyMode.editMode]);

  function loadingEditor() {
    let editorContainer = document.querySelector(".ql-container.ql-snow");

    // add title for note
    let noteTitle = document.createElement("input");
    noteTitle.type = "text";
    noteTitle.placeholder = "title";
    noteTitle.setAttribute("class", "noteTitle w-full outline-none font-black text-lg pl-2 font-mono border border-[#cccccc] border-b-0");
    noteTitle.oninput = function () {
      //@ts-ignore
      setTitleNote(this.value);
      validStyle();
    };
    // editing tool bar
    let toolBar = document.querySelector(".ql-toolbar.ql-snow");
    if (editorContainer) {
      //@ts-ignore
      editorContainer.style.cssText = `
        height: 90%;
        border: none;
      `;
      if (editorContainer.childElementCount == 3) {
        editorContainer.prepend(noteTitle);
        Theme(toolBar);
      }
      let noteContent = document.querySelector(".ql-container.ql-snow .ql-editor");
      noteContent.classList.add("customScroll", "bg-white");
      //@ts-ignore
      noteContent.oninput = function () {
        validStyle();
      };
      noteContent.querySelectorAll("*").forEach((element) => element.setAttribute("dir", "auto"));
    }
  }

  async function uploadGetNewUrl(image) {
    setUploadSpin(true);
    const blob = dataURItoBlob(image.src);
    const newFile = new File([blob.blob], `${new Date().getTime()}`, { type: blob.mimeType });
    let formData = new FormData();
    formData.append("file", newFile);

    let req = await fetch(`${VITE_API_KEY}/upload`, {
      method: "POST",
      body: formData,
    });
    let res = await req.json();
    if (res.upload) {
      setUploadSpin(false);
      return res.imgUrl;
    }
  }

  const modules = {
    toolbar: {
      container: [[{ size: ["small", false, "large", "huge"] }], ["bold", "italic", "underline"], [{ align: "" }, { align: "center" }, { align: "right" }], [{ indent: "-1" }, { indent: "+1" }], [{ list: "ordered" }, { list: "bullet" }], ["image"]],
    },
  };

  return (
    <div className='createBlock absolute top-0 w-full overflow-y-auto bg-slate-100 -right-[100vw] transition-right md:h-full lg:w-4/6 lg:h-full'>
      <div className='container h-full'>
        <div className='noteControls relative flex justify-between items-center border-b border-b-gray-300 mb-2 px-3'>
          {noteModifyMode.editMode ? (
            <>
              <div className='cancelChanges'>
                <i onClick={() => cancelChanges()} className='iconoir-cancel font-black text-3xl cursor-pointer'></i>
              </div>
              <div onClick={() => saveChanges()} className={"saveChanges text-green-200 bg-green-100 border border-green-100 rounded-md text-2xl  py-[2px] px-2 grid place-content-center pointer-events-none " + (saveSpin && "pointer-events-none")}>
                <i className={"px-1 h-6 grid place-content-center " + (saveSpin ? "iconoir-refresh-double animate-spin cursor-no-drop" : "iconoir-double-check")}></i>
              </div>
            </>
          ) : (
            <>
              <div className='back'>
                <i className='iconoir-arrow-left font-black text-3xl cursor-pointer' onClick={() => goBack()}></i>
              </div>
              <div onClick={() => addNote()} className={"text-green-500 bg-green-100 border border-green-300 text-2xl rounded-md py-[2px] px-2 " + (createSpin ? "pointer-events-none" : "cursor-pointer ")}>
                <i className={"px-1 h-6 grid place-content-center" + (createSpin ? " iconoir-refresh-double animate-spin" : " iconoir-send")}></i>
              </div>
            </>
          )}
          {uploadSpin && (
            <div className='uploadPending absolute flex gap-x-2 justify-center items-center w-max mt-5 text-gray-400 text-sm left-2/4 right-2/4 -translate-y-1/2 -translate-x-1/2'>
              <i className='iconoir-refresh animate-spin'></i>
              <p>upload image...</p>
            </div>
          )}
        </div>
        <ReactQuill
          theme='snow'
          modules={modules}
          onLoad={loadingEditor()}
          placeholder={"Write something awesome..."}
          onChange={(content, action) => {
            //@ts-ignore
            let noteEditor = window.noteEditor;

            let event = action.ops.length == 1 ? action.ops[0] : action.ops[1];

            if (event.insert && event.insert.image != undefined) {
              if (noteEditor) {
                let images = noteEditor.querySelectorAll("img");
                images.forEach(async (image, i) => {
                  if (image.getAttribute("data-item") == null) {
                    image.setAttribute("data-item", i + 1);
                    uploadGetNewUrl(image).then((url) => {
                      image.src = url;
                    });
                  }
                });
              }
            }
            setNote(content);
          }}
          className='h-[90%]'
        />
      </div>
    </div>
  );
}
