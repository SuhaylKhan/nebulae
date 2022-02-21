import { useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { useServerContext } from '../../context/ServerContext';
import './Servers.css';

function Servers() {
  const history = useHistory();
  const servers = useSelector(state => state.servers);
  const { setServerId } = useServerContext();

  return (
    <>
      {Object.keys(servers).map(serverId => {
        const server = servers[serverId]
        return (
          <NavLink
            to={`/servers/${server.id}/channels`}
            exact={true}
            className='server-links'
            activeClassName="selected"
          >
            {server.name}
          </NavLink>
        )
      })}
      <button onClick={() => history.push('/servers/new')}>+</button>
    </>
  )
}

export default Servers;
