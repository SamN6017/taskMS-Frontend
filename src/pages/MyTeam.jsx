import { useEffect, useState } from "react";
import { getMyTeam } from "../../services/userService";

function MyTeams() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTeam().then(data => {
      setTeam(data); //
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-500 italic">Loading your squad...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Team Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member.id} className="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-sm hover:shadow-md transition">
            <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
            <p className="text-sm text-blue-600 font-medium mb-2">{member.role}</p>
            <p className="text-sm text-slate-500 italic border-t pt-2">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTeams;