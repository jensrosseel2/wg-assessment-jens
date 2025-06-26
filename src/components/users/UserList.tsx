import User from "./User";
import { UserProps } from "./User";

interface UserListProps {
  users: UserProps[];
}

export default function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <div>No users found.</div>;
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-s text-white uppercase bg-[#ff8000]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User {...user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
