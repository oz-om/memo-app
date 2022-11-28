import {Link} from 'react-router-dom';

export default function Logo() {
  return (
    <div className="logo basis-auto flex items-center gap-x-1">
      {/* <img src="https://svgshare.com/i/nj3.svg" alt="logo" className="w-6 h-6"/> */}
      <Link to="/" className="font-cur text-3xl text-gray-700 font-black">
        Mem<span className="text-orange-300">Ouz</span>
      </Link>
    </div>
  )
}