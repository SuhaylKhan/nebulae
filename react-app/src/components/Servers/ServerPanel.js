import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditServerForm from '../EditServerForm';
import LeaveServer from '../LeaveServer';

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
      <button onClick={handleClick}>Details</button>
      {showPanel &&
        <div>
          <div>Server Details</div>
          {user.id === server.admin_id ?
            <div className='details-panel'>
              <button
                onClick={() => {
                  setShowModal(true);
                  setServerAction('EDIT');
                }}
              >
                EDIT
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
