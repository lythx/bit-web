import { PrizeData, Order } from '../Types'
import {
  TableCell, TableHead, TableRow, TableSortLabel
} from '@mui/material'

interface PrizeTableHeadProps {
  onSort: (property: keyof PrizeData) => void
  order: Order
  orderBy: string
}

const idText = 'ID'
const headTexts: { [id in keyof PrizeData]: string } = {
  year: 'Rok przyznania',
  category: 'Kategoria',
  date: 'Data przyznania',
  reward: 'Kwota nagrody'
}

export default function PrizeTableHead({ order, orderBy, onSort }: PrizeTableHeadProps) {

  return (
    <TableHead>
      <TableRow>
        <TableCell align="right">{idText}</TableCell>
        {(Object.entries(headTexts) as [keyof PrizeData, string][]).map((headCell) => (
          <TableCell
            key={headCell[0]}
            align="right"
            sortDirection={orderBy === headCell[0] ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell[0]}
              direction={orderBy === headCell[0] ? order : 'asc'}
              onClick={() => onSort(headCell[0])}
            >
              {headCell[1]}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
