import { useField } from "formik";
import DatePicker from "react-datepicker";
import { Form, Label } from "semantic-ui-react";


export default function MyDateInput ({...props}) {
    const [field, meta, helpers] = useField(props.name!);

    const handleChange = (date: Date | null) => {
        helpers.setValue(date);
    }

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={handleChange}
            />
            { meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
