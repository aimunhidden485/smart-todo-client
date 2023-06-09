import React from "react";

const Input = ({ id, label, type = "text", disabled,  required, register, errors, min, defaultValue }) => {
	return (
		<div className="w-full relative">
		
			<input 
            id={id} 
            defaultValue={defaultValue}
            type={type}
            {...register(id, { required })} 
            placeholder=" "
            disabled={disabled} 
            min={min}
            className={`
            peer
            w-full
            p-4
            pt-6
            font-medium
            text-slate-800
            bg-transparent
            border-s-8
            border-cyan-500
            rounded-md
            outline-none
            transition
            duration-150
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-rose-500' : 'border-cyan-800'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            `}
            />
            <label className={`absolute duration-200 transform -translate-y-3  top-5 left-0 pl-4 $origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
            ${errors[id]? 'text-rose-500': 'text-zinc-500'}
            `}>{label}</label>
		</div>
	);
};

export default Input;