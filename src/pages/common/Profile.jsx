import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import CreateEmployeeModal from "../../components/CreateEmployeeModal";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    getCurrentUser().then(setProfile);
  }, []);

  if (!profile) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse text-slate-400">Loading profile...</div>
    </div>
  );

  const canCreateEmployee =
    profile.role === "CEO" ||
    profile.role === "MANAGER" ||
    profile.role === "TEAM_LEADER";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-3xl font-bold text-white border border-white/30">
              {profile.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">{profile.name}</h2>
              <span className="inline-block mt-1 px-3 py-1 bg-black/20 text-blue-100 text-xs font-bold rounded-full uppercase tracking-widest border border-white/10">
                {profile.role}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-slate-500 text-sm font-semibold uppercase">Email Address</p>
              <p className="text-lg text-slate-200">{profile.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 text-sm font-semibold uppercase">Account Status</p>
              <p className="text-lg text-green-400 flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span> Active
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
            {canCreateEmployee && (
              <button 
                onClick={() => setShowCreate(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-blue-900/20 active:scale-95"
              >
                + Create Employee
              </button>
            )}
          </div>
        </div>
      </div>

      {showCreate && (
        <CreateEmployeeModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}

export default Profile;