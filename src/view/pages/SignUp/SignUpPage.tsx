import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { signUp } from '../../../firebase/signUp';
import { AlertSnackbar } from '../../components/Common/AlertSnackbar';
import { UserRepositoryDatabase } from '../../../infra/repository/UserRepositoryDatabase';
import { CompanyRepositoryDatabase } from '../../../infra/repository/CompanyRepositoryDatabase';
import { fetchCompanies } from '../../../infra/services/fetchCompanies';
import { Company } from '../../../domain/entities/Company';

type Props = {};

export const SignUpPage: FunctionComponent<Props> = ({}) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedAccessType, setSelectedAccessType] = useState('');

  useEffect(() => {
    fetchCompanies(setCompanies);
  }, []);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSelectCompany = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  const handleSelectAccessType = (event: SelectChangeEvent) => {
    setSelectedAccessType(event.target.value);
  };

  const areSamePasswords = () => password === confirmPassword && password;

  const handleSignUp = async () => {
    if (!areSamePasswords()) return setError('Senhas digitadas são diferentes');
    try {
      //   await signUp(email, password);
      const userRepo = new UserRepositoryDatabase();
      await userRepo.createUser(email, password);
      setSuccessMessage('Usuário Cadastrado');
      //   setEmail('');
      //   setPassword('');
      //   setConfirmPassword('');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onAlertClose = () => {
    setError(undefined);
    setSuccessMessage(undefined);
  };
  //lovelove
  const isAdmin = userId === '8apvlVyigrYY4cTJ9E2xl9LZvlS2';

  return (
    <>
      {isAdmin ? (
        <>
          <Box
            sx={{
              width: '100%',
              height: '35px',
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              verticalAlign: 'center',
              marginBottom: '15px',
            }}
          >
            <Typography variant='h5'>GuardiaoTec</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                '& > *': {
                  //   margin: 1,
                  //   width: '95%',
                  marginBottom: 1,
                },
                // marginBottom: 1,
                width: '400px',
                padding: '10px',
              }}
            >
              <CardHeader
                title='Cadastro de Usuário'
                sx={{ textAlign: 'center' }}
              />
              <Box sx={{ mb: 1.3 }}>
                <TextField
                  id='standard-basic'
                  type='email'
                  value={email}
                  onChange={handleEmail}
                  label='E-mail'
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 1.3 }}>
                <TextField
                  id='standard-basic1'
                  type='password'
                  value={password}
                  onChange={handlePassword}
                  label='Senha'
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 1.3 }}>
                <TextField
                  id='standard-basic1'
                  type='password'
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  label='Confirmar Senha'
                  fullWidth
                />
              </Box>
              <Box sx={{ mb: 1.3 }}>
                <FormControl sx={{ minWidth: 120 }} fullWidth>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Transportadora de participação
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={selectedCompany || ''}
                    label={'Transportadora de participação'}
                    onChange={handleSelectCompany}
                    fullWidth
                  >
                    {companies &&
                      companies.map((company: Company) => {
                        return (
                          <MenuItem
                            key={company.values.CNPJ}
                            value={company.values.Transportadora}
                          >
                            {company.values.Transportadora}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mb: 1.3 }}>
                <FormControl sx={{ minWidth: 120 }} fullWidth>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Tipo de acesso
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-helper-label'
                    id='demo-simple-select-helper'
                    value={selectedCompany || ''}
                    label={'Tipo de acesso'}
                    onChange={handleSelectCompany}
                    fullWidth
                  >
                    {['Administrador', 'Editor'].map((type) => {
                      return (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant='contained'
                color='primary'
                fullWidth
                size='small'
                onClick={handleSignUp}
              >
                Cadastrar
              </Button>
              {/* <Box>
            </Box> */}
            </Card>
          </Box>
          <AlertSnackbar
            open={!!error}
            onClose={onAlertClose}
            severity='warning'
          >
            {error}
          </AlertSnackbar>
          <AlertSnackbar
            open={!!successMessage}
            onClose={onAlertClose}
            severity='success'
          >
            {successMessage}
          </AlertSnackbar>
        </>
      ) : (
        <p>not admin</p>
      )}
    </>
  );
};
