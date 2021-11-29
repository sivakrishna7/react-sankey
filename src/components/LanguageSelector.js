import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const languageOptions = [
  {
    key: "en",
    value: "English",
  },
  {
    key: "es",
    value: "Spanish",
  },
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(languageOptions[0].value);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    const selectedLanguage = languageOptions.find(
      (option) => option.value === language
    );
    i18n.changeLanguage(selectedLanguage.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="language-id">Language</InputLabel>
        <Select
          labelId="language-id"
          id="language"
          value={language}
          onChange={handleLanguageChange}
          autoWidth
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.key} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

LanguageSelector.displayName = "LanguageSelector";
export { LanguageSelector };
