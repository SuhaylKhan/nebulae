import './AddServerForm.css';

function AddServerForm({ props }) {
  const { setServerAction } = props;

  return (
    <>
      <div className='server-form'>
        <div className='server-form-header'>Ready for adventure?</div>
        <div className='server-form-subheader'>A Solar System is where you and your friends can hang out.</div>
        <button
          className='server-form-button'
          onClick={() => setServerAction('CREATE')}
        >
          Create my own
        </button>
        <button
          className='server-form-button'
          onClick={() => setServerAction('JOIN')}
        >
          Join via invite
        </button>
      </div>
    </>
  )
}

export default AddServerForm;
