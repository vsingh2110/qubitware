import { useState } from 'react';

const useForm = (initialValues: Record<string, any>) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (callback: () => void) => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validate form values here and set errors if needed
        // If no errors, call the callback
        if (Object.keys(errors).length === 0) {
            callback();
        }
    };

    const setFieldError = (field: string, message: string) => {
        setErrors({
            ...errors,
            [field]: message,
        });
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldError,
    };
};

export default useForm;