import { useEffect, useState } from "react";
import { getMyTeam } from "../../services/userService";

function MyTeams() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTeam().then(data => {
      setTeam(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading team hierarchy...</p>;

  return (
    <div>
      <h2>My Team Hierarchy</h2>
      <ul>
        {team.map(member => (
          <li key={member.id}>
            {member.name} - <strong>{member.role}</strong> ({member.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTeams;