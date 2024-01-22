import { useState, useEffect } from "react";
import { storefile } from "./firebase";

const StorageUse = (file) => {
  const [url, seturl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file) {
      const storageRef = storefile.ref(file.name);
      const uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        (snap) => {
          const percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          seturl(url);
        }
      );
    }
  }, [file]);
  return { url, progress, error };
};

export default StorageUse;
