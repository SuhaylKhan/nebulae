function NoChannels() {
  return(
    <>
      <div className="no-servers-container">
        <div className="no-servers-header">No <span>Planets</span> found</div>
        <div className="no-servers-inner-text">
          <div div className='no-servers-flavor-text'>
            Solar Systems aren't really systems if there are no Planets.
          </div>
          <div>
            Get the party started by creating planets or wait for
            the Solar System admin to do so.
          </div>
        </div>
      </div>
    </>
  )
}

export default NoChannels;
