import { useState } from "react";

function JoinServerForm({ props }) {
  const { setServerAction, onClose } = props;

  const [errors, setErrors] = useState([]);
  const [inviteLink, setInviteLink] = useState('');

  const joinServer = async e => {
    e.preventDefault()

    // JOIN SERVER LOGIC

  }

  return (
    <>
      <div className='server-form'>
        <div className='server-form-header'>Join Server</div>
        {errors.length === 0 ? null : errors.map((error, i) => (
          <div key={i} className='server-error'>{error}</div>
        ))}
        <form onSubmit={joinServer}>
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
              <li>ServerName#1234</li>
              <li>https://nebulae.gg/ServerName#1234</li>
            </ul>
          </div>
          <button
            className='server-button'
            type='submit'
          >
            JOIN SERVER
          </button>
        </form>
      </div>
    </>
  )
}

export default JoinServerForm;
