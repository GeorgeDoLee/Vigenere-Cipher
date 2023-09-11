import { useContext } from "react";
import { VigenereContext } from "../App";

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
    <div className="self-start flex flex-col justify-center items-center gap-4 p-4">
      <div className="flex flex-col justify-evenly gap-2 text-md p-2">
        <label
          className={`mt-[10px] text-skin ${
            i18n.language === "ar" ? "self-end" : "self-start"
          }`}
        >
          {t("password")}
        </label>
        <input
          className={`w-[200px] h-[35px] p-2 rounded-md text-obsidian ${
            i18n.language === "ar" ? "self-end text-rtl " : ""
          } focus: outline-skin focus:outline-2`}
          type="text"
          value={password}
          onChange={handlePassword}
        />
        <label
          className={`mt-[10px] text-skin ${
            i18n.language === "ar" ? "self-end" : "self-start"
          }`}
        >
          {t("text")}
        </label>
        <textarea
          className={`resize-none p-2 rounded-md h-[80px] w-[445px] text-obsidian focus:outline-2 focus:outline-skin ${
            i18n.language === "ar" ? "self-end text-rtl" : ""
          }`}
          value={text}
          onChange={handleText}
        ></textarea>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <button
          className="p-2 bg-skin text-obsidian rounded-md"
          onClick={cipher}
        >
          {t("cipher")}
        </button>
        <button
          className="p-2 bg-skin text-obsidian rounded-md"
          onClick={decipher}
        >
          {t("decipher")}
        </button>
        <button
          className="p-2 bg-skin text-obsidian rounded-md"
          onClick={clear}
        >
          {t("clear")}
        </button>
      </div>
      <textarea
        className={`resize-none p-2 rounded-md h-[80px] w-[445px] text-obsidian focus:outline-2 focus:outline-skin ${
          i18n.language === "ar" ? "self-end text-rtl" : ""
        }`}
        readOnly
        value={answer}
      ></textarea>
    </div>
  );
};

export default InputSide;
