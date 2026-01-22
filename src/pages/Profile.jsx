function Profile() {
  // fake user data for now
  const user = {
    name: "Sam",
    email: "sam@gmail.com",
    role: "USER",
  };

  return (
    <div>
      <h2>User Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default Profile;
