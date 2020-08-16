import React, { useState, useEffect, useCallback, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function FilterInput({ flags, setFlags, allFlags, setAllFlags }) {
  const [userInput, setUserInput] = useState("");
  console.log({ flags, allFlags });
  const filteredFlags = () => {
    const filtered = allFlags.filter(flag => {
      return flag.name.toLowerCase().includes(userInput);
    });
    setFlags(filtered);
  };

  useEffect(() => {
    async function getFlags() {
      console.log("woo");
      const { data } = await axios.get("https://restcountries.eu/rest/v2/all");
      setFlags(data.slice(0, 50));
      setAllFlags(data.slice(0, 50));
    }
    if (userInput.length === 0) {
      getFlags();
    }
  }, [userInput]);

  useEffect(() => {
    filteredFlags();
  }, [userInput]);

  return (
    <input
      type="text"
      placeholder="search"
      value={userInput}
      onChange={e => setUserInput(e.target.value.toLowerCase())}
    />
  );
}

const ShowFlags = ({ flags }) => {
  if (!flags) return null;

  return (
    <ul>
      {flags.map(flag => {
        return (
          <li key={Math.random()}>
            {flag.name}
            <img width="48" height="48" src={flag.flag} />
          </li>
        );
      })}
    </ul>
  );
};
function App() {
  const [flags, setFlags] = useState([]);
  const [allFlags, setAllFlags] = useState([]);

  return (
    <div className="App">
      <FilterInput
        flags={flags}
        setFlags={setFlags}
        allFlags={allFlags}
        setAllFlags={setAllFlags}
      />
      <ShowFlags flags={flags} />
    </div>
  );
}

export default App;
