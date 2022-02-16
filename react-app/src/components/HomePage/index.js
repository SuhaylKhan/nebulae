import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HomePage.css'

function HomePage() {
  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to={`/users/${user.id}/servers`} />
  }

  return (
    <>
      <h1 id='home-page-title'>HOMEPAGE</h1>
    </>
  )
}

export default HomePage;
