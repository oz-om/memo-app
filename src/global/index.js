import { setupNotes } from "../store/reducers";

// initials create block, to create new note
export function getCreateBlock() {
  document.querySelector(".createBlock").classList.toggle("-right-[100vw]");
  document.querySelector(".createBlock").classList.toggle("right-0");

  document.querySelector(".mainBody > .container").classList.toggle("-left-[100vw]");
  document.querySelector(".mainBody > .container").classList.toggle("left-0");

  let NoteEditor = document.querySelector(".createBlock .noteContent .note > div");
  // @ts-ignore
  placeCaretAtEnd(NoteEditor);
}
export function placeCaretAtEnd(NoteEditor) {
  // NoteEditor.focus();
  // if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
  //   var range = document.createRange();
  //   range.selectNodeContents(NoteEditor);
  //   range.collapse(false);
  //   var sel = window.getSelection();
  //   sel.removeAllRanges();
  //   sel.addRange(range);
  //   // @ts-ignore
  // } else if (typeof document.body.createTextRange != "undefined") {
  //   // @ts-ignore
  //   var textRange = document.body.createTextRange();
  //   textRange.moveToElementText(NoteEditor);
  //   textRange.collapse(false);
  //   textRange.select();
  // }
}
// get folders block
export function getFoldersBlock() {
  document.querySelector(".foldersBlock").classList.toggle("right-[100vw]");
  document.querySelector(".foldersBlock").classList.toggle("right-0");
}

// filtering note and setup virtual notes
export function useActivatedFolder(currentFolder, dispatch, notes) {
  function filterNotes() {
    if (currentFolder == 0) {
      dispatch(setupNotes(notes));
    } else {
      let activatedOnly = notes.filter((active) => {
        return active.category_id == currentFolder;
      });
      dispatch(setupNotes(activatedOnly));
    }
  }
  return filterNotes;
}

// toggle search mode ui and ux
export function resetFocus(reset) {
  let resetBtn = document.querySelector(".search .resetInput");
  if (reset) {
    resetBtn.classList.remove("text-gray-500");
    resetBtn.classList.add("text-gray-300", "pointer-events-none");
    document.querySelector(".mainBody .notes").classList.remove("relative", "top-4");
  } else {
    resetBtn.classList.add("text-gray-500");
    resetBtn.classList.remove("text-gray-300", "pointer-events-none");
    document.querySelector(".mainBody .notes").classList.add("relative", "top-4");
  }
}
export function useToggleSearchUI(searchMode, activatedReducer, dispatch, notes) {
  function toggleUI() {
    if (searchMode) {
      document.querySelector(".search").classList.add("z-[1]");
      document.querySelector(".newNote").classList.add("hidden");
      document.querySelector(".mainBody .bar").classList.add("hidden");
    } else {
      document.querySelector(".search").classList.remove("z-[1]");
      document.querySelector(".newNote").classList.remove("hidden");
      document.querySelector(".mainBody .bar").classList.remove("hidden");
      resetFocus(true);
      //@ts-ignore
      document.querySelector(".search input").value = "";
      let filterNotes = useActivatedFolder(activatedReducer, dispatch, notes);
      filterNotes();
    }
  }
  return toggleUI;
}

// simulate slow connection
export function wait(time) {
  return new Promise((resolve) => {
    setInterval(resolve, time);
  });
}
