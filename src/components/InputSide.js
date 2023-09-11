import { useContext } from "react";
import { VigenereContext } from "../App";
import LanguageButtons from "./LanguageButtons";

const InputSide = () => {
  const {
    t,
    i18n,
    letters,
    setPassword,
    setText,
    setAnswer,
    password,
    text,
    answer,
    cipher,
    decipher,
    setCol,
    setRow,
  } = useContext(VigenereContext);

  const handlePassword = (event) => {
    const value = event.target.value.toLowerCase();

    if (value.split(" ").length > 1) {
      alert(t("alert-one-word"));
      return;
    }

    for (const char of value) {
      if (!letters.includes(char)) {
        alert(`${t("alert-invalid-characters")}\n${t("letters")}`);
        return;
      }
    }

    setPassword(value);
  };

  const handleText = (event) => {
    const value = event.target.value.toLowerCase();

    for (const char of value) {
      if (char === " ") {
        continue;
      }
      if (!letters.includes(char)) {
        alert(`Invalid character. \nuse letters found in: ${t("letters")}`);
        return;
      }
    }

    setText(value);
  };

  const clear = () => {
    setAnswer("");
    setText("");
    setPassword("");
    setCol(null);
    setRow(null);
  };

  return (
    <div className="input-side">
      <div className="pass-text">
        <label style={i18n.language === "ar" ? { alignSelf: "end" } : {}}>
          {t("password")}
        </label>
        <input
          style={
            i18n.language === "ar"
              ? { alignSelf: "end", direction: "rtl", fontSize: "large" }
              : {}
          }
          type="text"
          value={password}
          onChange={handlePassword}
        />
        <label style={i18n.language === "ar" ? { alignSelf: "end" } : {}}>
          {t("text")}
        </label>
        <textarea
          style={
            i18n.language === "ar"
              ? { alignSelf: "end", direction: "rtl", fontSize: "large" }
              : {}
          }
          value={text}
          onChange={handleText}
        ></textarea>
      </div>
      <div className="buttons">
        <button onClick={cipher}>{t("cipher")}</button>
        <button onClick={decipher}>{t("decipher")}</button>
        <button onClick={clear}>{t("clear")}</button>
      </div>
      <textarea
        style={
          i18n.language === "ar"
            ? { alignSelf: "end", direction: "rtl", fontSize: "large" }
            : {}
        }
        className="ciphered"
        readOnly
        value={answer}
      ></textarea>
      <LanguageButtons />
    </div>
  );
};

export default InputSide;
