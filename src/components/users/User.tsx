interface UserProps {
  name: string;
  email: string;
  role: string;
}

export default function User({ name, email, role }: UserProps) {
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
    </tr>
  );
}
