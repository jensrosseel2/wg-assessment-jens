const baseUrl = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: User[];
}

export async function getUsers(): Promise<UserListProps> {
  const response = await fetch(`${baseUrl}/users`);
  const users = await response.json();

  return { users };
}
