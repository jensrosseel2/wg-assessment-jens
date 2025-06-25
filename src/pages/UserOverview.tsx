import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/index.ts";
import UserList from "../components/users/UserList.tsx";

export default function UserOverview() {
  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 2 * 60 * 1000,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <h1>Users</h1>
      <UserList users={data.users} />
    </>
  );
}
