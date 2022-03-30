import React, { FunctionComponent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CustomTableRow } from './CustomTableRow';
import Paper from '@mui/material/Paper';
// import { uid } from 'react-uid';
import uuid from 'react-uuid';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

type Props = {
  tableHead: string[];
  tableRows: string[][];
  onRowUpdate: (row: string[]) => void;
};

export const CustomTable: FunctionComponent<Props> = ({
  tableHead,
  tableRows,
  onRowUpdate,
}) => {
  return (
    <TableContainer component={Paper} sx={{ height: '100%' }}>
      <Table sx={{ minWidth: 650, height: '100%' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tableHead.map((column, index) => (
              <TableCell align='center' key={uuid()}>
                <b>{column}</b>
              </TableCell>
            ))}
            {/* <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, index) => (
            <CustomTableRow row={row} key={index} onRowUpdate={onRowUpdate} />
            // <TableRow
            //   key={index}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // >
            //   {row.map((column, index) => (
            //     <TableCell align='center' key={uid(column, index)}>
            //       {column}
            //     </TableCell>
            //   ))}
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
