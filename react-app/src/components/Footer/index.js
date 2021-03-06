import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <>
      <div id='footer-container'>
        <div id='footer-inner-container'>
          <div className='footer-div-1'>
            <div>
              <div className='footer-tagline'>
                <div>SPACE IS EMPTY.</div>
                <div>MAKE IT LESS SO.</div>
              </div>
              <div className='footer-icons'>
                <a
                  href='https://www.linkedin.com/in/suhayl-khan-48601a193/'
                  target='_blank'
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href='https://github.com/SuhaylKhan'
                  target='_blank'
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faGithubSquare} />
                </a>
              </div>
              <div id='footer-copyright'>Copyright © 2022 Nebulae by Suhayl Khan</div>
            </div>
          </div>
          <div id='footer-techs'>
            <div className='techs-title'>Technologies</div>
            <ul className='techs-list'>
              <li>JavaScript</li>
              <li>ReactJS</li>
              <li>NodeJS</li>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>Python</li>
              <li>Flask</li>
              <li>SQLAlchemy</li>
            </ul>
          </div>
          <div id='about-credit'>
            <a
              href='https://github.com/SuhaylKhan/nebulae'
              target='_blank'
              rel="noreferrer"
            >
              About
            </a>
            <p>
              Nebulae is a website inspired by Discord, and my love for space,
              that utilizes primarily ReactJS for the frontend and Flask for the backend.
            </p>
          </div>
          <div>
            <div id='footer-signup' className='nav-bar-navlink login-signup'>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign up
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
