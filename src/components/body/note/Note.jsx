import axios from "axios";
import { useDispatch } from "react-redux";
import { removeNote } from "../../../store/reducers";

function toggleOptions(e) {
  const optionsList = e.target.nextElementSibling;
  optionsList.classList.toggle("hidden");
}

export default function Note(props) {
  const dispatch = useDispatch();

  async function deleteNote(ele) {
    const noteId = ele.parentElement.id;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await axios.post("http://127.0.0.1:4011/deleteNote", { noteId }, options);
    const res = await req.data;
    if (res.deleted) {
      dispatch(removeNote(+noteId));
    }
  }
  const { id, title, note, atTime, folder } = props;
  return (
    <div datatype={folder} className='Note bg-orange-100/25 p-4 mb-3.5 rounded-lg max-h-48 shadow'>
      <h4 className='font-bold'>{title}</h4>
      <p className='text-black/[.85] line-clamp-5'>{note}</p>
      <div className='details flex justify-between'>
        <span className='text-black/50 text-sm'>{atTime}</span>
        <div className='options relative'>
          <i onClick={(e) => toggleOptions(e)} className='iconoir-more-vert cursor-pointer font-black text-xl bg-orange-100/50 rounded'></i>
          <ul className='noteControlsOptions absolute right-0 backdrop-blur-md shadow-md rounded-md text-sm hidden'>
            <li className='flex gap-x-1 items-center px-2 text-emerald-400 bg-emerald-50 cursor-pointer'>
              <i className='iconoir-edit'></i>
              <span>edit</span>
            </li>
            <li id={id} onClick={(e) => deleteNote(e.target)} className='flex gap-x-1 items-center px-2 text-red-400 bg-red-50 cursor-pointer'>
              <i className='iconoir-trash'></i>
              <span>delete</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
