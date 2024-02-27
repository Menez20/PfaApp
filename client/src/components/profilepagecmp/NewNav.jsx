import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const Name = user ? `${user.firstName} ` : "";
  console.log(Name);
  console.log(user.profilePicture);

  const imagePath = `http://localhost:3001/assets/${user.profilePicture}`;

  console.log(imagePath);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-zinc-100 shadow-[#00df9a] drop-shadow-lg  ">
      <div className="flex-1">
        <span className="w-full text-xl font-bold text-[#00df9a] ml-8">
          LAWISOR
        </span>
      </div>
      <div className="flex-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered border-slate-900  w-full max-w-xs bg-slate-50 text-black placeholder:text-black"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </label>
          <div
            tabIndex={2}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body bg-[#ffffff] rounded-xl">
              <span className="font-bold text-sm text-black">
                {"+2 Notification"}
              </span>
              <span className="text-info">New Message</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block bg-black text-sm text-white">
                  Open Inbox
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="typoghrapgy">
          <p className="px-4">
            Hi, <span className="capitalize">{Name}</span>
          </p>
        </div>

        <div className="dropdown dropdown-end ">
          <label tabIndex={3} className="btn btn-ghost btn-circle avatar mr-8">
            <div className="w-10 rounded-full border-solid">
              <img src={imagePath} alt="PIC" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  w-52 bg-[#ffffff] rounded-xl text-black"
          >
            <li className="">
              <a href="/" className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a href="/">Settings</a>
            </li>
            <li>
              <a href="/login" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
