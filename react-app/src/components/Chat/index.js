import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, deleteMessage, loadMessages, updateMessage } from '../../store/message';
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
      console.log('HI =====')
      dispatch(loadMessages(channel.id))
    })

    socket.on('edit', (chat) => {
      dispatch(loadMessages(channel.id))
    })

    socket.on('delete', (chat) => {
      dispatch(loadMessages(channel.id))
    })

    return (() => {
      socket.disconnect()
    })

  }, [dispatch, channel.id])

  const sendChat = e => {
    e.preventDefault();

    if (chatInput) {
      socket.emit('chat', { userId: user.id, content: chatInput, channelId: channel.id });
      dispatch(createMessage({ userId: user.id, content: chatInput, channelId: channel.id }))
      setChatInput('');
    }
  }

  const editChat = e => {
    e.preventDefault();

    if (!e.target.lastChild.firstChild.value) e.target.lastChild.firstChild.value = messages[e.target.id].content;

    socket.emit('edit', { messageId: e.target.id, content: e.target.lastChild.firstChild.value });
    dispatch(updateMessage({ messageId: e.target.id, content: e.target.lastChild.firstChild.value }))
  }

  const deleteChat = e => {
    socket.emit('delete', { messageId: e.currentTarget.id });
    dispatch(deleteMessage({ messageId: e.currentTarget.id }))
  }

  return (
    <>
      <div id='chat-container'>
        <div id='message-list-container'>
          {Object.values(messages).map((message) => {
            return (
              <Message key={message.id} props={{ message, editChat, deleteChat }} />
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
