import { useState } from 'react';
import './css/App.css';
import { useTranslation } from 'react-i18next';

function VigenereCipher() {
  const [t, i18n] = useTranslation("global");
  const letters = t("letters");
  const table = Array.from({ length: letters.length }, (_, i) =>Array.from({ length: letters.length }, (_, j) => letters[(i + j) % letters.length]));
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);
  const [buttonsStyle, setButtonsStyle] = useState({width: '400px', fontSize: 'large'});
  const [tableSize, setTableSize] = useState('650px');

  const handleTranslation = (lang) => {
    switch(lang){
      case 'ge':
        setTableSize('650px');
        setButtonsStyle({ width: '400px', fontSize: 'large' });
        break;
      case 'en':
        setTableSize('600px');
        setButtonsStyle({ width: '400px', fontSize: 'large' });
        break;
      case 'gr':
        setTableSize('600px');
        setButtonsStyle({ width: '500px', fontSize: 'medium' });
        break;
      case 'am':
        setTableSize('650px');
        setButtonsStyle({ width: '400px', fontSize: 'large' });
        break;
      case 'ar':
        setTableSize('650px');
        setButtonsStyle({width: '300px', fontSize: 'x-large'});
        break;
    }
    clear();
    i18n.changeLanguage(lang);
  };

  const handlePassword = (event) => {
    const value = event.target.value.toLowerCase();

    if (value.split(' ').length > 1) {
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
      if(char === ' '){
        continue;
      }
      if (!letters.includes(char)) {
        alert(`Invalid character. \nuse letters found in: ${t("letters")}`);
        return;
      }
    }
  
    setText(value);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const cipher = async() => {
    if (!password || !text) {
      setAnswer('');
      alert(t("alert-to-fill"));
      return;
    }
  
    let k = 0;
    let cipheredText = '';
  
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        cipheredText += ' ';
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

  const decipher = async() => {
    if (!password || !text) {
      setAnswer('');
      alert(t("alert-to-fill"));
      return;
    }
    let k = 0;
    let decipheredText = '';

    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        decipheredText += ' ';
      } else {
        for(let j = 0; j < letters.length; j++){
          if(table[letters.indexOf(password[k])][j] === text[i]){
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
  }
  

  const clear = () => {
    setAnswer('');
    setText('');
    setPassword('');
    setCol(null);
    setRow(null);
  }

  return (
    <div className="main">
      <table style={{width: tableSize, height: tableSize}}> 
        <tbody>
          {letters.split('').map((_, i) => (
            <tr key={i} style={{backgroundColor: i === row ? 'red': 'transparent'}}>{letters.split('').map((_, j) => (
                <td 
                  key={j} 
                  style={{
                    backgroundColor: i === row && j === col ? 'purple': j === col ? 'red': 'transparent',
                  }}
                >{table[i][j]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="input-side">
        <div className='pass-text'>
          <label style={i18n.language === 'ar'? {alignSelf: 'end'}: {}}>{t("password")}</label>
          <input style={i18n.language === 'ar'? {alignSelf: 'end', direction: 'rtl', fontSize: 'large'}: {}} type="text" value={password} onChange={handlePassword} />
          <label style={i18n.language === 'ar'? {alignSelf: 'end'}: {}}>{t("text")}</label>
          <textarea style={i18n.language === 'ar'? {alignSelf: 'end', direction: 'rtl', fontSize: 'large'}: {}} value={text} onChange={handleText}></textarea>
        </div>

        <div className="buttons" style={{width: buttonsStyle.width}}>
          <button style={{fontSize: buttonsStyle.fontSize}} onClick={cipher}>{t("cipher")}</button>
          <button style={{fontSize: buttonsStyle.fontSize}} onClick={decipher}>{t("decipher")}</button>
          <button style={{fontSize: buttonsStyle.fontSize}} onClick={clear}>{t("clear")}</button>
        </div>

        <textarea style={i18n.language === 'ar'? {alignSelf: 'end', direction: 'rtl', fontSize: 'large'}: {}} className='ciphered' readOnly value={answer}></textarea>

        <div className="languages">
          <button onClick={() => handleTranslation('ge')}>ქართული</button>
          <button onClick={() => handleTranslation('en')}>English</button>
          <button onClick={() => handleTranslation('gr')}>Ελληνικά</button>
          <button onClick={() => handleTranslation('am')}>Հայերեն</button>
          <button onClick={() => handleTranslation('ar')}>العربية</button>
        </div>
      </div>
    </div>
  );
}

export default VigenereCipher;