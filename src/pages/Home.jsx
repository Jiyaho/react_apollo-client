import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <h1>Apollo Client Hooks</h1>
      <Link to="/query">useQuery</Link>
      <Link to="/lazy-query">useLazyQuery</Link>
      <Link to="/suspense">useSuspense</Link>
      <Link to="/mutation">useMutation</Link>
    </div>
  );
}
export default Home;
