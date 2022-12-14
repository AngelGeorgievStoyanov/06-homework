import TextField from '@mui/material/TextField';
import { Control, Controller, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface FormInputTextProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    control: Control<TFieldValues, any>;
    label: string;
    rules?: Omit<RegisterOptions<TFieldValues, FieldPath<TFieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    disabled?: boolean;
    size?: 'small' | 'medium';
    error?: string | undefined;
    type?:'text' | 'password';
    
}


function FormInputText<TFieldValues extends FieldValues>(
    { name, control, label, rules = {}, disabled = false, size = 'medium', error=undefined ,type='text'}: FormInputTextProps<TFieldValues>) {
    return (
        (
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <TextField label={label} disabled={disabled} size={size} error={!!error} 
                     helperText={error || ''} type={type} {...field} />
                }
                rules={rules}
            />
        )
    )
}

export default FormInputText