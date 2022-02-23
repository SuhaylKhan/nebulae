import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, deleteMessage } from '../../store/message';

let socket;

function Chat({ props }) {
  const user = useSelector(state => state.session.user);
  const [chatInput, setChatInput] = useState('');

  const messages = useSelector(state => state.messages)
  const { channel } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io();

    socket.on('chat', (chat) => {
      dispatch(createMessage(chat))
    })

    return (() => {
      socket.disconnect()
    })

  }, [])

  const sendChat = e => {
    e.preventDefault();
    socket.emit('chat', { userId: user.id, content: chatInput, channelId: 1 });
    setChatInput('');
  }

  return (
    <>
      <div>
        {Object.values(messages).map((message, i) => {
          return (
            <div key={i}>
              <div>
                {`${message.user.username}: ${message.content}`}
              </div>
              {user.id === message.user.id &&
                <div>
                  <button>edit</button>
                  <button
                    onClick={() => {
                      dispatch(deleteMessage(message.id));
                    }}
                  >
                    delete
                  </button>
                </div>
              }
            </div>
          )
        })}
      </div>
      <form onSubmit={sendChat}>
        <input
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </>
  )
}

export default Chat;
