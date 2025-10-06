import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Page Not Found</p>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;
