import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { joinServer } from "../../store/server";
import { authenticate } from "../../store/session";

function JoinServerForm({ props }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { onClose } = props;
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState([]);
  const [inviteLink, setInviteLink] = useState('');

  const handleJoin = async e => {
    e.preventDefault()
    setErrors([]);

    if (inviteLink) {
      const data = await dispatch(joinServer(inviteLink, user.id));

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      await authenticate();
      setErrors([]);
      setInviteLink('');
      onClose();
      history.push(`/servers/${data.id}/channels`);
      return;
    }

    setErrors(['Please provide an invite']);
  }

  return (
    <>
      <div className='server-form'>
        <div className='server-form-header'>Join Solar System</div>
        {errors.length === 0 ? null : errors.map((error, i) => (
          <div key={i} className='server-error'>{error}</div>
        ))}
        <form onSubmit={handleJoin}>
          <div className='server-input-container'>
            <label htmlFor="invite">INVITE LINK</label>
            <input
              type='text'
              name='invite'
              value={inviteLink}
              onChange={e => setInviteLink(e.target.value)}
            />
          </div>
          <div className='invite-example'>
            <div>INVITES SHOULD LOOK LIKE</div>
            <ul>
              <li>SolarSystemName#1234</li>
              <li>https://nebulae.gg/SolarSystemName#1234</li>
            </ul>
          </div>
          <button
            className='server-button'
            type='submit'
          >
            JOIN SOLAR SYSTEM
          </button>
        </form>
      </div>
    </>
  )
}

export default JoinServerForm;
