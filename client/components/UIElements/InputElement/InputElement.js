const InputElement = ({
  label,
  inputType,
  value,
  placeholder,
  name,
  insertFunc,
}) => {
  return (
    <div className={'input-element-main'}>
      <small className={'white-color'}>* {label}</small>
      <input
        type={inputType}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={insertFunc}
        className={'input'}
      />
    </div>
  );
};

export default InputElement;
