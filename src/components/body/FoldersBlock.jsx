import { useSelector, useDispatch } from "react-redux";
import Folder from "./folder/Folder";
import { switchModifyMode, updateActivated } from "../../store/reducers";
import { useEffect } from "react";

function goBack() {
  document.querySelector(".foldersBlock").classList.toggle("hidden");
}

export default function FoldersBlock() {
  //@ts-ignore
  const { foldersReducer, folderModifyMode, activatedReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  function activeFolder(item) {
    let folder = item.parentElement;
    const AllFolders = document.querySelectorAll(".foldersContainer .folder");
    AllFolders.forEach((folder) => {
      folder.classList.remove("activatedFolder");
    });
    folder.classList.add("activatedFolder");
    dispatch(updateActivated(folder.dataset.name));
    document.querySelector(".foldersBlock").classList.toggle("hidden");
  }
  function autoActiveFolder() {
    let allFolders = Array.from(document.querySelectorAll(".foldersContainer .folder"));
    allFolders.forEach((folder) => {
      //@ts-ignore
      if (folder.dataset.name == activatedReducer) {
        folder.classList.add("activatedFolder");
      } else {
        folder.classList.remove("activatedFolder");
      }
    });
  }
  useEffect(() => {
    if (foldersReducer.length > 0) {
      autoActiveFolder();
    }
  }, [activatedReducer]);

  const initFolders = foldersReducer.map((folder) => <Folder key={folder} name={folder} itemsCount='10' modifyMode={false} method={activeFolder} />);
  return (
    <div className='foldersBlock absolute top-0 w-full h-full bg-white hidden'>
      <div className='bar py-1 mb-2 shadow-md relative'>
        <div className='basis-1/5 ml-2 text-xl cursor-pointer'>
          <i className='iconoir-reply' onClick={() => goBack()}></i>
        </div>
        <h2 className='basis-10/12 text-center font-bold absolute  w-40 translate-x-[50%] right-[50%] top-0'>folders</h2>
      </div>
      <div style={{ height: "calc(100vh - 163px)" }} className='foldersContainer overflow-y-scroll scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-100/25 scrollbar-thumb-rounded-md scrollbar-track-rounded-sm'>
        <div data-name='All' className='folder  bg-gray-100 border mx-2 mb-1 rounded-md cursor-pointer hover:bg-orange-50 activatedFolder'>
          <div
            onClick={(e) => {
              activeFolder(e.currentTarget);
            }}
            className='info flex items-center gap-x-1 px-2 py-2'
          >
            <span className='text-[12px]'>122</span>
            <h2 className='text-lg font-black px-2'>All</h2>
          </div>
        </div>
        {folderModifyMode && (
          <Folder
            modifyMode={folderModifyMode}
            method={(e) => {
              activeFolder(e.currentTarget);
            }}
          />
        )}
        {initFolders}
      </div>
      <div onClick={() => dispatch(switchModifyMode(true))} className='createNewFolder absolute bottom-0 w-full cursor-pointer py-3 bg-orange-100 text-orange-500 grid place-content-center'>
        <i className='iconoir-add-folder mx-auto text-2xl'></i>
        <span className='text-[11px] font-bold pl-3'>New Folder</span>
      </div>
    </div>
  );
}
