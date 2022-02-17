import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { editChannel, loadChannels } from '../../store/channel';

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
          <button type='submit'>Update Channel</button>
        </form>
      }
    </>
  )
}

export default EditChannelForm;
