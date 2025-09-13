import axios from "axios";

// Conexão com a API .NET
const api = axios.create({
  baseURL: "https://localhost:5001/api", // URL da API
});

export default api;
