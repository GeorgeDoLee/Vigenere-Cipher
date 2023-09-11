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
    <div className="flex flex-row justify-center items-center gap-4 text-xs text-skin">
      {buttons.map((button, i) => (
        <button
          key={i}
          className="duration-300 hover:text-gray-200 active:scale-95"
          onClick={() => i18n.changeLanguage(button.lang)}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
};

export default LanguageButtons;
