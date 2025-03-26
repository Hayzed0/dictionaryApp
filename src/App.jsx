import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

const App = () => {
  const [words, setWords] = useState(null);
  const [search, setSearch] = useState("");
  const [audio, setAudio] = useState(null);

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      if (!response.ok) throw new error("words not found");
      const data = await response.json();

      setWords(data[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
      setWords(null); // Reset words on error
    }
  };

  const getWordMeaning = (e) => {
    e.preventDefault();
    if (search) {
      fetchData(search);
    }
  };
  const getAudioSound = () => {
    if (words && words.phonetics && words.phonetics.length > 0) {
      const audioUrl = words.phonetics[0].audio || words.phonetics[1]?.audio; // Fallback to the second audio if it exists
      if (audioUrl) {
        setAudio(audioUrl);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    }
  };

  return (
    <div className="container relative flex flex-col mx-auto items-center">
      <div className="flex flex-col w-full items-center md:w-1/2">
        <h3 className="text-3xl text-green-500 font-bold m-2">
          Free Dictionary
        </h3>
        <div className=" mt-12 mx-6 w-full items-center md:w-full">
          <form action="">
            <div className="flex w-full items-center">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 p-2 ml-4 w-4/5 rounded-sm border-green-500 focus:border-green-500 active:border-green-500  md:w-4/5"
              />
              <button
                onClick={getWordMeaning}
                className="bg-green-500 rounded-md px-4 py-3 text-white font-bold text-2xl"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
      {words && (
        <div className="w-full my-4 mx-2 items-start md:w-1/2">
          <h3 className=" mx-4 text-xl font-bold">
            {words.word}
            <button onClick={getAudioSound} className="mx-2 my-2">
              <FcSpeaker />
            </button>
          </h3>
          <div className="my-6 mx-4 items-start md:w-1/2">
            <h3 className="text-green-500 font-bold">Part of Speech:</h3>
            <p className="font-bold">{words.meanings[0].partOfSpeech}</p>
            <h3 className="mt-2 text-green-500 font-bold">Definition:</h3>
            <p>{words.meanings[0].definitions[0].definition}</p>
            <h3 className="mt-2 text-green-500 font-bold">Example:</h3>
            <p>
              {words.meanings[0].definitions[0].example ||
                "No example available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
