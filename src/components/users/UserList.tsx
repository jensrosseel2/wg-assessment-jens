import User from "./User";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <div>No users found.</div>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User name={user.name} email={user.email} role={user.role} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
