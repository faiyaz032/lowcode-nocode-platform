import React from 'react';
import './dropdown.styles.css';

const DropDown = ({ name, placeholder, label, opt, docs, changeVal, prop }) => {
  const options = [placeholder].concat(opt[0] ? opt : docs);
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        className="dropdown scrollbar"
        placeholder={placeholder}
        name={name}
        onChange={e => {
          changeVal && changeVal(e);
        }}
      >
        {/* <option>Hello</option>
                <option>Hello</option>
                <option>Hello</option>
                <option>Hello</option> */}
        {options.map((txt, i) => {
          const isFirst = i === 0;
          if (typeof txt === 'string')
            return (
              <option defaultValue={isFirst} hidden={isFirst} key={i + 1} value={txt}>
                {txt}
              </option>
            );
          const nameProp = Object.keys(txt).filter(key => key.toLowerCase().includes('name'))[0];
          console.log(nameProp);
          return (
            <option key={i + 1} value={txt._id}>
              {txt[nameProp ? nameProp : prop]}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default DropDown;
