import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { useServerContext } from '../../context/ServerContext';
import AddServerForm from '../AddServerForm';
import CreateServerForm from '../AddServerForm/CreateServerForm';
import './Servers.css';

function Servers() {
  const servers = useSelector(state => state.servers);
  const { setServerId } = useServerContext();
  const [showModal, setShowModal] = useState(false);
  const [serverAction, setServerAction] = useState('');

  const onClose = () => {
    setShowModal(false);
    setServerAction('');
  }

  return (
    <>
      {Object.keys(servers).map(serverId => {
        const server = servers[serverId]
        return (
          <NavLink
            key={serverId}
            onClick={() => setServerId(server.id)}
            to={`/servers/${server.id}/channels`}
            exact={true}
            className='server-links'
            activeClassName='selected'
          >
            {server.name}
          </NavLink>
        )
      })}
      <button
        className='server-links-new'
        onClick={() => {
          setShowModal(true);
        }}
      >
        +
      </button>
      {showModal && !serverAction &&
        <Modal onClose={onClose}>
          <AddServerForm props={{ setServerAction }} />
        </Modal>
      }
      {showModal && serverAction === 'CREATE' &&
        <Modal onClose={onClose}>
          <CreateServerForm props={{ setServerAction, onClose }} />
        </Modal>
      }
      {showModal && serverAction === 'JOIN' &&
        <Modal onClose={onClose}>

        </Modal>
      }
    </>
  )
}

export default Servers;
