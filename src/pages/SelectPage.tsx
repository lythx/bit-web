import { useState } from 'react';
import { Paper, Stack, Grid, Typography, Box, Select, FormControl, InputLabel, MenuItem, Button, SelectChangeEvent } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Language } from '../Types';
import LanguageSelect from '../components/LanguageSelect';

interface SelectPageProps {
  yearOptions: number[]
}

export default function SelectPage({ yearOptions }: SelectPageProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en')
  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value))
  }
  const navigate = useNavigate()
  const handleButtonClick = () => {
    if (selectedYear === null) { return }
    if (selectedLanguage === null) {
      navigate(`/nagrody/${selectedYear}`)
    } else {
      navigate(`/nagrody/${selectedLanguage}/${selectedYear}`)
    }
  }
  return (
    <Grid item xs={3}>
      <Paper elevation={6} sx={{ padding: 4 }}>
        <Box>
          <Typography variant="h4">
            Witaj w wyszukiwarce Nagród Nobla
          </Typography>
        </Box>
        <Box paddingY={3}>
          <Typography variant="h6">
            Wybierz rok i język:
          </Typography>
        </Box>
        <Box>
          <FormControl fullWidth>
            <Stack display="flex" flexDirection="row" justifyContent="space-evenly">
              <InputLabel id="year-select-label">&nbsp;Rok</InputLabel>
              <Select
                sx={{ flex: 1, marginRight: 3 }}
                labelId="year-select-label"
                id="year-select"
                value={selectedYear ?? ""}
                label={yearOptions[0]}
                onChange={handleYearChange}
              >
                {yearOptions.map(a => <MenuItem value={a} key={a}>{a}</MenuItem>)}
              </Select>
              <LanguageSelect onLanguageChange={setSelectedLanguage} currentLanguage={selectedLanguage}
                width={42} height={40} />
            </Stack>
            <Box display="flex" justifyContent="center" alignItems="center" marginTop={3}>
              <Button variant="contained" disabled={selectedYear === null} onClick={handleButtonClick}>
                <Typography variant="body1">
                  Wyszukaj nagrody
                </Typography>
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    </Grid>
  );
}
