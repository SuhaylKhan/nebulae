import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteServer, editServer } from '../../store/server';
import { authenticate } from '../../store/session';
import './EditServerForm.css';

function EditServerForm({ props }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId } = useParams();
  const servers = useSelector(state => state.servers);
  const user = useSelector(state => state.session.user);
  const { onClose } = props;

  const [serverName, setServerName] = useState('');
  const [errors, setErrors] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (servers[serverId]) setServerName(servers[serverId].name);
  }, [serverId, servers])

  useEffect(() => {
    if (!user) setShowConfirm(false);
    if (!showConfirm) return;
  }, [showConfirm, user])

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);

    if (serverName) {
      const data = await dispatch(editServer(serverId, serverName))

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      setErrors([]);
      setServerName('');
      onClose();
      history.push(`/servers/${serverId}/channels`);
      return;
    }

    setErrors(['Please provide a name for your new Solar System']);
  }

  const handleDelete = async () => {
    setErrors([])
    const data = await dispatch(deleteServer(serverId))

    if (data === 'DELETE SUCCESSFUL') {
      dispatch(authenticate());
      if (user.servers[0]) {
        history.push(`/servers/${user.servers[0].id}/channels`);
      } else {
        history.push(`/servers`);
      }
      return
    } else if (data.errors) {
      setErrors(data.errors)
    };
  }

  const handleClick = () => {
    if (showConfirm) setShowConfirm(false);
    else setShowConfirm(true);
  }

  return (
    <>
      <div className='server-form'>
        <div className='server-form-header'>EDIT SOLAR SYSTEM</div>
        {errors.length === 0 ? null : errors.map((error, i) => (
          <div key={i} className='server-error'>{error}</div>
        ))}
        {servers[serverId] &&
          <form onSubmit={handleSubmit}>
            <div className='server-input-container'>
              <label>Enter a new name</label>
              <input
                type='text'
                placeholder={servers[serverId].name}
                value={serverName}
                onChange={e => setServerName(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='server-button'
            >
              Update Solar System
            </button>
          </form>
        }
        {showConfirm ?
          <div className='confirm-container'>
            <div>Are you sure you want to delete your Solar System?</div>
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

export default EditServerForm;
