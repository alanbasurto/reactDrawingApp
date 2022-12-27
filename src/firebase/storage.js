import { updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadString  } from "firebase/storage";
import { app } from "./firebase-config";

const storage = getStorage(app);

export const saveToStorage = async (imgU, uid, docRef, title) => {
    const filePath = `${uid}/${docRef.id}/${title}.jpg`;
    const newImageRef = ref(storage, filePath);
    const fileSnapshot = await uploadString(newImageRef, imgU, 'data_url');
    const publicImageUrl = await getDownloadURL(newImageRef);
    await updateDoc(docRef,{
            imageUrl: publicImageUrl,
            storageUri: fileSnapshot.metadata.fullPath
          });
    // console.log("OK")
}
