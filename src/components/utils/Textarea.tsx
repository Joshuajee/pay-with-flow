import { Dispatch, SetStateAction } from "react";

interface IProps {
    id: string;
    name: string;
    label?: string;
    placeholder?:string;
    value: any;
    onChange: Dispatch<SetStateAction<any>>;
    onFocus?: Dispatch<SetStateAction<boolean>>;
    helperText?: string;
    error?: boolean; 
    height?: string
}

const Textarea = (props: IProps) => {

    const {id, name, label, height, placeholder, helperText, value, onChange, onFocus, error } = props
    
    return (
        <div className="mb-2">
            <label className="block mb-2 text-sm font-medium"> { label} </label>
            <textarea 
                
                name={name} value={value} onFocus={() => onFocus?.(true)}  
                onChange={(e) => onChange(e.target.value)}  id={id} 
                className={`
                    bg-white border outline-none text-sm rounded-lg focus:ring-blue-400 
                    ${error ? "border-red-200": "focus:border-blue-400"} focus:border-blue-400 block w-full p-2.5 resize-none h-28
                `} 
                style={{height}}
                placeholder={placeholder} > </textarea>
            {error && <p className="my-2 text-xs text-red-500">{helperText}</p>}
        </div>
    )
}

export default Textarea