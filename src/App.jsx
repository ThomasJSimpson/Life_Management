import "./App.css";
import CatFact from "./services/CatFact";
import Twitter from "./services/Twitter";
import VideoGames from "./services/VideoGames";
import YoutubePlaylists from "./services/YoutubePlaylists";

function App() {
  return (
    <>
      <CatFact />
      <Twitter />
      <VideoGames />
      <YoutubePlaylists />
    </>
  );
}

export default App;
