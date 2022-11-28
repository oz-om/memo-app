import Folder from './Bar/Folder'

function active_toggle(e){
  document.querySelector('.all').classList.remove('active');
  document.querySelectorAll('.folders li').forEach(li => {
    li.classList.remove('active')
  })
  e.target.classList.add('active')
}

let folders = [
    {id:1,name:'daily'},
    {id:2,name:'weekend'},
    {id:3,name:'demo'}];

let folder_li = folders.map(folder =>
    <Folder key={folder.id} name={folder.name} click={active_toggle} />)
  
export default function Bar() {
  return (
    <div className="bar p-1 my-3 grid grid-cols-two shadow">
      <ul className="flex gap-x-2">
        <li className="all rounded px-4 py-2 cursor-pointer border border-transparent active" onClick={active_toggle}>All</li>
        <ul className="folders flex overflow-auto">
          {folder_li}
        </ul>
      </ul>
      <span className="flex items-center">
        <i className="iconoir-folder rounded px-4 py-2 font-black text-orange-400 text-xl bg-orange-100/25 cursor-pointer"></i>
      </span>
    </div>
  )
}