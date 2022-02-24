import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { leaveServer } from "../../store/server";
import { authenticate } from "../../store/session";
import './LeaveServer.css';

function LeaveServer({ props }) {
  const { onClose, server } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  const handleLeave = async () => {
    const data = await dispatch(leaveServer(server.id, user.id))

    if (data === 'LEAVE SUCCESSFUL') {
      dispatch(authenticate());
      if (user.servers[0]) {
        onClose();
        history.push(`/servers/${user.servers[0].id}/channels`);
      } else {
        onClose();
        history.push(`/servers`);
      }
      return;
    }
  }

  return (
    <>
      {server &&
        <div className='server-form'>
          <div className='server-form-header'>Leave <span>{server.name}</span> ?</div>
          <div className='server-form-subheader'>
            Are you sure you want to leave?
            You won't be able to rejoin this Solar System unless you have an invite link.
          </div>
          <div className='leave-container'>
            <button onClick={handleLeave}>Leave</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      }
    </>
  )
}

export default LeaveServer;
