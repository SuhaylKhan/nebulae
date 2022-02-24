import { useState } from "react";
import { useSelector } from "react-redux";

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
          <input
            placeholder={message.content}
            value={editInput}
            onChange={e => setEditInput(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        :
        <div>
          {`${message.user.username}: ${message.content}`}
        </div>
      }
      {user.id === message.user.id &&
        <div hidden={true}>
          <button onClick={toggleEdit}>edit</button>
          <button
            id={message.id}
            onClick={deleteChat}
          >
            delete
          </button>
        </div>
      }
    </div>
  )
}

export default Message;
