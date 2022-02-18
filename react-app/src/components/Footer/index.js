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
          <div id='about-credit'>
            <a
              href='https://github.com/SuhaylKhan/nebulae'
              target='_blank'
              rel="noreferrer"
            >
              About
            </a>
          </div>
          <div id='footer-techs'>
            <div className='techs-title'>Technologies</div>
            <ul className='techs-list'>
              <li>JavaScript</li>
              <li>ReactJs</li>
              <li>NodeJs</li>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>Python</li>
              <li>Flask</li>
              <li>SQLAlchemy</li>
            </ul>
          </div>
          <div>
            SIGN UP
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
