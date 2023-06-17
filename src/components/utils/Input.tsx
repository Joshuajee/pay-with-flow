import { Dispatch, SetStateAction } from "react";

interface IProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?:string;
    value: any;
    onChange: Dispatch<SetStateAction<any>>;
    onFocus?: Dispatch<SetStateAction<boolean>>;
    helperText?: string;
    min?: number; 
    error?: boolean; 
    type: string;
}

const Input = (props: IProps) => {
    
    const {id, name, label, placeholder, helperText, value, onChange, onFocus, min, error, type} = props
    
    return (
        <div className="mb-2">
            <label className={`block mb-2 text-sm font-medium `}> {label} </label>
            <input 
                name={name} autoComplete="off" min={min} value={value} type={type} 
                onChange={(e) => onChange(e.target.value)}  id={id}  
                onFocus={(e) => onFocus?.(true)} 
                className={`
                bg-white text-black border outline-none text-sm rounded-lg ${error ? "border-red-200": "focus:border-blue-400"}  block w-full p-2.5`} placeholder={placeholder} />
            {error && <p className="my-2 text-xs text-red-400">{helperText}</p>}
        </div>
    )
}

export default Input