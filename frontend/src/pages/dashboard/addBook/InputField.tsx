import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    register: any; // You might want to replace 'any' with a more specific type based on your form library
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = 'text', register, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <input
                type={type}
                {...register(name, { required: true })}
                className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;