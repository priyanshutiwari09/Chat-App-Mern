const translate = require("google-translate-api-x");

const translateMessage = async (text, targetLang) => {
  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (error) {
    console.error("Translation error:", error);
    return null;
  }
};

module.exports = translateMessage;
