import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Table from "./components/Table";
import InputSide from "./components/InputSide";
import LanguageButtons from "./components/LanguageButtons";

export const VigenereContext = React.createContext({});

function VigenereCipher() {
  const [t, i18n] = useTranslation("global");
  const letters = t("letters");
  const table = Array.from({ length: letters.length }, (_, i) =>
    Array.from(
      { length: letters.length },
      (_, j) => letters[(i + j) % letters.length]
    )
  );
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const cipher = async () => {
    if (!password || !text) {
      setAnswer("");
      alert(t("alert-to-fill"));
      return;
    }

    let k = 0;
    let cipheredText = "";

    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        cipheredText += " ";
      } else {
        const rowIndex = letters.indexOf(text[i]);
        const colIndex = letters.indexOf(password[k]);
        if (rowIndex !== -1 && colIndex !== -1) {
          cipheredText += table[rowIndex][colIndex];
          setRow(rowIndex);
          setCol(colIndex);
          setAnswer(cipheredText);
          k = (k + 1) % password.length;
          await delay(250);
          setRow(null);
          setCol(null);
        }
      }
    }
  };

  const decipher = async () => {
    if (!password || !text) {
      setAnswer("");
      alert(t("alert-to-fill"));
      return;
    }
    let k = 0;
    let decipheredText = "";

    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        decipheredText += " ";
      } else {
        for (let j = 0; j < letters.length; j++) {
          if (table[letters.indexOf(password[k])][j] === text[i]) {
            decipheredText += letters[j];
            setRow(letters.indexOf(text[i]));
            setCol(letters.indexOf(password[k]));
            setAnswer(decipheredText);
            await delay(250);
            setRow(null);
            setCol(null);
            break;
          }
        }
        k = (k + 1) % password.length;
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-obsidian flex items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-12">
        <VigenereContext.Provider
          value={{
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
            row,
            col,
            table,
          }}
        >
          <Table />
          <div className="h-full">
            <InputSide />
            <LanguageButtons />
          </div>
        </VigenereContext.Provider>
      </div>
    </div>
  );
}

export default VigenereCipher;
