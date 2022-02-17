import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { editChannel, loadChannels, deleteChannel } from '../../store/channel';

function EditChannelForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { channelId } = useParams();
  const channels = useSelector(state => state.channels);
  const [errors, setErrors] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');

  useEffect(() => {
    if (location.state) {
      (async () => await dispatch(loadChannels(location.state?.serverId)))()
    }
  }, [dispatch, location.state])

  useEffect(() => {
    if (channels[channelId]?.name) setChannelName(channels[channelId]?.name)
    if (channels[channelId]?.description) setChannelDescription(channels[channelId]?.description)
  }, [channels, channelId])

  const handleEdit = async e => {
    e.preventDefault();
    setErrors([]);

    const updatedChannel = {
      channelId,
      channelName,
      channelDescription
    }

    if (channelName) {
      const data = await dispatch(editChannel(updatedChannel));

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      setErrors([]);
      setChannelName('');
      setChannelDescription('');
      history.push({
        pathname: `/servers/${location.state?.serverId}/channels`,
        state: { channelId }
      })
      return;
    }

    setErrors(['Please provide a name for your new Planet']);
  }

  const handleClick = () => {
    if (showConfirm) setShowConfirm(false);
    else setShowConfirm(true);
  }

  const handleDelete = async () => {
    setErrors([])
    const data = await dispatch(deleteChannel(channelId))

    if (data === 'DELETE SUCCESSFUL') {
      history.push(`/servers/${location.state?.serverId}/channels`);
      return
    } else if (data.errors) {
      setErrors(data.errors)
    };
  }

  return (
    <>
      <h1>EDIT CHANNEL</h1>
      {errors.length === 0 ? null : errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      {channels[channelId] &&
        <form onSubmit={handleEdit}>
          <div>
            <label htmlFor='name'>Enter a new channel name</label>
            <input
              type='text'
              disabled={showConfirm ? true : false}
              placeholder={channels[channelId].name}
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='description'>Update channel description</label>
            <textarea
              disabled={showConfirm ? true : false}
              placeholder={channels[channelId].description}
              value={channelDescription}
              onChange={e => setChannelDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type='submit'
            disabled={showConfirm ? true : false}
          >Update Channel</button>
        </form>
      }
      <button
        onClick={handleClick}
        disabled={showConfirm ? true : false}
      >DELETE</button>
      {showConfirm &&
        <div>
          <div>Are you sure you want to delete this channel?</div>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleClick}>No</button>
        </div>
      }
    </>
  )
}

export default EditChannelForm;
