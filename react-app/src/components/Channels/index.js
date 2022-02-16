import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channel';
import ServerPanel from '../Servers/ServerPanel';

function Channels() {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const servers = useSelector(state => state.servers);

  useEffect(() => {
    (async () => await dispatch(loadChannels(serverId)))()
  }, [dispatch, serverId])

  return (
    <>
      <h1>{servers[serverId].name}</h1>
      <ServerPanel server={servers[serverId]} />
    </>
  )
}

export default Channels;
