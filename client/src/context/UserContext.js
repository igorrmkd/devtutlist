import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import domain from "../util/domain";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const userRes = await axios.get(`${domain}/auth/loggedin/`);
    setUser(userRes.data);
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
