<p align="center"> 
  <img src="src/assets/dopamine_logo.png" width="20%" height="20%"> 
</p>
<div align="center"> 

![Static Badge](https://img.shields.io/badge/status-in%20development-orange)
![Static Badge](https://img.shields.io/badge/frontend-Angular-green)
![Static Badge](https://img.shields.io/badge/backend-Firebase-green)

</div>

# Dopamine - Your personal movie & TV show diary 🍿🎬

## About 📖
Dopamine is your personal movie diary application that helps you keep track of the films you watch.
Whether you're a casual moviegoer or a cinephile, Dopamine provides you with a simple yet powerful way to manage your movie collection,
discover new films, and track your viewing habits. With Dopamine, you can easily browse movies, add them to your playlists or watchlist, and view statistics about your movie-watching journey.
## Features 📋 

- ✅ Browse movies and TV shows
- ✅ Create playlists
- ✅ Add movies and TV shows to your playlists
- ⌛Get advanced statistics about your movie-watching habits
- ...and more to come!
## Building & Running 🛠️
1. Install Node.js from [here](https://nodejs.org/en/download/).
2. `git clone https://github.com/JakubKonkol/Dopamine.git || cd Dopamine `
3. `npm install`
4. create `src/environments/environment.development.ts` file with the following content:
```typescript
export const environment = {
  TMDB_API_KEY: 'tmdb api key ',
  firebaseConfig: {
    apiKey: "xxx",
    authDomain: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx",
    measurementId: "xxx"
  }
}
```
5. `ng serve --open`
## Credits 🙏
