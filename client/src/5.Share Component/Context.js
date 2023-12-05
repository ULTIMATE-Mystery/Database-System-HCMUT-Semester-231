import React, { useState, useEffect } from "react"

const HeaderDefine = React.createContext();

let session = {
  phone: '097100000',
  role: 'Patient',
  name: 'Phuc Huynh',
  img: ''
};


export const HeaderProvider = ({ children }) => {
  const [phone, setPhone] = useState(session.phone);
  const [role, setRole] = useState(session.role);
  const [name, setName] = useState(session.name);
  const [img, setImg] = useState(session.img);

  return (
    <HeaderDefine.Provider value={{ phone, role, name, setPhone, setRole, setName, img, setImg }}>
      {children}
    </HeaderDefine.Provider>
  );
}

export default HeaderDefine;

