import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditServerForm from '../EditServerForm';
import LeaveServer from '../LeaveServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons'

function ServerPanel({ props }) {
  const { server, socket } = props;
  const user = useSelector(state => state.session.user);
  const [showPanel, setShowPanel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serverAction, setServerAction] = useState('');

  useEffect(() => {
    if (!user) setShowPanel(false);
    if (!showPanel) return;

    const closeMenu = e => {
      if (e.target.className === 'dont-close'
        || e.target.parentNode?.className === 'dont-close') return;
      setShowPanel(false);
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showPanel, user])

  const handleClick = () => {
    if (showPanel) setShowPanel(false);
    else setShowPanel(true);
  }

  const onClose = () => {
    setShowModal(false);
    setServerAction('');
  }

  return (
    <>
      <button className='panel-details-button' onClick={handleClick}>
        <FontAwesomeIcon icon={faGears} />
      </button>
      {showPanel &&
        <div id='panel-container' className='dont-close'>
          <div id='panel-header' className='dont-close'>
            <div>Details</div>
            <div id='panel-links' className='dont-close'>
              <div>Invite links:</div>
              <div className='dont-close'>
                <div>https://nebulae.gg/{server.name}#{server.id}</div>
                <div>{server.name}#{server.id}</div>
              </div>
            </div>
          </div>
          {user.id === server.admin_id ?
            <div className='details-panel'>
              <button
                className='panel-inner-button'
                onClick={() => {
                  setShowModal(true);
                  setServerAction('EDIT');
                }}
              >
                Edit Solar System
              </button>
            </div>
            :
            <div className='details-panel'>
              <button
                className='panel-inner-button'
                onClick={() => {
                  setShowModal(true);
                  setServerAction('LEAVE');
                }}
              >
                Leave Solar System
              </button>
            </div>
          }
        </div>
      }
      {showModal && serverAction === 'LEAVE' &&
        <Modal onClose={onClose}>
          <LeaveServer props={{ setServerAction, onClose, server }} />
        </Modal>
      }
      {showModal && serverAction === 'EDIT' &&
        <Modal onClose={onClose}>
          <EditServerForm props={{ onClose, socket }} />
        </Modal>
      }
    </>
  )
}

export default ServerPanel;
