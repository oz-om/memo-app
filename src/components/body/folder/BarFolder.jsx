export default function BarFolder(props) {
  return (
    <li data-name={props.name} className='bg-orange-100/25 rounded px-4 py-2 cursor-pointer border border-transparent' onClick={props.click}>
      {props.name}
    </li>
  );
}
