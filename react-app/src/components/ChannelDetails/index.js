import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMessages } from "../../store/message";

function ChannelDetails({ props }) {
  const { channel } = props;
  const dispatch = useDispatch();

  (async () => await dispatch(loadMessages(1)))()

  return (
    <>
      <div>CHANNEL DETAILS</div>
      {/* <div>{channel.name}</div> */}
    </>
  )
}

export default ChannelDetails;
