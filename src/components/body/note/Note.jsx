export default function Note(props) {
  return (
    <div className="Note bg-orange-100/25 p-4 mb-3.5 rounded-lg max-h-48 shadow">
      <h4 className="font-bold">{props.title}</h4>
      <p className="text-black/[.85] line-clamp-5">{props.note}</p>
      <div className="details flex justify-between">
        <span className="text-black/50 text-sm">10:02</span>
        <ul>
          <li><i className="iconoir-more-vert cursor-pointer font-black text-xl bg-orange-100/50 rounded"></i></li>
        </ul>
      </div>
    </div>
  )
}
