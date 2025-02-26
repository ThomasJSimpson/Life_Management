import axios from "axios";

const translateWithMyMemory = async (text, sourceLang = "en", targetLang = "fr") => {
  try {
    const response = await axios.get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error("Erreur avec MyMemory :", error);
    return text;
  }
};
export default translateWithMyMemory;
