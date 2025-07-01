import { Trash2 } from "react-feather";
import LoadingIndicator from "../common/LoadingIndicator";
import { deleteUser } from "../../api/index.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function DeleteUserModal({
  id,
  setOpenDeleteModal,
}: {
  id: number;
  setOpenDeleteModal: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(Number(id)),
    onSuccess: () => {
      setOpenDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate({ pathname: "/users" });
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  if (deleteUserMutation.isPending) {
    return (
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <LoadingIndicator />
          <h3 className="text-lg font-black text-gray-800 py-3">
            Deleting User...
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="text-center w-56">
      <div className="mx-auto my-4 w-48">
        <Trash2 size={56} className="mx-auto text-red-500" />
        <h3 className="text-lg font-black text-gray-800 py-3">
          Confirm Delete
        </h3>
        <p className="text-gray-500">
          Are you sure you want to delete this user?
        </p>
      </div>
      <div className="flex gap-4 pt-2">
        <button
          onClick={handleDeleteUser}
          disabled={deleteUserMutation.isPending}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={() => setOpenDeleteModal(false)}
          disabled={deleteUserMutation.isPending}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
