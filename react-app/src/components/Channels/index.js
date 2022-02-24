import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadChannels } from '../../store/channel';
import ChannelDetails from '../ChannelDetails';
import './Channels.css';

function Channels() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currChannelId } = useParams();
  const channels = useSelector(state => state.channels);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (currChannelId) {
      (async () => await dispatch(loadChannels(channels[currChannelId].server.id)))()
    }
  })

  return (
    <>
      <div id='channels-container'>
        <div id='channels-panel'>
          <div>CHANNELS</div>
          {Object.keys(channels).map(channelId => {
              const channel = channels[channelId];
              return (
                <div key={channelId}>
                  <button
                    onClick={() => history.push(`/channels/${channelId}`)}
                  >{channel.name}</button>
                  {currChannelId === channelId && user.id === channel.server.adminId &&
                    <button>edit</button>
                  }
                </div>
              )
            })}
        </div>
        <ChannelDetails props={{ channel: channels[currChannelId] }} />
      </div>
    </>
  )
}

export default Channels;
