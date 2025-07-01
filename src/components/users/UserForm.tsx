import { FormProvider, useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../api/index";
import LoadingIndicator from "../common/LoadingIndicator";
import LabelInput from "../common/LabelInput";
import { UserProps } from "./User";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface FormProps {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export default function UserForm({ user }: { user?: UserProps }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const methods = useForm<FormProps>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
  } = methods;

  const handleCancel = useCallback(() => {
    navigate({
      pathname: "/users",
    });

    reset();
  }, [reset, navigate]);

  const saveUserMutation = useMutation({
    mutationFn: (data: FormProps) =>
      saveUser({
        id: user?.id,
        name: `${data.firstname} ${data.lastname}`,
        email: data.email,
        role: data.role,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      navigate({ pathname: "/users" });
    },
    onError: (error) => {
      console.error("Error saving user:", error);
    },
  });

  const handleSaveUser = useCallback(
    async (data: FormProps) => {
      saveUserMutation.mutate(data);
    },
    [saveUserMutation]
  );

  useEffect(() => {
    if (user) {
      const firstname = user.name.split(" ")[0] || "";
      const lastname = user.name.split(" ").slice(1).join(" ") || "";

      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("email", user.email);
      setValue("role", user.role);
    } else {
      reset();
    }
  }, [user, reset, setValue]);

  const validationRules = useMemo(
    () => ({
      firstname: {
        required: "First name is required",
      },
      lastname: {
        required: "Last name is required",
      },
      email: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email address",
        },
      },
      role: {
        required: "Role is required",
      },
    }),
    []
  );

  const userRoleOptions = useMemo(
    () => [{ value: "Admin" }, { value: "Power User" }, { value: "User" }],
    []
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSaveUser)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <LabelInput
              label="First Name"
              name="firstname"
              type="text"
              validationRules={validationRules.firstname}
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <LabelInput
              label="Last Name"
              name="lastname"
              type="text"
              validationRules={validationRules.lastname}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <LabelInput
              label="Email"
              name="email"
              type="email"
              validationRules={validationRules.email}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              htmlFor="role"
              className="block text-gray-700 mb-2 font-bold"
            >
              Role
            </label>
            <select
              {...register("role", validationRules.role)}
              className="w-full text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-white focus:border-gray-500"
            >
              {userRoleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
            {errors.role && (
              <div className="text-red-500 text-xs">{errors.role.message}</div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="default-btn">
            {saveUserMutation.isPending ? <LoadingIndicator /> : "Save"}
          </button>
          <button
            type="reset"
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
