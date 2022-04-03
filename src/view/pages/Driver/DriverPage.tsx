import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Driver } from '../../../domain/entities/Driver';
import { DriverRepositoryDatabase } from '../../../infra/repository/DriverRepositoryDatabase';
import moment from 'moment';
import { RootState } from '../../../application/store/configureStore';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { canRegister } from '../../../application/service/canRegister';
import { TargetFilter } from './DriverFilter';

type Props = {};

export const DriverPage: FunctionComponent<Props> = ({}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);

  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  console.log(drivers);

  const fetchDrivers = async (
    shouldGetAll: boolean,
    userCompanyId?: string
  ) => {
    const repo = new DriverRepositoryDatabase();

    if (shouldGetAll) {
      const drivers = await repo.adminGetAllDrivers();
      setDrivers(drivers);
    } else {
      const drivers = await repo.getDriversFromCompanyId(userCompanyId!);
      setDrivers(drivers);
    }
  };

  useEffect(() => {
    if (!isAdmin && userCompanyId) {
      fetchDrivers(false, userCompanyId);
    }
  }, [userCompanyId, userId]);

  useEffect(() => {
    if (isAdmin && adminSelectedCompanyId) {
      const shouldGetAll = adminSelectedCompanyId === 'Todas';
      fetchDrivers(shouldGetAll, adminSelectedCompanyId);
    }
  }, [isAdmin, adminSelectedCompanyId]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const driver of filteredDrivers) {
      rows.push([
        driver.values.nome,
        driver.values.contato,
        driver.values.cnh,
        moment(driver.values.vencimento).format('MM/YYYY'),
      ]);
    }
    return rows;
  };

  const driversTableHead = ['Nome', 'Contato', 'CNH', 'Vencimento CNH'];
  const driversTableRows = makeTableRows();

  const onRowUpdate = () => {
    console.log('onRowUpdate driverPage');
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div>
        {isAdmin && <CompanyFilter />}
        <TargetFilter
          targets={drivers}
          setFilteredTargets={setFilteredDrivers}
          filterField='nome'
        />
        <Box
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
        >
          <Button
            component={Link}
            to={`/driver/register`}
            variant='contained'
            color='primary'
            disabled={!canRegister()}
          >
            Cadastrar
          </Button>
        </Box>
      </div>
      <CustomTable
        tableHead={driversTableHead}
        tableRows={driversTableRows}
        onRowUpdate={onRowUpdate}
      />
    </div>
  );
};
