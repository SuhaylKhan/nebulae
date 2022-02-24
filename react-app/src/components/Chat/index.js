import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, deleteMessage, updateMessage } from '../../store/message';
import Message from './Message';
import './Chat.css';

let socket;

function Chat({ props }) {
  const { channel } = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const messages = useSelector(state => state.messages)
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    socket = io();

    socket.on('chat', (chat) => {
      dispatch(createMessage(chat))
    })

    socket.on('edit', (chat) => {
      dispatch(updateMessage(chat))
    })

    socket.on('delete', (chat) => {
      dispatch(deleteMessage(chat))
    })

    return (() => {
      socket.disconnect()
    })

  }, [dispatch])

  const sendChat = e => {
    e.preventDefault();

    if (chatInput) {
      socket.emit('chat', { userId: user.id, content: chatInput, channelId: channel.id });
      setChatInput('');
    }
  }

  const editChat = e => {
    e.preventDefault();

    if (!e.target.firstChild.value) e.target.firstChild.value = messages[e.target.id].content;

    socket.emit('edit', { messageId: e.target.id, content: e.target.firstChild.value });
  }

  const deleteChat = e => {
    socket.emit('delete', { messageId: e.target.id });
  }

  return (
    <>
      <div id='chat-container'>
        <div id='message-list-container'>
          {Object.values(messages).map((message, i) => {
            return (
              <Message key={i} props={{ message, editChat, deleteChat }} />
            )
          })}
        </div>
        <form id='create-chat-input' onSubmit={sendChat}>
          <input
            className="content-edit-input"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
          />
          <button className='server-button' type='submit'>Send</button>
        </form>
      </div>
    </>
  )
}

export default Chat;
