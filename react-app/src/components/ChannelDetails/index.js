import { useDispatch } from "react-redux";
import { loadMessages } from "../../store/message";
import Chat from "../Chat";

function ChannelDetails({ props }) {
  const { channel } = props;
  const dispatch = useDispatch();

  (async () => await dispatch(loadMessages(1)))()

  return (
    <>
      <div>
        <div>CHANNEL DETAILS</div>
        <Chat props={{ channel }} />
      </div>
    </>
  )
}

export default ChannelDetails;
