import axios from "axios";
import {environment} from "../environments/environment";

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers:{
    Accept: 'application/json',
    Authorization: 'Bearer '+environment.TMDB_API_KEY,
  }
})
