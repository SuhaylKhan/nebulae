import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditServerForm from '../EditServerForm';
import LeaveServer from '../LeaveServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'

function ServerPanel({server}) {
  const user = useSelector(state => state.session.user);
  const [showPanel, setShowPanel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serverAction, setServerAction] = useState('');

  useEffect(() => {
    if (!user) setShowPanel(false);
    if (!showPanel) return;

    const closeMenu = e => {
      if (e.target.className === 'details-panel'
        || e.target.parentNode?.className === 'details-panel') return;
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
        <FontAwesomeIcon icon={faGear} />
      </button>
      {showPanel &&
        <div id='panel-container'>
          <div id='panel-header'>Details</div>
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
                onClick={() => {
                  setShowModal(true);
                  setServerAction('LEAVE');
                }}
              >
                LEAVE
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
          <EditServerForm props={{ onClose }} />
        </Modal>
      }
    </>
  )
}

export default ServerPanel;
