import React, { ReactElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../redux/rootSlice'
import { ICount } from '../../redux/rootSlice';
import { Circle } from 'rc-progress';
const Home = (): ReactElement => {
  const count = useSelector((state: ICount) => state.value);

  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Access the selected file(s) using event.currentTarget.files
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      // Handle the selected file(s) here
      const selectedFile = files[0];
      setSelectedFile(selectedFile)
    }
  };
  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const chunkSize = 5 * 1024 * 1024; // 5MB (adjust based on your requirements)
    const totalChunks = Math.ceil(selectedFile.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;

    const uploadNextChunk = async () => {
      if (end <= selectedFile.size) {
        const chunk = selectedFile.slice(start, end);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber.toString());
        formData.append("totalChunks", totalChunks.toString());
        formData.append("originalname", selectedFile.name);

        fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,

        })
          .then((response) => response.json())
          .then((data) => {
            console.log({ data });
            const temp = `Chunk ${chunkNumber + 1
              }/${totalChunks} uploaded successfully`;
            setStatus(temp);
            setProgress(Number((chunkNumber + 1) * chunkProgress));
            console.log(temp);
            chunkNumber++;
            start = end;
            end = start + chunkSize;
            uploadNextChunk();
          })
          .catch((error) => {
            console.error("Error uploading chunk:", error);
          });
      } else {
        setProgress(100);
        setSelectedFile(null);
        setStatus("File upload completed");
      }
    };

    uploadNextChunk();
  };

  return (
    <div>
      <h2>Resumable File Upload</h2>
      <h3>{status}</h3>
      <div className='w-20 h-20'>
        <Circle percent={progress} strokeWidth={4} strokeColor="#D3D3D3" />
      </div>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default Home;
