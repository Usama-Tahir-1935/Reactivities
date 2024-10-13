import React from 'react';
import { useField } from 'formik';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Label } from 'semantic-ui-react';

interface Props {
    name: string; // Ensure name is passed
    [key: string]: any; // Allow additional props to be passed
}

export default function MyDateInput({ name, ...props }: Props) {
    const [field, meta, helpers] = useField(name); // Explicitly pass name to useField

    return (
        <div>
            <ReactDatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null} // Ensure the correct type for selected value
                onChange={value => helpers.setValue(value)} // Update Formik value
                onBlur={() => helpers.setTouched(true)} // Ensure Formik knows when input is blurred
            />
             { meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </div>
    );
}
