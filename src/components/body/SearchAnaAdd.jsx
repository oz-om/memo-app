function getCreateBlock() {
  document.querySelector(".createBlock").classList.toggle("hidden");
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

export default function SearchAndAdd() {
  return (
    <div className='flex gap-x-5 items-center px-2'>
      <div className='search shadow flex items-center w-4/5 mx-auto rounded-xl overflow-hidden'>
        <i className='iconoir-search absolute p-2 text-xl font-black'></i>
        <input type='text' placeholder='search notes' className='pl-8 w-full py-2 border-none outline-none' />
      </div>
      <div className='newNote grid place-content-center'>
        <span className='flex gap-x-2 items-center text-white bg-orange-500 px-2 rounded-md cursor-pointer' onClick={() => getCreateBlock()}>
          <span>new </span>
          <i className='iconoir-add-database-script'></i>
        </span>
      </div>
    </div>
  );
}
