import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const Input = memo(
  forwardRef(function Input(props, ref) {
    const {
      max,
      name,
      onChange = () => {},
      placeholder,
      type = 'number',
      value: valueProp = '',
    } = props;
    const [value, setValue] = useState(valueProp);
    const isMountRef = useRef(false);
    const timeRef = useRef();

    const handleChange = e => {
      let { value: val } = e.target;
      if (type === 'number') {
        val = val > max ? max : val;
      }
      setValue(val);
    };

    useImperativeHandle(ref, () => ({
      setValue: val => {
        setValue(val);
      },
    }));

    useEffect(() => {
      if (isMountRef.current) {
        clearTimeout(timeRef.current);

        timeRef.current = setTimeout(() => {
          onChange({ name, value });
        }, 500);
      } else {
        isMountRef.current = true;
      }
    }, [name, value, onChange]);

    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        spellCheck={false}
        onChange={handleChange}
      />
    );
  })
);

export default Input;
