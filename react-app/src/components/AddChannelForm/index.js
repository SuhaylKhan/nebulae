import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { createChannel } from '../../store/channel';

function AddChannelForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [channelName, setChannelName] = useState('');
  const [errors, setErrors] = useState([]);

  const newChannel = async e => {
    e.preventDefault();
    setErrors([]);

    const newChannel = {
      name: channelName,
      serverId: location.state.serverId
    }

    if (channelName) {
      const data = await dispatch(createChannel(newChannel));

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      setErrors([]);
      setChannelName('');
      history.push(`/channels/${data.id}`);
      return;
    }

    setErrors(['Please provide a name for your new Planet'])
  }

  if (!location.state) return <Redirect to='/' />

  return (
    <>
      <h1>Create New Channel</h1>
      {errors.length === 0 ? null : errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <form onSubmit={newChannel}>
        <label htmlFor='name'>Channel Name</label>
        <input
          type='text'
          name='name'
          value={channelName}
          onChange={e => setChannelName(e.target.value)}
        />
        <button type='submit'>CREATE CHANNEL</button>
      </form>
    </>
  )
}

export default AddChannelForm;
