import { useEffect, useState } from "react";
import axios from "axios";
import TranslateText from "./TranslateText";

export default function CatFact() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFact = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://catfact.ninja/fact");
      const responseTranslated = TranslateText(response.data.fact);
      console.log("Réponse :", responseTranslated);
      setFact(responseTranslated);
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <div>
        <h2>Fait aléatoire sur les chats</h2>
        <div className="fact-container">{loading ? <div className="loading-spinner"></div> : <p>{fact}</p>}</div>
        <button className="marg-b" onClick={fetchFact} disabled={loading}>
          {loading ? "Chargement..." : "Nouveau fait"}
        </button>
      </div>
    </>
  );
}
