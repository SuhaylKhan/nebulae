import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMessages } from "../../store/message";
import Chat from "../Chat";
import './ChannelDetails.css';

function ChannelDetails({ props }) {
  const { channel } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => await dispatch(loadMessages(channel.id)))()
  }, [dispatch, channel])

  return (
    <>
      <div id="channel-container">
        <div id="channel-header">
          <div>{channel.name}</div>
          <div>{channel.description}</div>
        </div>
        <Chat props={{ channel }} />
      </div>
    </>
  )
}

export default ChannelDetails;
