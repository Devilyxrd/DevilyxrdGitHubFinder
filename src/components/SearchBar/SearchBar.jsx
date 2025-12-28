import React, { useState } from "react";


const SearchBar = ({ setUserData, setError, setLoading }) => {
  const [username, setUsername] = useState("");
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInput = (data) => {
    setUsername(data);
    setInputError("");
    if (setError) setError("");
  };

  const getUserData = async () => {
    if (!username.trim()) {
      setInputError("Kullanıcı adı giriniz.");
      return;
    }
    setIsLoading(true);
    if (setLoading) setLoading(true);
    if (setError) setError("");
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        setUserData({});
        if (setError) setError("Kullanıcı bulunamadı.");
        setInputError("Kullanıcı bulunamadı.");
      } else {
        const data = await res.json();
        setUserData(data);
      }
    } catch (err) {
      if (setError) setError("Bir hata oluştu.");
      setInputError("Bir hata oluştu.");
      setUserData({});
    } finally {
      setIsLoading(false);
      if (setLoading) setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getUserData();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 mb-5 rounded-lg bg-white px-3 py-3 sm:py-2">
        <input
          type="text"
          placeholder="GitHub username..."
          className="border-none bg-transparent focus:outline-none text-black w-full text-sm px-1 sm:px-0"
          value={username}
          onChange={(e) => handleChangeInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          onClick={getUserData}
          className="border-none text-white bg-green-600 py-2 px-8 rounded-lg hover:bg-green-500 cursor-pointer transition-colors whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? "Yükleniyor..." : "Ara"}
        </button>
      </div>
      {inputError && (
        <div className="text-red-600 text-sm mb-2">{inputError}</div>
      )}
    </>
  );
};

export default SearchBar;
