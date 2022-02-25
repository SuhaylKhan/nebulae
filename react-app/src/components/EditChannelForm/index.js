import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editChannel, deleteChannel } from '../../store/channel';
import { loadServers } from '../../store/server';

function EditChannelForm({ props }) {
  const { channel, onClose, socket } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { currChannelId, serverId } = useParams();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [channelName, setChannelName] = useState(channel?.name || '');
  const [channelDescription, setChannelDescription] = useState(channel?.description || '');

  useEffect(() => {
    dispatch(loadServers(user.id))
  }, [dispatch, user.id])

  useEffect(() => {
    if (!user) setShowConfirm(false);
    if (!showConfirm) return;
  }, [showConfirm, user])

  const handleEdit = async e => {
    e.preventDefault();
    setErrors([]);

    const updatedChannel = {
      currChannelId,
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
      onClose();
      history.push(`/servers/${data.server_id}/channels/${data.id}`);
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
    const data = await dispatch(deleteChannel(currChannelId))

    if (data === 'DELETE SUCCESSFUL') {
      await dispatch(loadServers(user.id));
      onClose();
      socket.emit('deleteChannel', {})
      history.push(`/servers/${serverId}/channels`);
      return;
    } else if (data.errors) {
      setErrors(data.errors)
    };
  }

  return (
    <>
      <div className='server-form'>
        <div className='server-form-header'>EDIT PLANET</div>
        {errors.length === 0 ? null : errors.map((error, i) => (
          <div key={i} className='server-error'>{error}</div>
        ))}
        <form onSubmit={handleEdit}>
          <div className='server-input-container'>
            <label htmlFor='name'>Enter a new Planet name</label>
            <input
              type='text'
              // disabled={showConfirm ? true : false}
              placeholder={channel?.name}
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
            />
          </div>
          <div className='server-textarea-container'>
            <label htmlFor='description'>Update Planet description</label>
            <textarea
              // disabled={showConfirm ? true : false}
              placeholder={channel?.description}
              value={channelDescription}
              onChange={e => setChannelDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            className='server-button'
            type='submit'
            // disabled={showConfirm ? true : false}
          >Update Planet</button>
        </form>

        {showConfirm ?
          <div className='confirm-container'>
            <div>Are you sure you want to delete this Planet?</div>
            <div className='confirm-buttons'>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={handleClick}>No</button>
            </div>
          </div>
          :
          <button className='delete-button' onClick={handleClick}>DELETE</button>
        }
      </div>
    </>
  )
}

export default EditChannelForm;
