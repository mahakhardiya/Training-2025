import './UserDetails.css';

// We receive individual details via props.
// Destructuring them in the function signature makes the code cleaner.
function UserDetails({ username, email, location }) {
  return (
    <div className="user-details">
      <p><strong>Username:</strong> @{username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Location:</strong> {location}</p>
    </div>
  );
}

export default UserDetails;