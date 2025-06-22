import UserDetails from './UserDetails';
import './UserCard.css';

// We receive the 'user' object via props.
// Using object destructuring { user } is a clean way to access the prop.
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h2 className="user-name">{user.name}</h2>
      <UserDetails 
        username={user.username} 
        email={user.email} 
        location={user.location} 
      />
    </div>
  );
}

export default UserCard;