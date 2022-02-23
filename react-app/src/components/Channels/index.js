import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { loadChannels } from '../../store/channel';
import ChannelDetails from '../ChannelDetails';
import NoServers from '../Servers/NoServers';
import ServerPanel from '../Servers/ServerPanel';
import './Channels.css';

function Channels() {
  const dispatch = useDispatch();
  // const location = useLocation();
  const history = useHistory();
  const { currChannelId } = useParams();
  // const servers = useSelector(state => state.servers);
  const channels = useSelector(state => state.channels);
  const user = useSelector(state => state.session.user);
  // const [currChannelId, setCurrChannelId] = useState(location.state?.channelId || '');

  useEffect(() => {
    if (currChannelId) {
      (async () => await dispatch(loadChannels(channels[currChannelId].server.id)))()
    }
  }, [dispatch])

  return (
    <>
      {/* <div>
        <h1>{servers[serverId]?.name}</h1>
        <ServerPanel server={servers[serverId]} />
        {Object.keys(channels).map(channelId => {
          const channel = channels[channelId];
          return (
            <div key={channelId}>
              <button
                onClick={() => setCurrChannelId(channelId)}
              >{channel.name}</button>
              {currChannelId === channelId && user.id === servers[serverId]?.admin_id &&
                <button onClick={() => history.push({
                  pathname: `/channels/${channelId}/edit`,
                  state: { serverId }
                })}>edit</button>
              }
            </div>
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
      </div>
      <div>
        {currChannelId && channels[currChannelId] &&
          <>
            <h2>{channels[currChannelId].name}</h2>
            <div>
              <h3>Description</h3>
              <p>{channels[currChannelId].description}</p>
            </div>
          </>
        }
      </div> */}
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
        <div>
          {user.servers[0] ?
            <>
              <div>THIS USER HAS AT LEAST 1 SERVER</div>
              {user.servers[0].channels[0] ?
                // <div>THAT SERVER HAS AT LEAST 1 CHANNEL</div>
                <ChannelDetails props={{ channel: channels[currChannelId] }} />
                :
                <div>THAT SERVER HAS NO CHANNELS</div>
              }
            </>
            :
            <NoServers />
          }
        </div>
      </div>
    </>
  )
}

export default Channels;
