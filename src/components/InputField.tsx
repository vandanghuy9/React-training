type Props = {
  data: {
    type: string;
    id: string;
    value: string;
    name: string;
    placeHolder: string;
    label: string;
  };
};
const InputField = ({ data }: Props) => {
  const { type, id, value, name, placeHolder, label } = data;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        name={name}
        placeholder={placeHolder}
        onChange={() => {}}
        className=" block border border-grey-light w-full p-3 rounded mb-4"
        style={{ overflow: "visible" }}
      ></input>
    </div>
  );
};

export default InputField;
