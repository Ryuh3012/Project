import React from 'react';

export const Select = ({ label, ...rest}) => {
    return (
        <div>
            <label htmlFor="gender">{label}</label>
            <select
                className='w-full border-[1px] border-[#C4CEDC] px-5 py-2 rounded-[5px]'
                {...rest}>
                <option {...rest}>{}</option>
            </select>
        </div>
    );
}

