import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Container, Grid } from '@mui/material';
import { Language, PrizeData, languages } from './Types';
import { Route, redirect, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import SelectPage from './pages/SelectPage';
import TablePage from './pages/TablePage';


export default function App() {
  const nobelDataFetched = useRef(false)
  const [nobelData, setNobelData] = useState<PrizeData[]>([])
  const [yearOptions, setYearOptions] = useState<number[]>([])

  useEffect(() => {
    if (nobelDataFetched.current) { return }
    nobelDataFetched.current = true
    fetchAndSetNobelData(setNobelData, setYearOptions)
  }, [nobelData, nobelDataFetched, yearOptions])

  const router = getRouter(nobelData, yearOptions)

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100vh' }}>
          <RouterProvider router={router} />
        </Grid>
      </Container>
    </div>
  );
}

async function fetchAndSetNobelData(setData: (data: PrizeData[]) => any, setYears: (years: number[]) => any): Promise<void> {
  const res = await fetch('https://api.nobelprize.org/2.1/nobelPrizes')
  if (!res.ok) {
    console.log(res)
    alert(`Fetch error`)
    return
  }
  const data = await res.json()
  const parsedData: PrizeData[] = data.nobelPrizes.map((a: any) =>
  ({
    year: Number(a.awardYear),
    date: new Date(a.dateAwarded),
    category: a.category,
    reward: a.prizeAmount
  }))
  setData(parsedData)
  setYears(parsedData.map(a => a.year).filter((a, i, arr) => arr.indexOf(a) === i))
}

function getRouter(nobelData: PrizeData[], yearOptions: number[]) {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={
          <SelectPage yearOptions={yearOptions} />
        } />
        <Route path="/nagrody/:year" loader={({ params }) => {
          return redirect(`/nagrody/en/${params.year}`)
        }} />
        <Route path="/nagrody/:language/:year"
          loader={({ params }) => {
            if (isNaN(Number(params.year))) {
              return redirect('/')
            }
            if (!languages.includes(params.language as Language)) {
              return redirect(`/nagrody/en/${params.year}`)
            }
            return null
          }}
          element={
            <TablePage data={nobelData} />
          } />
        <Route path="*" loader={() => {
          return redirect(`/`)
        }} />
      </>
    )
  )
}
