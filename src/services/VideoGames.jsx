import { useEffect, useState } from "react";
import axios from "axios";

function VideoGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/igdb/games")
      .then((response) => {
        console.log(response);
        setGames(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Jeux IGDB</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default VideoGames;
