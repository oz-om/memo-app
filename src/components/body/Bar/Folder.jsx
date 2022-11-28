export default function Folder(props) {
  return (
    <li className="bg-orange-100/25 rounded px-4 py-2 cursor-pointer border border-transparent" onClick={props.click}>{props.name}</li>
  )
}