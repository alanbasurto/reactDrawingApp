import { startAfter,getFirestore, collection, addDoc, serverTimestamp, query, limit, where, getDocs, orderBy  } from "firebase/firestore";
import { app } from "./firebase-config";
import { saveToStorage } from "./storage";

const db = getFirestore(app);
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

export const saveToFirestore = async (title, user, imgU,sendTo) => {
    try {
        const docRef = await addDoc(collection(db, "messages"), {
          from: user.displayName,
          to:sendTo,
          picTitle: title,
          imageUrl: LOADING_IMAGE_URL,
          timeStamp: serverTimestamp()
        });
        // console.log("Document written with ID: ", docRef.id);
        saveToStorage(imgU, user.uid,docRef,title);
        alert("Message sent :)")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const loadMessage = async (user) => {
  try {
    const q = query(collection(db, "messages"), orderBy("timeStamp" , "desc"), where("to", "==", user.uid), limit(1) );
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    let docData = ""
    let docRef=""
    // console.log({querySnapshot})
    querySnapshot.forEach((doc) => {
      // console.log(doc)
      if(doc){
        docData = doc.data() || "https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/tenantlogos/26612.png"
        docRef=doc
      }
    });
    return [docRef,docData]
  } catch (error) {
    alert("You have no messages :c")
    return["",""]
  }

    // Query the first page of docs
// const first = query(collection(db, "messages"), orderBy("timeStamp" , "desc"), limit(1), where("to", "==", user.uid) );
// const documentSnapshots = await getDocs(first);


}
export const loadNext = async (user,docRef) => {
  try {
    const q = query(collection(db, "messages"), orderBy("timeStamp" , "desc"), limit(1), where("to", "==", user.uid),startAfter(docRef),limit(1));
    const querySnapshot = await getDocs(q);
    // console.log("lee docs")
    let docData = ""
    let docRefNew=""
    // console.log({querySnapshot})
    querySnapshot.forEach((doc) => {
      // console.log(doc)
      if(doc){
        docData = doc.data() || "https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/tenantlogos/26612.png"
        docRefNew=doc
      }
    });
    return [docRefNew,docData]
  } catch (error) {
    alert("You have no messages :c")
    return["",""]
  }
}
