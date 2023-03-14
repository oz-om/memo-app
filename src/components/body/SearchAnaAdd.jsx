import { useSelector, useDispatch } from "react-redux";
import { setupNotes, switchSearchMode } from "../../store/reducers";
import { getCreateBlock, resetFocus, useToggleSearchUI } from "../../global";

export default function SearchAndAdd() {
  //@ts-ignore
  const { notesReducer, activatedReducer, searchMode } = useSelector((state) => state);
  const dispatch = useDispatch();

  function toggleSearchMode(state) {
    dispatch(switchSearchMode(state));
    let toggleSearchUI = useToggleSearchUI(state, activatedReducer, dispatch, notesReducer.notes);
    toggleSearchUI();
  }
  function search(target) {
    resetFocus(false);
    let value = target.value;
    if (!value.length) {
      resetFocus(true);
      dispatch(setupNotes(notesReducer.notes));
    } else {
      let result = notesReducer.notes.filter((n) => {
        let title = n.title,
          note = n.note;
        return title.includes(value) || note.includes(value);
      });
      if (result.length) {
        dispatch(setupNotes(result));
      }
    }
  }
  function resetSearchInput() {
    let inputSearch = document.querySelector(".search > input");
    //@ts-ignore
    inputSearch.value = "";
    resetFocus(true);
    dispatch(setupNotes(notesReducer.notes));
  }

  return (
    <div className='flex gap-x-5 items-center px-2'>
      <div className='search shadow flex items-center w-4/5 mx-auto rounded-xl overflow-hidden relative'>
        <i className='iconoir-search absolute p-2 text-xl font-black'></i>
        <input onInput={(e) => search(e.target)} onFocus={(e) => toggleSearchMode(true)} type='text' placeholder='search notes' className='pl-8 w-full py-2 border-none outline-none' />
        <i
          onClick={() => {
            resetSearchInput();
          }}
          className='resetInput iconoir-cancel absolute p-2 text-xl font-black cursor-pointer right-0 text-gray-300 pointer-events-none'
        ></i>
      </div>
      <div className='newNote grid place-content-center'>
        <span onClick={() => getCreateBlock()} className='flex gap-x-2 items-center text-white bg-orange-500 px-2 rounded-md cursor-pointer'>
          <span>new </span>
          <i className='iconoir-add-database-script'></i>
        </span>
      </div>
      {searchMode && (
        <div onClick={() => toggleSearchMode(false)} className='z-[1] text-sky-50 rounded-md border-sky-50 border px-2 cursor-pointer'>
          <span>cancel</span>
        </div>
      )}
      {searchMode && <div className='fixed w-full h-full bg-black/50 left-0 bottom-0'></div>}
    </div>
  );
}
