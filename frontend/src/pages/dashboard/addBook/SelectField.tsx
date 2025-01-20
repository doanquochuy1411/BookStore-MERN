import React from 'react';

interface Option {
    value: string | number; // Giá trị của option
    label: string; // Nhãn hiển thị của option
}

interface SelectFieldProps {
    label: string; // Nhãn của trường select
    name: string; // Tên của trường select
    options: Option[]; // Danh sách các option
    register: any; // Bạn có thể thay thế `any` bằng kiểu dữ liệu cụ thể từ thư viện form (ví dụ: `react-hook-form`)
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, options, register }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <select
                {...register(name, { required: true })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;