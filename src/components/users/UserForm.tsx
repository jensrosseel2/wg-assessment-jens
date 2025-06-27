import { FormProvider, useForm } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../api/index";

interface FormProps {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export default function UserForm() {
  const navigate = useNavigate();

  const methods = useForm<FormProps>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const handleCancel = useCallback(() => {
    navigate({
      pathname: "/users",
    });

    reset();
  }, [reset, navigate]);

  const handleSaveUser = useCallback(
    async (data: FormProps) => {
      const { firstname, lastname, email, role } = data;
      const fullname = firstname + " " + lastname;

      try {
        await saveUser({
          name: fullname,
          email: email,
          role: role,
        });

        reset();
        navigate({
          pathname: "/users",
        });
      } catch (error) {
        console.error("Error saving user:", error);
      }
    },
    [reset, navigate]
  );

  const validationRules = useMemo(
    () => ({
      firstname: {
        required: "First name is required",
      },
      lastname: {
        required: "Last name is required",
      },
      email: {
        required: "Email name is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email address",
        },
      },
      role: {
        required: "Role name is required",
      },
    }),
    []
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSaveUser)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 mb-2 font-bold"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              {...register("firstname", validationRules.firstname)}
              className="w-full text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="grid-first-name"
              type="text"
              disabled={isSubmitting}
            />
            {typeof errors.firstname?.message === "string" && (
              <p className="text-red-500 text-xs">{errors.firstname.message}</p>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              {...register("lastname", validationRules.lastname)}
              className="w-full text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              disabled={isSubmitting}
            />
            {typeof errors.lastname?.message === "string" && (
              <p className="text-red-500 text-xs">{errors.lastname.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", validationRules.email)}
              className="w-full text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="email"
              type="email"
              disabled={isSubmitting}
            />
            {typeof errors.email?.message === "string" && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <input
              {...register("role", validationRules.role)}
              className="w-full text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
              id="role"
              type="text"
              disabled={isSubmitting}
            />
            {typeof errors.role?.message === "string" && (
              <p className="text-red-500 text-xs">{errors.role.message}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="default-btn">
            Save
          </button>
          <button
            type="reset"
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
