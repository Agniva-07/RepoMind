import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <div className="not-found__card">
        <div className="not-found__number" aria-hidden="true">404</div>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__desc">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/')}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
