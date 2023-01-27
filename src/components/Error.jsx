export function Error({ msg }) {
  return (
    <span className='text-red-300 text-[12px] my-3 flex items-center gap-0.5'>
      <i className='iconoir-ev-plug-error text-sm'></i>
      {msg}
    </span>
  );
}
