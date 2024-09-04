import { useState } from "react";
import openai from "../utils/openai";

const SearchGPT = () => {
  const [error, setError] = useState("");
  const handleSearch = async (e) => {
    try {
      const aisearch = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
      });
    } catch ({ message }) {
      setError(message);
    }
  };
  return (
    <div className="bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/81fe52dd-5b43-4b5c-975a-436256a1778d/PK-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg)] bg-cover">
      <div className="min-h-dvh flex flex-col items-center justify-center">
        <form
          className="bg-black/80 p-5 rounded-md flex w-3/4 mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="border-0 w-3/4 h-12 p-4 outline-none"
            type="text"
            placeholder="Eg: Hollywood thrill movies of wade wilson"
          />
          <button
            className="flex-grow bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
        {error && (
          <div className="p-2 bg-red-500 text-white w-3/4 mx-auto">{error}</div>
        )}
      </div>
    </div>
  );
};

export default SearchGPT;
