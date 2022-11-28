export function Method(props) {
  const { name, theme } = props;
  return <li className={theme}>{name}</li>;
}
export const Line = () => {
  return <span className='h-1 w-2/3 bg-gray-500'></span>;
};

export const Input = (props) => {
  const { type, fieldName, placeholder } = props;
  return (
    <div>
      <label>{fieldName}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
};
