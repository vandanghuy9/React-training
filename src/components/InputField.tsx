import { Props } from "../data/data";
const InputField = (props: Props) => {
  const { type, id, value, name, placeHolder, label, handleChange } = props;
  return (
    <div className="flex flex-row ">
      <label htmlFor={name} className="w-40 pl-5">
        {label}
      </label>
      <input
        className="px-2 border-solid border-black-100 border-[1px] rounded-md bg-gray-300"
        name={name}
        type={type}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default InputField;
