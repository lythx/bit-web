import { Language, languages } from '../Types'
import {
  Box
} from '@mui/material'

const languageIcons: { [language in Language]: string } = {
  en: require('../assets/uk_flag.png'),
  se: require('../assets/se_flag.png'),
  no: require('../assets/no_flag.png')
}

interface LanguageSelectProps {
  currentLanguage: string
  onLanguageChange: (language: Language) => any
  width: number
  height: number
}

export default function LanguageSelect({ currentLanguage, onLanguageChange, width, height }: LanguageSelectProps) {

  const changeLanguage = (language: Language) => {
    if (language === currentLanguage) { return }
    onLanguageChange(language)
  }

  return (
    <>
      {languages.map((a, i) => {
        const sx = a === currentLanguage ? {} : {
          opacity: 0.4, '&:hover': {
            opacity: 1
          }
        }
        return (
          <Box height={height} width={width} key={i} margin={1} sx={sx}
            onClick={() => changeLanguage(a)} >
            <img src={languageIcons[a]} width="100%" height="100%" alt={`${a}-flag`}
              style={{
                cursor: 'pointer'
              }} />
          </Box>)
      })}
    </>
  )
}