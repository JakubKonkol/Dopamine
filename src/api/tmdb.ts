import axios from "axios";

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers:{
    Accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2MxYjZiMzQ1ZTVkMTEyNTJkMmNiNjUyMDk5MDFjZiIsInN1YiI6IjY0ZGI1ZTdhNzcxOWQ3MDEwMjUyM2ViNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Va3u9NKE5wXa7QU5tRLAJQeMB5R_IggQi792tszDL8s',
  }
})
