// // import React, { useEffect, useState } from "react";
// // import Modal from "./Modal";
// // import Wrapper from "../assets/wrappers/Chat";
// // import Picker from "emoji-picker-react";
// // import { FiSend } from "react-icons/fi";
// // import io from "socket.io-client";
// // import { useAuth } from '../utils/AuthContext';

// // const socket = io();

// // const Chat = ({ onClose,userId }) => {

// //   const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
// //   const [message, setMessage] = useState("");
// //   const [roomId, setRoomId] = useState('')

// //   const {user} = useAuth()

// //   const currUser = user._id
// //   const getRoomId =()=>{
// //     return [userId,user._id].sort().join('_');
// //   }

// //   const createRoom =()=>{
// //     const room  = getRoomId();
// //     setRoomId(room)
// //     console.log(room)
// //   }

// //   const onEmojiClick = (event) => {
// //     //sconsole.log(event.emoji)
// //     setMessage((prev)=> prev+ event.emoji)
// //   }
// //   const handleSendMessage = (e) => {
// //     e.preventDefault();
// //         if (message && roomId && currUser) {
// //             const msg = { roomId, sender: currUser, receiver, message };
// //             socket.emit('chatMessage', msg);
// //             setMessage('');
// //         }
// //   };

// //   useEffect(()=>{
// //     createRoom();
// //     if(roomId){
// //       socket.emit('join room',{roomId,currUser});
// //       socket.on('chatMessage', (msg)=>{
// //         setMessage((msgs)=>[...msgs,msg]);
// //       })
// //       socket.on('initialMessages', (msgs) => {
// //         setMessage(msgs);
// //     });

// //     return () => {
// //         socket.off('chatMessage');
// //         socket.off('initialMessages');
// //     };
// //     }
// //   },[])
// //   return (
// //     <Modal onClose={onClose}>
// //       <Wrapper>
// //         <div className="message-box">
// //           <button
// //             type="button"
// //             onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
// //           >
// //             😊
// //           </button>
// //           <input type="text" name="message" id="message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
// //           <button type="submit" onClick={(e)=>handleSendMessage}>
// //             <FiSend className="icon" />
// //           </button>
// //         </div>
// //         {emojiPickerOpen && <Picker width="100%" height={300} onEmojiClick={onEmojiClick} />}
// //       </Wrapper>
// //     </Modal>
// //   );
// // };

// // export default Chat;

// import React, { useEffect, useState } from "react";
// import Modal from "./Modal";
// import Wrapper from "../assets/wrappers/Chat";
// import Picker from "emoji-picker-react";
// import { FiSend } from "react-icons/fi";
// import io from "socket.io-client";
// import { useAuth } from '../utils/AuthContext';

// const socket = io("http://localhost:5000");

// const Chat = ({ onClose, userId }) => {
//   const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [roomId, setRoomId] = useState('');

//   const { user } = useAuth();
//   const currUser = user._id;

//   const getRoomId = () => {
//     return [userId, currUser].sort().join('_');
//   };

//   const createRoom = () => {
//     const room = getRoomId();
//     setRoomId(room);
//     console.log(room);
//   };

//   const onEmojiClick = (event) => {
//     setMessage((prev) => prev + event.emoji);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message && roomId && currUser) {
//       const msg = { roomId, sender: currUser, receiver: userId, message };
//       socket.emit('chatMessage', msg);
//       setMessage('');
//     }
//   };

//   useEffect(() => {
//     createRoom();
//   }, []);

//   useEffect(() => {
//     if (roomId) {
//       socket.emit('joinRoom', { roomId, username: currUser });

//       socket.on('chatMessage', (msg) => {
//         setMessages((msgs) => [...msgs, msg]);
//       });

//       socket.on('initialMessages', (msgs) => {
//         setMessages(msgs);
//       });

//       return () => {
//         socket.off('chatMessage');
//         socket.off('initialMessages');
//       };
//     }
//   }, [roomId, currUser]);

//   return (
//     <Modal onClose={onClose}>
//       <Wrapper>
//       <div className={`messages ${emojiPickerOpen?'emojiopen':''}`}>
//           {messages.map((msg, index) => (
//             <ul key={index} className={`message ${msg.sender === currUser ? 'own' : ''}`}>
//               <li>{msg.message}</li>
//             </ul>
//           ))}
//         </div>
//         <div className="message-box">
//           <button
//             type="button"
//             onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
//           >
//             😊
//           </button>
//           <input
//             type="text"
//             name="message"
//             id="message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button type="submit" onClick={handleSendMessage}>
//             <FiSend className="icon" />
//           </button>
//         </div>
//         {emojiPickerOpen && <Picker width="100%" height={300} onEmojiClick={onEmojiClick} />}
        
//       </Wrapper>
//     </Modal>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Wrapper from "../assets/wrappers/Chat";
import Picker from "emoji-picker-react";
import { FiSend } from "react-icons/fi";
import io from "socket.io-client";
import { useAuth } from '../utils/AuthContext';

const socket = io("http://localhost:5000");

const Chat = ({ onClose, userId }) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState('');

  const { user } = useAuth();
  const currUser = user._id;

  const getRoomId = () => {
    return [userId, currUser].sort().join('_');
  };

  const createRoom = () => {
    const room = getRoomId();
    setRoomId(room);
    console.log(room);
  };

  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event.emoji);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && roomId && currUser) {
      const msg = { roomId, sender: currUser, receiver: userId, message };
      socket.emit('chatMessage', msg);
      setMessage('');
    }
  };

  useEffect(() => {
    createRoom();
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.emit('joinRoom', { roomId, username: currUser });

      socket.on('chatMessage', (msg) => {
        setMessages((msgs) => [...msgs, msg]);
      });

      socket.on('initialMessages', (msgs) => {
        setMessages(msgs);
      });

      return () => {
        socket.off('chatMessage');
        socket.off('initialMessages');
      };
    }
  }, [roomId, currUser]);

  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <div className={`messages ${emojiPickerOpen ? 'emojiopen' : ''}`}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === currUser ? 'own' : 'others'}`}>
              {msg.message}
            </div>
          ))}
        </div>
        <div className="message-box">
          <button
            type="button"
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            😊
          </button>
          <input
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={handleSendMessage}>
            <FiSend className="icon" />
          </button>
        </div>
        {emojiPickerOpen && <Picker width="100%" height={300} onEmojiClick={onEmojiClick} />}
      </Wrapper>
    </Modal>
  );
};

export default Chat;
