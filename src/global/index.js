import { setupNotes } from "../store/reducers";

// initials create block, to create new note
export function getCreateBlock() {
  document.querySelector(".createBlock").classList.toggle("-right-[100vw]");
  document.querySelector(".createBlock").classList.toggle("right-0");

  document.querySelector(".mainBody > .container").classList.toggle("-left-[100vw]");
  document.querySelector(".mainBody > .container").classList.toggle("left-0");
  //@ts-ignore
  if (window.myEditor) {
    //@ts-ignore
    window.myEditor = undefined;
  } else {
    // @ts-ignore
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
}

// get folders block
export function getFoldersBlock() {
  document.querySelector(".foldersBlock").classList.toggle("-right-[100vw]");
  document.querySelector(".foldersBlock").classList.toggle("right-0");
}

// filtering note and setup virtual notes
export function useActivatedFolder(currentFolder, dispatch, notesReducer) {
  function filterNotes() {
    if (currentFolder == "All") {
      dispatch(setupNotes(notesReducer));
    } else {
      let activatedOnly = notesReducer.filter((active) => {
        return active.folder == currentFolder;
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
export function useToggleSearchUI(searchMode, activatedReducer, dispatch, notesReducer) {
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
      let filterNotes = useActivatedFolder(activatedReducer, dispatch, notesReducer);
      filterNotes();
    }
  }
  return toggleUI;
}
