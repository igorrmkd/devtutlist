import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import Router from "./Router";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div>
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
