import axios from "axios";

export default axios.create({
  // baseURL: 'http://localhost:5050'
  baseURL: 'https://caveproject-server.onrender.com/'
});