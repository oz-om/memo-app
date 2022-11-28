export default function Search() {
  return (
    <div className="search shadow flex items-center w-4/5 mx-auto rounded-xl overflow-hidden mt-2">
      <i className="iconoir-search absolute p-2 text-xl font-black"></i>
      <input type="text" placeholder="search notes" className="pl-8 w-full py-2 border-none outline-none"/>
    </div>
  )
}