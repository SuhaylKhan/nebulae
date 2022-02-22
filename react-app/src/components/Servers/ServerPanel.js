import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import LeaveServer from '../LeaveServer';

function ServerPanel({server}) {
  const history = useHistory();

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

  const handleEditClick = () => {
    history.push(`/servers/${server.id}/edit`);
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
              <button onClick={handleEditClick}>EDIT</button>
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
    </>
  )
}

export default ServerPanel;
