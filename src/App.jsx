import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import UserCard from "./components/UserCard/UserCard";


function App() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("Data: ", userData);
  }, [userData]);

  return (
    <>
      <SearchBar setUserData={setUserData} setError={setError} setLoading={setLoading} />
      {error && <div className="text-red-600 text-center mb-2">{error}</div>}
      <UserCard userData={userData} loading={loading} />
    </>
  );
}

export default App;
