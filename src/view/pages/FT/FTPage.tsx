import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { FT } from '../../../domain/entities/FT';
import { useEffect } from 'react';
import { useState } from 'react';
import { FTRepositoryDatabase } from '../../../infra/repository/FTRepositoryDatabase';
import moment from 'moment';
import { fetchFTs } from '../../../infra/services/fetchFTs';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { canRegister } from '../../../application/service/canRegister';
import { TargetFilter } from '../Common/TargetFilter';
import { RowCommand } from '../../components/Table/TableRowOptions';
import { EditFTForm } from '../../components/Forms/FT/EditFTForm';

type Props = {};

export const FTPage: FunctionComponent<Props> = ({}) => {
  const [fts, setFTs] = useState<FT[]>([]);
  const [filteredFTs, setFilteredFTS] = useState<FT[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandFT, setTargetCommandFT] = useState<FT>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchFTs(setFTs);
    // if (adminSelectedCompanyId || userCompanyId) {
    // }
  }, [adminSelectedCompanyId, userCompanyId]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const ft of filteredFTs) {
      rows.push([
        ft.values['Origem/Destino'],
        ft.values['Nº da FT'],
        ft.values['Nº da Linha'],
        moment(ft.values['Data de Vigencia Inicial']).format('DD/MM/YY'),
        ft.values['Frequência'].join(','),
        ft.values.Sentido,
      ]);
    }
    return rows;
  };

  const ftsTableHead = [
    'Origem/Destino',
    'Nº da FT',
    'Nº da Linha',
    'Data de Vigencia Inicial',
    'Frequência',
    'Sentido',
    '',
  ];
  const ftsTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const ft = fts.find((ft) => ft.values['Nº da FT'] === row[1]);
    if (!ft) return;
    setTargetCommandFT(ft);
    if (command === 'edit') setInEdit(true);
    if (command === 'delete') setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchFTs(setFTs);
  };

  return (
    <div>
      <ResponsiveAppBar />
      {isAdmin && <CompanyFilter />}
      <TargetFilter
        targets={fts}
        setFilteredTargets={setFilteredFTS}
        filterField='Nº da FT'
        filterName='Nº da FT'
      />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/workscale/register`}
          variant='contained'
          color='primary'
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={ftsTableHead}
        tableRows={ftsTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditFTForm
          open={inEdit}
          onClose={onEditClose}
          ft={targetCommandFT!}
          ftId={targetCommandFT!.values.Id!}
        />
      )}
    </div>
  );
};
