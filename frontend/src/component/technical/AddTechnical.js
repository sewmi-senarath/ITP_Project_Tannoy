import React, { useEffect, useState } from 'react';
import App from '../../App';
import axios from "axios";


const URL = "http://localhost:5000/Technical";

const fetchHandler = async () =>{
    return await axios.get(URL).then((res)=> res.data);
}
function AddTechnical() {
    const [technical, setTechnicals] = useState;
    useEffect(()=> {
        fetchHandler().then((data) => setTechnicals(data.AddTechnical))
    },[])
  return (
    <div>
        <App></App>
        <h1>Technical Details Display page</h1>
      
    </div>
  );
}

export default AddTechnical;
