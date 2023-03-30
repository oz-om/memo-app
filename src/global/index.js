import axios from "axios";
import { setupNotes } from "../store/reducers";
const { VITE_API_KEY } = process.env;

// initials create block, to create new note
export function getCreateBlock() {
  document.querySelector(".createBlock").classList.toggle("-right-[100vw]");
  document.querySelector(".createBlock").classList.toggle("right-0");

  document.querySelector(".mainBody > .container").classList.toggle("-left-[100vw]");
  document.querySelector(".mainBody > .container").classList.toggle("left-0");
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

// logout
export async function logoutACtion() {
  const req = await axios.get(`${VITE_API_KEY}/logout`, { withCredentials: true });
  const res = await req.data;
  return res;
}
// simulate slow connection
export function wait(time) {
  return new Promise((resolve) => {
    setInterval(resolve, time);
  });
}
