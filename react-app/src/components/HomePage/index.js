import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HomePage.css'

function HomePage() {
  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to={`/servers`} />
  }

  return (
    <>
      <div className='home-img-container'>
        <div>
          SPACE IS EMPTY.
        </div>
        <div>
          It can get lonely travelling through the vastness of space alone.
        </div>
      </div>
      <div className='home-containers-2'>
        <div>
          MAKE IT LESS SO.
        </div>
        <div>
          Create a Solar System and fill it with Planets that suits your needs.
          Invite your friends to fill the emptiness of space.
        </div>
      </div>
      <div className='home-containers-1'>
        <div>
          CREATE GALAXY-SIZED COMMUNITIES
        </div>
        <div>
          With Nebulae it's easy to start and grow your community.
        </div>
      </div>
    </>
  )
}

export default HomePage;
