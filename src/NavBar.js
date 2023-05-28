import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="NavBar">
        <Link to="/watch-together">Home</Link>
      </div>
    </nav>
  );
}

//&nbsp; <Link to="/watch-together/room">Room</Link>
