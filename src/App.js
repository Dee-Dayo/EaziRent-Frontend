import './App.css';
import {useRoutes} from "react-router-dom";
import {ROUTES} from "./routes";
import axios from "axios";

axios.defaults.withCredentials=true;

function App() {
  return (
      useRoutes(ROUTES)
  );
}

export default App;
