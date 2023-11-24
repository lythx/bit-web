import { Language, PrizeData } from '../Types'
import {
  TableBody, TableCell, TableRow, Typography
} from '@mui/material'

interface PrizeTableBodyProps {
  rows: PrizeData[]
  emptyRows: number
  language: Language
}

export default function PrizeTableBody({ rows, emptyRows, language }: PrizeTableBodyProps) {

  const formatDate = (date: Date) => {
    if (isNaN(date.getTime())) {
      return '-'
    }
    return `${date.getDate().toString().padStart(2, "0")}.${date.getMonth().toString().padStart(2, "0")}.${date.getFullYear()}`
  }

  const formatReward = (reward: number) =>
    (reward).toString().split('').reduceRight((acc, cur, i, arr) =>
      (arr.length - i) % 3 === 1 ? `${cur} ${acc}` : `${cur}${acc}`, '')

  return (
    <TableBody>
      {rows.map((row, index) => {
        return (
          <TableRow
            hover
            key={index}
          >
            <TableCell align="right">{index + 1}</TableCell>
            <TableCell align="right">{row.year}</TableCell>
            <TableCell align="right">{row.category[language]}</TableCell>
            <TableCell align="right">{formatDate(row.date)}</TableCell>
            <TableCell align="right">{formatReward(row.reward)}</TableCell>
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
      {rows.length === 0 &&
        <TableRow>
          <TableCell align="center" colSpan={6}>
            <Typography variant="h6">Brak Nagród</Typography>
          </TableCell>
        </TableRow>}
    </TableBody>
  )
}