import { useContext } from "react";
import { VigenereContext } from "../App";

const LanguageButtons = () => {
  const { i18n } = useContext(VigenereContext);
  const buttons = [
    { title: "ქართული", lang: "ge" },
    { title: "English", lang: "en" },
    { title: "Ελληνικά", lang: "gr" },
    { title: "Հայերեն", lang: "am" },
    { title: "العربية", lang: "ar" },
  ];
  return (
    <div className="languages">
      {buttons.map((button, i) => (
        <button key={i} onClick={() => i18n.changeLanguage(button.lang)}>
          {button.title}
        </button>
      ))}
    </div>
  );
};

export default LanguageButtons;
