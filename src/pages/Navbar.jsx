function Navbar({ role }) {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">LMS</h1>

      <div>
        <span className="mr-4">{role}</span>

        <button
          className="bg-red-500 px-3 py-1 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;