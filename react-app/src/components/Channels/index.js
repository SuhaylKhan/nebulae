import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { loadChannels } from '../../store/channel';
import ChannelDetails from '../ChannelDetails';
import ServerPanel from '../Servers/ServerPanel';
import NoServers from '../Servers/NoServers'
import './Channels.css';
import NoChannels from './NoChannels';
import EditChannelForm from '../EditChannelForm';
import { Modal } from '../../context/Modal';
import { loadServers } from '../../store/server';
import AddChannelForm from '../AddChannelForm';
import { loadMessages } from '../../store/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons'
import  { io } from 'socket.io-client';

let socket;

function Channels() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, currChannelId } = useParams();
  const user = useSelector(state => state.session.user);
  const servers = useSelector(state => state.servers);
  const channels = useSelector(state => state.channels);

  const [showModal, setShowModal] = useState(false);
  const [serverAction, setServerAction] = useState('');

  useEffect(() => {
    socket = io();

    socket.on('deleteChannel', () => {
      dispatch(loadChannels(serverId))
    })

    return (() => {
      socket.disconnect()
    })
  }, [dispatch, serverId])

  useEffect(() => {
    dispatch(loadServers(user.id));

    if (currChannelId) {
      loadMessages(currChannelId)
    }
  }, [dispatch, user.id, currChannelId])

  useEffect(() => {
    if (servers[serverId]) {
      (async () => await dispatch(loadChannels(serverId)))()
    }
  }, [dispatch, serverId, servers])

  useEffect(() => {
    if (!currChannelId) {
      if (servers[serverId]?.channels.length > 0) {
        history.push(`/servers/${serverId}/channels/${servers[serverId]?.channels[0].id}`)
      }
    }
  }, [currChannelId, serverId, servers, history])

  const onClose = () => {
    setShowModal(false);
    setServerAction('');
  }

  return (
    <>
      <div id='channels-container'>
        <div id='channels-panel'>
          {servers[serverId] &&
            <div id='channels-header-container'>
              <div id='channels-panel-header'>{servers[serverId].name}</div>
              <ServerPanel server={servers[serverId]} />
            </div>
          }
          <div id='channels-list'>
            <div id='channels-list-header'>PLANETS</div>
            {Object.keys(channels).map(channelId => {
                const channel = channels[channelId];
                return (
                  <div className='list-channel' key={channelId}>
                    <button
                      onClick={() => history.push(`/servers/${channel.server_id}/channels/${channelId}`)}
                    >{channel.name}</button>
                    {currChannelId === channelId && user.id === servers[serverId]?.admin_id &&
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setServerAction('EDIT')
                        }}
                      >
                        <FontAwesomeIcon icon={faGear} />
                      </button>
                    }
                  </div>
                )
            })}
            {user.id === servers[serverId]?.admin_id &&
              <button
                onClick={() => {
                  setShowModal(true);
                  setServerAction('CREATE');
                }}
              >
                +
              </button>
            }
          </div>
        </div>
        <div>
          {Object.keys(servers).length === 0 &&
            <NoServers />
          }
          {user.servers.length > 0 && Object.keys(channels).length === 0 &&
            <NoChannels />
          }
          {servers[serverId] && channels[currChannelId] &&
            <ChannelDetails props={{ channel: channels[currChannelId] }} />
          }
        </div>
      </div>

      {showModal && serverAction === 'EDIT' &&
        <Modal onClose={onClose}>
          <EditChannelForm props={{ channel: channels[currChannelId], onClose, socket }} />
        </Modal>
      }
      {showModal && serverAction === 'CREATE' &&
        <Modal onClose={onClose}>
          <AddChannelForm props={{ onClose, serverId }} />
        </Modal>
      }
    </>
  )
}

export default Channels;
