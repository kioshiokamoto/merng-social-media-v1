
import {useState} from 'react'

export const useForm = (callback, initialState = {})=>{

    const [value, setValue] = useState(initialState);
    const onChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		});
	};
    const onSubmit = e=>{
        e.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        value
    }
}