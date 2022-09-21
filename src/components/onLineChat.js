import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { useCookies } from 'react-cookie';
import FocusLock from 'react-focus-lock';


import { Desktop, Tablet, Mobile, MobileX } from '../contexts/breakPoints';
import Messages from '../components/messages';
import styles from '../styles/onLineChat.module.scss';
import { VisibilityContext } from '../contexts/visibilityContext';
import { AuthContext } from '../contexts/authContext';
import OnLineChatLogin from './onLineChatLogin';
import title from '../assets/Icon/4910150761581665181.svg'


const OnLineChat = (props) => {
  const { onLineChatFrmShow,  setOffOnLineChatFrmShow,
    onLineChatLoginFrmShow, setOnLineChatLoginFrmShow} = useContext(VisibilityContext);
 /// const { states, authorized } = useContext(AuthContext);

  ///const scrollableGrid = useRef();
  const [socket, setSocket] = useState(null);
  const [value, setValue] = useState('');

  const [emailCookies, setEmailCookie] = useCookies(['email']);
  const [cookies, setCookie] = useCookies(['name']);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
    
  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)


    window.addEventListener('resize', debouncedHandleResize)

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)

    }
  })

  const location = window.location.hostname;
  let newSocket = '';

  useEffect(() => {
    if (location === 'localhost') {
      newSocket = io(`http://${window.location.hostname}:8000`);
    }
    else {
      newSocket = io(`https://api.softestingca.com`);
    }
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);




  //   useEffect(() => {
  //   console.log("render use effect", props);
  //   socket.on("getMessages", (message) => {
  //     console.log(message);
  //     setMessages(messages => messages.concat(message));
  //     scrollableGrid.current.scroll(0, scrollableGrid.current.scrollHeight);
  //   })
  //   socket.on("deleteMsg", id => {
  //     setMessages(function (messages) {
  //       let findIndex = -1;
  //       messages.forEach((message, index) => {
  //         if (message.id == id) {
  //           findIndex = index;
  //         }
  //       });
  //       return removeItemWithSlice(messages, findIndex);
  //     });
  //   })
  // }, []);

  // const removeItemWithSlice = (items, index) => {
  //   if (index === -1) return items;
  //   return [...items.slice(0, index), ...items.slice(index + 1)];
  // };



  const sendMessage = () => {

    if (value !== null && value !== 'undefined' && value.trim() !== '') {


      let emailW = '';
        if(localStorage.getItem('userEmail')){
          emailW = JSON.parse(localStorage.getItem('authorized'))===true? localStorage.getItem('userEmail').replace('"','').substring(0, localStorage.getItem('userEmail').replace('"','').indexOf('@')):'';
          setEmailCookie('email', emailW);
        }

      if (cookies.email === 'undefined' || cookies.email === '' || cookies.email === null) {
        
       if (emailW === 'undefined' || emailW === '' || emailW === null) {
          setOnLineChatLoginFrmShow();
        }

      } else {

        socket.emit('message', value);
        setValue('');
        

        //   socket.emit("message", {
        //     msg: newMessage,
        //     sender: {
        //       name: cookies.name,
        //       email: cookies.email,
        //     },
        //   });
        //  console.log(newMessage);
        //   setNewMessage("");
      }
    }
  }

  let history = useHistory();
  const handleClose = () => {
  //  if (bodyFrmShow) history.push("/");
  //  if (aboutUsFrmShow) history.push("/aboutUs");
    setOffOnLineChatFrmShow();
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  const onDeleteClick = (id) => {
    socket.emit("deleteMsg", id);
  };

  document.title= 'SofTesting | onLineChat';

  return (
    <>
      <Desktop>
        <div className={`${onLineChatFrmShow ? styles.onLineChat : styles.inactive}`}  >
          <div id={styles.header}  >
            <span  >
              <img id={styles.title} src={title} />
              <h1 id={styles.tit}> Online Chat </h1>    
            </span>
            <span id={styles.minBtn1} onClick={handleClose}> </span>
            <span id={styles.minBtn2} onClick={handleClose}> </span>
          </div>
          <FocusLock>

            {socket ? <Messages socket={socket} /> : (
              <div>Not Connected</div>
            )}


            <div>
              <input id={styles.newMessage} autoFocus value={value} onChange={e => setValue(e.currentTarget.value)}
                placeholder="Type your message" onKeyDown={_handleKeyDown}></input>
              <button id={styles.submit} onClick={sendMessage}>send</button>
              {onLineChatLoginFrmShow && <OnLineChatLogin />}
            </div>
         
          </FocusLock>

        </div>
      </Desktop>
      <Tablet>
        <div className={`${onLineChatFrmShow ? styles.onLineChat : styles.inactive}`}    >
          <div id={styles.header}  >
            <span  >
              <img id={styles.title} src={title} />
              Online Chat
            </span>
            <span id={styles.minBtn1} onClick={handleClose}> </span>
            <span id={styles.minBtn2} onClick={handleClose}> </span>
          </div>
          <FocusLock>



            {socket ? <Messages socket={socket} /> : (
              <div>Not Connected</div>
            )}


            <div>
              <input id={styles.newMessage} autoFocus value={value} onChange={e => setValue(e.currentTarget.value)}
                placeholder="Type your message" onKeyDown={_handleKeyDown}></input>
              <button id={styles.submit} onClick={sendMessage}>send</button>
              {onLineChatLoginFrmShow && <OnLineChatLogin />}
            </div>
           

          </FocusLock>

        </div>
      </Tablet>
      <Mobile>
        <div className={`${onLineChatFrmShow ? styles.onLineChat : styles.inactive}`} style={{ width: `${dimensions.width}px` }}   >
          <div id={styles.header} style={{ width: `${dimensions.width}px` }}>
            <span  >
              <img id={styles.title} src={title} />
              Online Chat
            </span>
            <span id={styles.minBtn1} onClick={handleClose}> </span>
            <span id={styles.minBtn2} onClick={handleClose}> </span>
          </div>
          <FocusLock>



            {socket ? <Messages socket={socket} /> : (
              <div>Not Connected</div>
            )}


            <div>
              <input id={styles.newMessage} style={{ width: `${.73 * dimensions.width}px` }} autoFocus value={value} onChange={e => setValue(e.currentTarget.value)}
                placeholder="Type your message" onKeyDown={_handleKeyDown}></input>
              <button id={styles.submit} onClick={sendMessage} style={{ width: `${.22 * dimensions.width}px`, left: `${dimensions.width - .25 * dimensions.width}px` }} >send</button>
              {onLineChatLoginFrmShow && <OnLineChatLogin />}
            </div>


          </FocusLock>

        </div>
      </Mobile>
      <MobileX>
        <div className={`${onLineChatFrmShow ? styles.onLineChat : styles.inactive}`} style={{ width: `${dimensions.width}px` }} >
          <div id={styles.header} style={{ width: `${dimensions.width}px` }} >
            <span  >
              <img id={styles.title} src={title} />
              Online Chat
            </span>
            <span id={styles.minBtn1} onClick={handleClose}> </span>
            <span id={styles.minBtn2} onClick={handleClose}> </span>
          </div>
          <FocusLock>



            {socket ? <Messages socket={socket} /> : (
              <div>Not Connected</div>
            )}


            <div>
              <input id={styles.newMessage} style={{ width: `${.73 * dimensions.width}px` }} autoFocus value={value} onChange={e => setValue(e.currentTarget.value)}
                placeholder="Type your message" onKeyDown={_handleKeyDown}></input>
              <button id={styles.submit} style={{ width: `${.22 * dimensions.width}px`, left: `${dimensions.width - .25 * dimensions.width}px` }} onClick={sendMessage}>send</button>
              {onLineChatLoginFrmShow && <OnLineChatLogin />}
            </div>


          </FocusLock>

        </div>
      </MobileX>
    </>
  )

}

export default OnLineChat;