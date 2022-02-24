import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom';
import { loadChannels } from '../../store/channel';
import ChannelDetails from '../ChannelDetails';
import ServerPanel from '../Servers/ServerPanel';
import NoServers from '../Servers/NoServers'
import './Channels.css';
import NoChannels from './NoChannels';

function Channels() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { serverId, currChannelId } = useParams();
  const user = useSelector(state => state.session.user);
  const servers = useSelector(state => state.servers);
  const channels = useSelector(state => state.channels);

  useEffect(() => {
    if (servers[serverId]) {
      (async () => await dispatch(loadChannels(serverId)))()
    }
  }, [dispatch, serverId, servers])

  if (location.pathname === '/servers' || location.pathname === '/servers/') {
    if (user.servers.length !== 0) {
      const server = user.servers.find(server => server.channels.length > 0);

      if (server) {
        history.push(`/servers/${server.id}/channels/${server.channels[0].id}`);
      } else {
        history.push(`/servers/${user.servers[0].id}/channels`);
      }
    }
  } else if (location.pathname === `/servers/${serverId}/channels` || location.pathname === `/servers/${serverId}/channels/`) {
    if (user.servers.length === 0) history.push('/servers');

    const server = user.servers.find(server => server.channels.length > 0);
    // if (server) history.push(`/servers/${server.id}/channels/${server.channels[0].id}`);
  } else if (location.pathname === `/servers/${serverId}/channels/${currChannelId}` || location.pathname === `/servers/${serverId}/channels/${currChannelId}/`) {
    if (user.servers.length === 0) history.push('/servers');

    const server = user.servers.find(server => server.channels.length > 0);
    console.log('=====>', server)
    if (!server) history.push(`/servers/${user.servers[0]?.id}/channels`);
  }

  return (
    <>
      <div id='channels-container'>
        <div id='channels-panel'>
          {servers[serverId] &&
            <div>
              <div>{servers[serverId].name}</div>
              <ServerPanel server={servers[serverId]} />
            </div>
          }
          <div>CHANNELS</div>
          {Object.keys(channels).map(channelId => {
              const channel = channels[channelId];
              return (
                <div key={channelId}>
                  <button
                    onClick={() => history.push(`/servers/${channel.server_id}/channels/${channelId}`)}
                  >{channel.name}</button>
                  {currChannelId === channelId && user.id === servers[serverId]?.admin_id &&
                    <button>edit</button>
                  }
                </div>
              )
          })}
          {user.id === servers[serverId]?.admin_id &&
            <button
              onClick={() => {
                history.push({
                  pathname: '/channels/new',
                  state: { serverId }
                })
              }}
            >
              +
            </button>
          }
        </div>
        <div>
          {user.servers.length === 0 &&
            <NoServers />
          }
          {user.servers.length > 0 && servers[serverId]?.channels.length === 0 &&
            <NoChannels />
          }
          {servers[serverId] && channels[currChannelId] &&
            <ChannelDetails props={{ channel: channels[currChannelId] }} />
          }
        </div>
      </div>
    </>
  )
}

export default Channels;
