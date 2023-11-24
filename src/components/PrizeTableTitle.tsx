import { Toolbar, Typography } from '@mui/material'
import { Language } from '../Types'
import LanguageSelect from './LanguageSelect'

interface PrizeTableTitleProps {
  language: Language
  onLanguageChange: (language: Language) => any
}

export default function PrizeTableTitle({ language, onLanguageChange }: PrizeTableTitleProps) {
  return (
    <Toolbar sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
    }}>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div">
        Lista Nagród Nobla
      </Typography>
      <LanguageSelect currentLanguage={language} onLanguageChange={onLanguageChange} width={35} height={30} />
    </Toolbar>
  )
}