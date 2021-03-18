import axios from "axios";
import Router from "./Router";

axios.defaults.withCredentials = true;

function App() {
  return <Router />;
}

export default App;
