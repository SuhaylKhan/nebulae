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
      <div className='home-img-container'>
        HOMEPAGE AND WHATNOT
      </div>
      <div className='home-containers-2'>
        INFO USE MY SITE PLEASE
      </div>
      <div className='home-containers-1'>
        INFO USE MY SITE PLEASE
      </div>
      <div className='home-containers-2'>
        INFO USE MY SITE PLEASE
      </div>
      <div className='home-containers-1'>
        INFO USE MY SITE PLEASE
      </div>
    </>
  )
}

export default HomePage;
