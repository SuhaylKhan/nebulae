import './NoServers.css';

function NoServers() {
  return (
    <>
      <div className="no-servers-container">
        <div className="no-servers-header">No <span>Solar Systems</span> found</div>
        <div className="no-servers-inner-text">
          <div className='no-servers-flavor-text'>
            If you scream in space and no one is around
            to hear it, did you make a sound?
          </div>
          <div>
            Let's not think about that. Press the ' + '
            above to join a Solar System or create your own.
          </div>
        </div>
      </div>
    </>
  )
}

export default NoServers;
