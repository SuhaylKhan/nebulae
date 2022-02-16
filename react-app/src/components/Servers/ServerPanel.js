import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ServerPanel({server}) {
  const user = useSelector(state => state.session.user);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (!user) setShowPanel(false);
    if (!showPanel) return;

    const closeMenu = e => {
      if (e.target.className === 'details-panel'
        || e.target.parentNode.className === 'details-panel') return;
      setShowPanel(false);
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showPanel, user])

  const handleClick = () => {
    if (showPanel) setShowPanel(false);
    else setShowPanel(true);
  }

  return (
    <>
      <button onClick={handleClick}>{server.name}</button>
      {showPanel &&
        <div className='details-panel'>
          <button>EDIT</button>
        </div>
      }
    </>
  )
}

export default ServerPanel;
