import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadChannels } from '../../store/channel';
import ServerPanel from '../Servers/ServerPanel';

function Channels() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const servers = useSelector(state => state.servers);
  const channels = useSelector(state => state.channels);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => await dispatch(loadChannels(serverId)))()
  }, [dispatch, serverId])

  return (
    <>
      <h1>{servers[serverId]?.name}</h1>
      <ServerPanel server={servers[serverId]} />
      {Object.keys(channels).map(channelId => {
        const channel = channels[channelId];
        return (
          <button
            key={channelId}
            onClick={() => history.push(`/channels/${channelId}`)}
          >{channel.name}</button>
        )
      })}
      {user.id !== servers[serverId]?.admin_id ? null :
        <button
          onClick={() => {
            history.push({
              pathname: '/channels/new',
              state: { serverId }
            })
          }}
        >+</button>
      }
    </>
  )
}

export default Channels;
