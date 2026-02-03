import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import CreateEmployeeModal from "../../components/CreateEmployeeModal";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    getCurrentUser().then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  const canCreateEmployee =
    profile.role === "CEO" ||
    profile.role === "MANAGER" ||
    profile.role === "TEAM_LEADER";

  return (
    <div>
      <h2>My Profile</h2>
      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Role:</b> {profile.role}</p>

      {canCreateEmployee && (
        <button onClick={() => setShowCreate(true)}>
          + Create Employee
        </button>
      )}

      {showCreate && (
        <CreateEmployeeModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}

export default Profile;
