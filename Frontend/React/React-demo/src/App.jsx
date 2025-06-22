import UserCard from './UserCard';
import './App.css'

function App() {

  const user = {
    name: 'Mahak Hardiya',
    username: 'mahakhardiya',
    email: 'mahakhardiya@gmail.com',
    location: 'Indore, India',
  };

  return (
    <>
    <div className="App">
      <h1 style={{ color: '#333' }}>User Profile Card System</h1>
      <UserCard user={user} />
    </div>
    </>
  )
}

export default App
