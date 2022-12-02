export const Method = (props) => {
  const { name, theme } = props;
  return <li className={"text-white text-center w-40 rounded-md py-2 font-bold cursor-pointer "+theme}>{name}</li>;
}
export const Line = () => {
  return (
    <div className='break-line my-5 flex items-center justify-center'>
      <span className='h-[1.5px] w-40 bg-gray-500'></span>
      <span className='mx-2 text-gray-500'>OR</span>
      <span className='h-[1.5px] w-40 bg-gray-500'></span>
    </div>
  );
};

export const Input = (props) => {
  const { type, fieldName, placeholder, method} = props;
  return (
    <div className="mt-5">
      <label className="">{fieldName}:</label>
      <input type={type} placeholder={placeholder}  className="border-2 border-orange-500/25 rounded-xl outline-none pl-3 py-2 block w-full" onInput={method}/>
    </div>
  );
};

export const FormBtn = (props) => {
  const {name, addStyle} = props
  return (
    <button className={"text-white font-bold py-2 px-4 bg-orange-500 border-orange-800 border-1 rounded-xl my-5 "+addStyle}>{name}</button>
  )
}

