import CanvasDraw from 'react-canvas-draw';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { app } from "./firebase-config";
import { getAuth,signOut,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { loadMessage, saveToFirestore,loadNext } from './firestore';
import './SignIn.css';
import { requestNotificationsPermissions } from './messaging_get_token';
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const SignIn = () => {
  const [user, loading, error] = useAuthState(auth);
  const canvasD = useRef(null)
  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [docRef, setDocRef] = useState("");
  const [titleImg, setTitleImg] = useState("initialState");
  
  const handleLoad = async() => {
    try {
      const [docRef1,message] = await loadMessage(user);
      if(message!==""){
        setSrc(message.imageUrl)
        setDocRef(docRef1)
        setTitleImg(message.picTitle)
      }else{
        alert("You have no messages :c")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleLoadNext = async() => {
    try {
      const [docRef1,message] = await loadNext(user,docRef);
      if(message!==""){
        // console.log({message})
        setSrc(message.imageUrl)
        setDocRef(docRef1)
        setTitleImg(message.picTitle)
      }else{
        alert("You have no messages :c")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    // We save the Firebase Messaging Device token and enable notifications.
    requestNotificationsPermissions(user);
    
    
    return (
      <div className='containerM container-md container-fluid '>
        <div className='row' style={{padding: "1rem"}}>
          <div className='col' >
            <CanvasDraw
              ref={canvasD}
              brushRadius={5}
              brushColor={"#000"}
            />
          </div>
          <div className='col'>
            <h3 className='display-5'>Signed In User: {user.displayName}</h3>
            <h4 className='display-8'>uid: {user.uid}</h4>
            <label className='form-label row'>
              Picture title
              <input required name='picTitle' type='text' value={title} onChange={ (e) => {setTitle(e.target.value);} } className="form-control"/>
            </label>
            <label className='form-label row'>
              Send to:
              <input required name='sendTo' type='text' value={sendTo} onChange={ (e) => {setSendTo(e.target.value);} } className="form-control"/>
            </label>
            <div className="btn-group">
              <button 
              onClick={(e) => {
                if(title !== "" && sendTo !== ""){
                  saveToFirestore(title,user, canvasD.current.getDataURL("png",false,"#ffffff"),sendTo)
                  canvasD.current.clear();
                  setTitle("");
                  setSendTo("")
                }else{alert("Fill in the fields")}
              }}
              className="btn btn-success"
              >Send</button>
              <button onClick={handleLoad} className="btn btn-info">load</button>
              <button onClick={() => {setSrc("");setTitle("");setSendTo("");signOut(auth);} } className="btn btn-danger">Sign Out</button>
            </div>
          </div>
        </div>
      
          { src ?
            <div className='col'>
              <img src={src} alt="Something readed from firestore" className='img-fluid col-md-6 offset-md-3'/>
              <h1 className="display-5 col-md-6 offset-md-3 text-center">{titleImg}</h1>
              <button onClick={handleLoadNext} className="btn btn-info col-md-6 offset-md-3" id='btnNext'>Next</button>
            </div>
          : null }
      </div>
    );
  }
  return (
    <div className="container-md containerM text-center">
      <h1 className='display-1 text-center'>Welcome to DrawingApp</h1>
      <img alt='Google Log in' width={"350px"} height={"200px"} onClick={() => signInWithPopup(auth,provider)} src="https://public-assets.postmarkapp.com/blog/sign-in-with-google.png?mtime=20180419195146&focal=none" />
    </div>
  );
};
