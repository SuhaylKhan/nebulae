import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

let socket;

function Chat() {
  const user = useSelector(state => state.session.user);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    socket = io();

    socket.on('chat', (chat) => {
      setMessages(messages => [...messages, chat])
    })

    return (() => {
      socket.disconnect()
    })

  }, [])

  const sendChat = e => {
    e.preventDefault();
    socket.emit('chat', { user: user.username, msg: chatInput });
    setChatInput('');
  }

  return (
    <>
      <div>
        {messages.map((message, i) => {
          return (
            <div key={i}>{`${message.user}: ${message.msg}`}</div>
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
