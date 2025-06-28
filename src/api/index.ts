import axiosRoot from "axios";
import { UserProps } from "../components/users/User";

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

interface UserListProps {
  users: UserProps[];
}

export async function getUsers(): Promise<UserListProps> {
  const response = await axios.get<UserProps[]>("/users");
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
