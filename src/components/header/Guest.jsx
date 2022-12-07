import { Link } from "react-router-dom";

export default function Guest() {
  return (
    <ul className='flex justify-end basis-1/4 gap-x-3'>
      <li>
        <Link to='/sign-in'>
          <i className='iconoir-add-user text-2xl font-bold'></i>
        </Link>
      </li>
      <li>
        <Link to='/log-in'>
          <i className='iconoir-log-in text-2xl font-bold'></i>
        </Link>
      </li>
    </ul>
  );
}
