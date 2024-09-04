import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY
    ? process.env.REACT_APP_OPENAI_KEY
    : "My API Key",
  dangerouslyAllowBrowser: true,
});

export default openai;
