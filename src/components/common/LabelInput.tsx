import { useFormContext } from "react-hook-form";

interface LabelInputProps {
  label: string;
  name: string;
  type: string;
  validationRules: object;
  defaultValue?: string;
}

export default function LabelInput({
  label,
  name,
  type,
  validationRules,
  ...rest
}: LabelInputProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <>
      <label htmlFor={name} className="block text-gray-700 mb-2 font-bold">
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        disabled={isSubmitting}
        className="w-full text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
        defaultValue={rest.defaultValue || ""}
        {...rest}
      />
      {hasError && typeof errors[name]?.message === "string" ? (
        <div className="text-red-500 text-xs">{errors[name].message}</div>
      ) : null}
    </>
  );
}
