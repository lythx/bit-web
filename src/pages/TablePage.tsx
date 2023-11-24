import React from 'react';
import { Table, TableContainer, TablePagination, Button, Typography, Stack } from '@mui/material';
import { PrizeData, Order, LangStrings, Language } from '../Types';
import { Paper, Box, } from '@mui/material'
import PrizeTableTitle from '../components/PrizeTableTitle';
import PrizeTableHead from '../components/PrizeTableHead';
import PrizeTableBody from '../components/PrizeTableBody';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material'

const sortPredicates: { [id in keyof PrizeData]: Function } = {
  year: (a: number, b: number) => a - b,
  category: (a: LangStrings, b: LangStrings, lang: Language) => a[lang].localeCompare(b[lang]),
  date: (a: Date, b: Date) => {
    if (isNaN(a.getTime()) && isNaN(b.getTime())) { return 0 }
    if (isNaN(b.getTime())) { return -1 }
    if (isNaN(a.getTime())) { return 1 }
    return a.getTime() - b.getTime()
  },
  reward: (a: number, b: number) => a - b
}

interface TablePageProps {
  data: PrizeData[]
}

export default function TablePage({ data }: TablePageProps) {

  const getLanguage = (paramsLang?: string): Language => {
    if (['en', 'se', 'no'].includes(paramsLang as string)) {
      return paramsLang as Language
    }
    return 'en'
  }

  const navigate = useNavigate()
  const params = useParams()
  const language = getLanguage(params.language)
  const year = Number(params.year)
  const rows = data.filter(a => a.year === year)
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof PrizeData>('date')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleSort = (property: keyof PrizeData) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const sortRows = (rows: PrizeData[], orderBy: keyof PrizeData, order: Order): PrizeData[] => {
    const o = order === 'asc' ? 1 : -1
    return rows.sort((a, b) => o * sortPredicates[orderBy](a[orderBy], b[orderBy], language))
  }

  const handleLanguageChange = (language: Language) => {
    navigate(`/nagrody/${language}/${year}`)
  }

  const goToSelectPage = () => {
    navigate('/')
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = React.useMemo(() =>
    sortRows(rows, orderBy, order).slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [page, rowsPerPage, rows, orderBy, order])
  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={6} sx={{ width: '100%', mb: 2 }}>
        <PrizeTableTitle language={language} onLanguageChange={handleLanguageChange} year={year} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <PrizeTableHead
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
            />
            <PrizeTableBody rows={visibleRows} emptyRows={emptyRows} language={language} />
          </Table>
        </TableContainer>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Button sx={{ height: "50%", marginX: 1, color: 'rgb(20, 20, 20)', textTransform: 'none' }}
            onClick={goToSelectPage}>
            <Typography variant="body1" component="div">
              <Stack direction="row">
                <ArrowBack />&nbsp;Zmień rok
              </Stack>
            </Typography>
          </Button>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => handleChangePage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Ilość wierszy:'}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} z ${count !== -1 ? count : `ponad ${to}`}`}
          />
        </Box>
      </Paper>
    </Box>
  );
}
