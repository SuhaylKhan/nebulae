import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channel';

function Channels() {
  const dispatch = useDispatch();
  const { serverId } = useParams();

  useEffect(() => {
    (async () => await dispatch(loadChannels(serverId)))()
  }, [dispatch, serverId])

  return (
    <>
      <h1>CHANNELS</h1>
    </>
  )
}

export default Channels;
