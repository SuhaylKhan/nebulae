import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteServer, editServer } from '../../store/server';

function EditServerForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId } = useParams();
  const servers = useSelector(state => state.servers);
  const user = useSelector(state => state.session.user);

  const [serverName, setServerName] = useState('');
  const [errors, setErrors] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (servers[serverId]) setServerName(servers[serverId].name);
  }, [serverId, servers])

  useEffect(() => {
    if (!user) setShowConfirm(false);
    if (!showConfirm) return;

    const closeMenu = e => {
      if (e.target.className === 'confirm-delete'
        || e.target.parentNode.className === 'confirm-delete') return;
      setShowConfirm(false);
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
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
      history.push(`/users/${user.id}/servers`);
      return;
    }

    setErrors(['Please provide a name for your new Solar System']);
  }

  const handleDelete = async () => {
    setErrors([])
    const data = await dispatch(deleteServer(serverId))

    if (data === 'DELETE SUCCESSFUL') {
      history.push(`/users/${user.id}/servers`);
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
      <h1>EDIT</h1>
      {errors.length === 0 ? null : errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      {servers[serverId] &&
        <form onSubmit={handleSubmit}>
          <label>Enter a new name</label>
          <input
            type='text'
            disabled={showConfirm ? true : false}
            placeholder={servers[serverId].name}
            value={serverName}
            onChange={e => setServerName(e.target.value)}
          />
          <button
            type='submit'
            disabled={showConfirm ? true : false}
          >Update Server Name</button>
        </form>
      }
      <button
        onClick={handleClick}
        disabled={showConfirm ? true : false}
      >DELETE</button>
      {showConfirm &&
        <div>
          <div>Are you sure you want to delete your server?</div>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleClick}>No</button>
        </div>
      }
    </>
  )
}

export default EditServerForm;
