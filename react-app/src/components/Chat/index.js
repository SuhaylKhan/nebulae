import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, deleteMessage, updateMessage } from '../../store/message';
import Message from './Message';

let socket;

function Chat({ props }) {
  const user = useSelector(state => state.session.user);
  const [chatInput, setChatInput] = useState('');
  const [editInput, setEditInput] = useState('');

  const messages = useSelector(state => state.messages)
  const { channel } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    socket = io();

    socket.on('chat', (chat) => {
      dispatch(createMessage(chat))
    })

    socket.on('edit', (edit) => {
      dispatch(updateMessage(edit))
    })

    socket.on('delete', (chat) => {
      dispatch(deleteMessage(chat))
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

  const editChat = e => {
    e.preventDefault();
    socket.emit('edit', { messageId: e.target.id, content: editChat });
  }

  const deleteChat = e => {
    socket.emit('delete', { messageId: e.target.id });
  }

  return (
    <>
      <div>
        {Object.values(messages).map((message, i) => {
          return (
            <Message key={i} props={{ message, editInput, setEditInput, editChat, deleteChat }} />
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
