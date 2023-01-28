export const Method = (props) => {
  const { name, theme } = props;
  return <li className={"text-white text-center w-40 rounded-md py-2 font-bold cursor-pointer " + theme}>{name}</li>;
};
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
  const { fieldName, type, placeholder, name, method } = props;
  return (
    <div className='mt-5'>
      <label className=''>{fieldName}:</label>
      <input type={type} autoComplete='false' placeholder={placeholder} name={name} onInput={method} className='border-2 border-orange-500/25 rounded-xl outline-none pl-3 py-2 block w-full' />
    </div>
  );
};

export const FormBtn = (props) => {
  const { name, addStyle, loading } = props;
  return (
    <button id={name} className={"text-white w-full flex items-center justify-center font-bold py-2 px-4 bg-orange-200 border-orange-800 border-1 rounded-xl my-5 pointer-events-none " + (loading && " pointer-events-none cursor-no-drop  ") + addStyle}>
      {loading && <span className='iconoir-refresh-double animate-spin mr-2 '></span>}
      <span>{name}</span>
    </button>
  );
};

let allValid = false;
export function isValid(inputsHealth, input, name, value, submit) {
  let inputRequirements = {
    username: /^[a-zA-Z0-9-]{3,}$/,
    email: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/i,
    password: /^(?=.*[!@#\$%^&*])[\S]{6,}$/,
  };

  if (inputRequirements[name].test(value)) {
    input.classList.add("border-1", "border-green-400");
    inputsHealth[name] = true;
  } else {
    input.classList.remove("border-1", "border-green-400");
    inputsHealth[name] = false;
  }

  for (let health in inputsHealth) {
    if (!inputsHealth[health]) {
      allValid = false;
      break;
    }
    allValid = true;
  }
  if (allValid) {
    submit.classList.remove("pointer-events-none", "bg-orange-200");
    submit.classList.add("bg-orange-500");
  } else {
    submit.classList.add("pointer-events-none", "bg-orange-200");
    submit.classList.remove("bg-orange-500");
  }
}
