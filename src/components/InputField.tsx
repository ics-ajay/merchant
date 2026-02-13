export function InputField({
  label,
  icon,
  register,
  error,
  placeholder,
  value,
  type = "text",
}: any) {
  return (
    <div>
      <label className="mb-2 block font-medium">{label}</label>

      <div className="relative group">
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          {...register}
          className="
            w-full rounded-lg border border-gray-200 bg-white
            py-4 pl-6 pr-10 text-gray-800
            placeholder:text-gray-400 outline-none
            transition-all duration-200
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-500/20
          "
        />

        <span
          className="
          absolute right-4 top-4 text-gray-400
          group-focus-within:text-blue-500 transition
        "
        >
          {icon}
        </span>
      </div>

      {error && (
        <p className="error text-sm text-red-500 mt-1">{label} is required</p>
      )}
    </div>
  );
}
