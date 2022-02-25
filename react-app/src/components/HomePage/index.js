import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HomePage.css';
import homeImg1 from '../../images/home-image-1.png';
import homeImg2 from '../../images/home-image-2.png';

function HomePage() {
  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to={`/servers`} />
  }

  return (
    <>
      <div className='home-img-container'>
        <div>
          <div className='home-big-header'>
            <span>SPACE</span> IS EMPTY
          </div>
          <div className='home-small-header'>
            It can get lonely travelling through the vastness of space alone.
          </div>
        </div>
      </div>
      <div className='home-containers-2'>
        <div className='home-text-container'>
          <div className='home-big-header'>
            MAKE IT <span>LESS SO</span>
          </div>
          <div className='home-small-header'>
            Create a Solar System and fill it with Planets that suits your needs.
            Invite your friends to fill the emptiness of space.
          </div>
        </div>
        <div className='home-small-image-1'>
          <img src={homeImg1} alt='space' />
        </div>
      </div>
      <div className='home-containers-1'>
        <div className='home-small-image-2'>
          <img src={homeImg2} alt='space' />
        </div>
        <div className='home-text-container'>
          <div className='home-big-header'>
            CREATE <span>GALAXY-SIZED</span> COMMUNITIES
          </div>
          <div className='home-small-header'>
            With Nebulae it's easy to start and grow your community.
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
