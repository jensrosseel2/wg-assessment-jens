import { Edit2, Trash2 } from "react-feather";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../common/Modal";
import DeleteUserModal from "./DeleteUserModal";

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  role: string;
}

export default function User({ id, name, email, role }: UserProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
        <Link to={`/users/${id}`}>
          <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
            {name}
          </th>
        </Link>

        <td className="px-6 py-4">{email}</td>
        <td className="px-6 py-4">{role}</td>
        <td className="px-6 py-4 text-right">
          <div className="flex justify-end items-center space-x-4">
            <Link to={`/users/edit/${id}`}>
              <Edit2 className="text-[#ff8000] hover:cursor-pointer" />
            </Link>
            <Trash2
              className="text-red-600 hover:cursor-pointer"
              onClick={() => setOpenDeleteModal(true)}
            />
          </div>
        </td>
      </tr>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteUserModal setOpenDeleteModal={setOpenDeleteModal} id={id ?? 0} />
      </Modal>
    </>
  );
}
