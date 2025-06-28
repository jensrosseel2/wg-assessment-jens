import UserForm from "../components/users/UserForm.tsx";

export default function AddOrEditUser() {
  return (
    <div className="container">
      <span className="relative inline-block mb-6">
        <span className="font-bold text-3xl">Add user</span>
        <svg
          className="absolute -bottom-1 left-0 w-full h-2 pointer-events-none"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path
            d="M0,10 C30,0 70,0 100,10"
            stroke="#ff8000"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </span>
      <UserForm />
    </div>
  );
}
