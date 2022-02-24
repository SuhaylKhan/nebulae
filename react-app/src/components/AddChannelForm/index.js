import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createChannel } from '../../store/channel';

function AddChannelForm({ props }) {
  const { onClose, serverId } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const newChannel = async e => {
    e.preventDefault();
    setErrors([]);

    const newChannel = {
      serverId,
      name: channelName,
      description: channelDescription
    }

    if (channelName) {
      const data = await dispatch(createChannel(newChannel));

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      setErrors([]);
      setChannelName('');
      onClose();
      history.push(`/servers/${serverId}/channels/${data.id}`)
      return;
    }

    setErrors(['Please provide a name for your new Planet'])
  }

  return (
    <>
      <div className='server-form'>
        <div className='server-form-header'>Create New Planet</div>
        {errors.length === 0 ? null : errors.map((error, i) => (
          <div key={i} className='server-error'>{error}</div>
        ))}
        <form onSubmit={newChannel}>
          <div className='server-input-container'>
            <label htmlFor='name'>Planet Name</label>
            <input
              type='text'
              name='name'
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
            />
          </div>
          <div className='server-textarea-container'>
            <label htmlFor='description'>Planet Description</label>
            <textarea
              name='description'
              placeholder='Optional'
              value={channelDescription}
              onChange={e => setChannelDescription(e.target.value)}
            />
          </div>
          <button
            className='server-button'
            type='submit'
          >
            CREATE PLANET
          </button>
        </form>
      </div>
    </>
  )
}

export default AddChannelForm;
