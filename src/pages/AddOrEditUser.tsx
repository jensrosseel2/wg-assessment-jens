import UserForm from "../components/users/UserForm.tsx";
import { useParams } from "react-router-dom";
import { getUser } from "../api/index.ts";
import AsyncData from "../components/common/AsyncData.tsx";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "../components/common/Modal.tsx";
import DeleteUserModal from "../components/users/DeleteUserModal.tsx";

export default function AddOrEditUser() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["user", Number(id)],
    queryFn: () => getUser(Number(id)),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });

  return (
    <>
      <span className="relative inline-block mb-6">
        <span className="font-bold text-3xl">
          {id ? "Edit user" : "Add user"}
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
      {id ? (
        <button
          onClick={() => setOpenDeleteModal(true)}
          type="button"
          className="float-right delete-btn"
        >
          Delete user
        </button>
      ) : null}
      {id ? (
        <AsyncData isPending={isPending} error={error}>
          <UserForm user={data} />
        </AsyncData>
      ) : (
        <UserForm user={undefined} />
      )}

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DeleteUserModal
          setOpenDeleteModal={setOpenDeleteModal}
          id={Number(id)}
        />
      </Modal>
    </>
  );
}
