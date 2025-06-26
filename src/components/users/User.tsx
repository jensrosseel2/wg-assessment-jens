export interface UserProps {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function User({ name, email, role }: UserProps) {
  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
        {name}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{role}</td>
      <td className="px-6 py-4 text-right">
        <a href="#" className="font-semibold hover:underline">
          Edit
        </a>
      </td>
    </tr>
  );
}
