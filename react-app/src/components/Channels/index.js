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
    </>
  )
}

export default Channels;
