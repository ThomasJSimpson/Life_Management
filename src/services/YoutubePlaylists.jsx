import { useEffect, useState } from "react";
import axios from "axios";

function YoutubePlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  const authenticateYoutube = () => {
    window.location.href = "http://localhost:5000/auth/youtube";
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/youtube/playlists")
      .then((response) => setPlaylists(response.data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const openPopup = async (playlistId) => {
    try {
      const response = await axios.get(`http://localhost:5000/youtube/playlist/${playlistId}`);
      setSelectedPlaylist(response.data);
      setCurrentVideo(null);
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos :", error);
    }
  };

  const closePopup = () => {
    setSelectedPlaylist(null);
    setCurrentVideo(null);
  };

  const playVideo = (videoId) => {
    setCurrentVideo(videoId);
  };

  return (
    <div>
      <h1>Mes Playlists YouTube</h1>
      <button onClick={authenticateYoutube}>Se connecter à YouTube</button>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            {playlist.snippet.title}
            <button onClick={() => openPopup(playlist.id)}>Lire</button>
          </li>
        ))}
      </ul>
      <h1>Ma Timeline Twitter</h1>
      <iframe src="http://localhost:5000/twitter.html" width="100%" height="600px" frameBorder="0" title="Twitter Timeline"></iframe>
      {selectedPlaylist && (
        <div style={{ position: "fixed", top: "10%", left: "10%", width: "80%", background: "white", padding: "20px", border: "1px solid black", zIndex: 1000 }}>
          <h2>Vidéos de la playlist</h2>
          {currentVideo ? (
            <div>
              <iframe width="560" height="315" src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              <button onClick={() => setCurrentVideo(null)}>Retour à la liste</button>
            </div>
          ) : (
            <ul style={{ maxHeight: "300px", overflowY: "auto" }}>
              {selectedPlaylist.map((item) => (
                <li key={item.id} onClick={() => playVideo(item.snippet.resourceId.videoId)} style={{ cursor: "pointer", padding: "5px", background: "#f0f0f0", margin: "5px 0", display: "flex", alignItems: "center" }}>
                  <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} style={{ width: "120px", marginRight: "10px" }} />
                  {item.snippet.title}
                </li>
              ))}
            </ul>
          )}
          <button onClick={closePopup}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default YoutubePlaylists;
