import axiosRoot from "axios";
import { UserProps } from "../components/users/User";

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

interface UserListProps {
  users: UserProps[];
}

export async function getUsers(
  sortBy?: string,
  order: "asc" | "desc" = "asc"
): Promise<UserListProps> {
  const params = new URLSearchParams();
  if (sortBy) {
    params.append("_sort", sortBy);
    params.append("_order", order);
  }

  const response = await axios.get<UserProps[]>(`/users?${params.toString()}`);
  const users = response.data;

  return { users };
}

export async function getUser(id: number): Promise<UserProps> {
  const response = await axios.get<UserProps>(`/users/${id}`);
  return response.data;
}

export const saveUser = async (body: UserProps) => {
  const { id, ...values } = body;

  await axios({
    method: id ? "put" : "post",
    url: `users/${id || ""}`,
    data: values,
  });
};

export const deleteUser = async (id: number) => {
  await axios.delete(`/users/${id}`);
};
