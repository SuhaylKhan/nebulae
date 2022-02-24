import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

function Message({ props }) {
  const { message, editChat, deleteChat } = props;
  const user = useSelector(state => state.session.user);
  const [showEdit, setShowEdit] = useState(false);
  const [editInput, setEditInput] = useState(message.content);

  const handleMouseEnter = e => {
    e.currentTarget.lastChild.hidden = false;
  }

  const handleMouseLeave = e => {
    e.currentTarget.lastChild.hidden = true;
  }

  const toggleEdit = () => {
    if (!showEdit) setShowEdit(true);
    else {
      setShowEdit(false);
      setEditInput(message.content);
    }
  }

  return (
    <div
      onMouseEnter={user.id === message.user.id ? handleMouseEnter : null}
      onMouseLeave={user.id === message.user.id ? handleMouseLeave : null}
    >
      {showEdit ?
        <form
          key={message.id}
          id={message.id}
          onSubmit={e => {
            setShowEdit(false);
            editChat(e);
          }}
        >
          <div className="content-user">{message.user.username}</div>
          <div className="content-form-components">
            <input
              className="content-edit-input"
              placeholder={message.content}
              value={editInput}
              onChange={e => setEditInput(e.target.value)}
            />
            <button className='server-button' type="submit">Submit</button>
          </div>
        </form>
        :
        <div className="content-container">
          <div className="content-user">{message.user.username}</div>
          <div className="content-message">{message.content}</div>
        </div>
      }
      {user.id === message.user.id &&
        <div className="chat-edit-buttons" hidden={true}>
          <button onClick={toggleEdit}><FontAwesomeIcon icon={faPencil} /></button>
          <button
            id={message.id}
            onClick={deleteChat}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      }
    </div>
  )
}

export default Message;
