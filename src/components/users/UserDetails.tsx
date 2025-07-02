import { Link } from "react-router-dom";
import { UserProps } from "./User";
import { useState } from "react";
import Modal from "../common/Modal";
import DeleteUserModal from "./DeleteUserModal";
import { ArrowLeft } from "react-feather";

export default function UserDetails({ user }: { user?: UserProps }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  if (!user) {
    return <>User not found</>;
  }

  const profileImg = `https://randomuser.me/api/portraits/men/${
    (user.id ?? 1) % 100
  }.jpg`;

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <Link to="/users">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center hover:cursor-pointer">
              <ArrowLeft />
              <span className="ml-2">Back</span>
            </button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          <img
            src={profileImg}
            alt="Profile"
            className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-2xl border-2 border-gray-300 shadow-lg object-cover"
          />

          <div className="text-center lg:text-left">
            <span className="relative inline-block mb-4">
              <span className="font-bold text-3xl sm:text-4xl">
                {user.name}
              </span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,10 C30,0 70,0 100,10"
                  stroke="#ff8000"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
            <p className="text-lg text-gray-600 py-1">{user.email}</p>
            <p className="text-lg text-gray-500 italic py-1">{user.role}</p>
          </div>
          <div className="mb-4 flex flex-col sm:flex-row gap-2 lg:ml-auto">
            <Link to={`/users/edit/${user.id}`}>
              <button className="default-btn w-full sm:w-auto">Edit</button>
            </Link>
            <button
              onClick={() => setOpenDeleteModal(true)}
              className="delete-btn w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteUserModal
          setOpenDeleteModal={setOpenDeleteModal}
          id={user.id ?? 0}
        />
      </Modal>
    </>
  );
}
