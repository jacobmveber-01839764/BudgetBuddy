import React from "react";

const FormInputGroup = ({text, placeholder, value, onInput}) => {
    return (
        <div className="input-group mt-3">
            <label className="input-group-text">{text}</label>
            <input type="number" className="form-control" placeholder={placeholder} value={value} onInput={onInput} />
        </div>
    )
};

export default FormInputGroup;