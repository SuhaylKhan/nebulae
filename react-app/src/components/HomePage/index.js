import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function HomePage() {
  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to='/servers' />
  }

  return (
    <>
      <h1>HOMEPAGE</h1>
    </>
  )
}

export default HomePage;
