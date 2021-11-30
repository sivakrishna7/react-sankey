import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { useActions } from "../hooks";

function LanguageSelector() {
  const { languageOptions, language } = useSelector((store) => store.i18nState);
  const { i18n } = useTranslation();
  const { changeLanguage } = useActions();
  const handleLanguageChange = (event) => {
    changeLanguage({ language: event.target.value });
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
        <InputLabel data-testid="language-label" id="language-id">
          Language
        </InputLabel>
        <Select
          labelId="language-id"
          value={language}
          onChange={handleLanguageChange}
          autoWidth
        >
          {languageOptions.map((option) => (
            <MenuItem
              key={option.key}
              value={option.value}
              data-testid="select-option"
            >
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
