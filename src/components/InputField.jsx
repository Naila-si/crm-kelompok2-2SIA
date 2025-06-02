import React from "react";

const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-[#8B4513] font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-[#DEB887] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D2691E]"
      required
    />
  </div>
);

export default InputField;
