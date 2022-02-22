function AddServerForm({ props }) {
  const { setServerAction } = props;

  return (
    <>
      <div>Ready for adventure?</div>
      <div>A Solar System is where you and your friends can hang out.</div>
      <button onClick={() => setServerAction('CREATE')}>Create my own</button>
      <button onClick={() => setServerAction('JOIN')}>Join via invite</button>
    </>
  )
}

export default AddServerForm;
