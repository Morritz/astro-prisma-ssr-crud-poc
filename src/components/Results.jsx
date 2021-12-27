import React, { useEffect, useState } from "react";

const parseAstroResponse = (res) => {
  return JSON.parse(res.replace(/(<([^>]+)>)/gi, ""));
};

const sendRequest = (url, body, callback) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((text) => callback(text));
};

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    sendRequest("http://localhost:3000/read", {}, (text) => {
      const data = parseAstroResponse(text);
      setResults(data);
    });
  }, []);

  const deleteResult = (id) => {
    sendRequest("http://localhost:3000/delete", { id }, (text) => {
      const data = parseAstroResponse(text);
      if (data.id == id) {
        setResults(
          results.filter(function (result) {
            return result.id !== id;
          })
        );
      }
    });
  };

  return results && results.length > 0 ? (
    results.map((result) => (
      <div
        className="w-4/5 mx-auto my-4 bg-black/75 text-white p-10 leading-10 rounded-2xl shadow-lg"
        key={result.id}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
          onClick={() => {
            deleteResult(result.id);
          }}
        >
          X
        </button>
        <div className="flex flex-row justify-between">
          <div>
            <div className="inline-flex">
              <div className="text-gray-400 pr-2 italic">autor </div>
              <div>{result.author}</div>
            </div>
            <br />
            <div className="inline-flex">
              <div className="text-gray-400 pr-2 italic">tytuł </div>
              <div className="text-3xl">{result.name}</div>
            </div>
          </div>
          <div>
            <img className="max-h-36" src={result.bookCover} />
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="w-4/5 mx-auto my-4 bg-black/75 text-white p-10 leading-10 rounded-2xl shadow-lg">
      Brak rezultatów :(
    </div>
  );
};

export default Results;
