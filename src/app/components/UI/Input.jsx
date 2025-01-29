const InputField = ({ id, type, label, value, onChange, placeholder }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );