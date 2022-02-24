import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMessages } from "../../store/message";
import Chat from "../Chat";

function ChannelDetails({ props }) {
  const { channel } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => await dispatch(loadMessages(channel.id)))()
  }, [dispatch, channel])

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
