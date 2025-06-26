import { UserProps } from "../components/users/User";

const baseUrl = import.meta.env.VITE_API_URL;

interface UserListProps {
  users: UserProps[];
}

export async function getUsers(): Promise<UserListProps> {
  const response = await fetch(`${baseUrl}/users`);
  const users = await response.json();

  return { users };
}
