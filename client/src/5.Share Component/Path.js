import axios from "axios";
import React, { useState,useEffect} from "react"

const PathCtx = React.createContext();

let currPath = '/';
const checkData=async()=>{
  await axios.get('/api/get/session').then((res)=>{
    currPath=res.data;
} 
  )
}

export const PathProvider = ({children}) => {
useEffect(() => {
  setTimeout(() => {
      checkData();
  }, 1000);
}, []);
  const [path, setPath] = useState(currPath);
const savePath=(newpath)=>{
    setPath(newpath);
}
  return (
    <PathCtx.Provider value = {{path,setPath,savePath}}>
      {children}
    </PathCtx.Provider>
  );
}

export default PathCtx;

