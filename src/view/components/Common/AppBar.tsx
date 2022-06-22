import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { RootState } from "../../../application/store/configureStore";
import { useSelector } from "react-redux";
import { MarkEmailReadOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AppBarOptionsPopover } from "./AppBarOptionsPopover";
import { GuardiaoLogotype } from "../../pages/Home/GuardiaoLogotype";

const pages = [
  {
    name: "Dashboard",
    path: "/adminDashboard",
  },
  {
    name: "Ficha Técnica",
    path: "/workscale",
  },
  {
    name: "Transportadora",
    path: "/company",
  },
  {
    name: "Veículo",
    path: "/vehicle",
  },
  {
    name: "Motorista",
    path: "/driver",
  },
  {
    name: "Plano de Viagem",
    path: "/itinerary",
  },
  {
    name: "Vinculo",
    path: "/vinculo",
  },
];

export const ResponsiveAppBar = () => {
  // const handleRedirect = (page) => {};
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);

  // const makePages = () => {
  //   if (isAdmin) {
  //     return [
  //       {
  //         name: 'Transportadora',
  //         path: '/company',
  //       },
  //     ].concat(pages);
  //   }
  //   return pages;
  // };

  if (isAdmin && pages[0].name !== "Dashboard")
    pages.unshift({ name: "Dashborad", path: "/adminDashboard" });

  return (
    <AppBar position="static" sx={{ marginBottom: "15px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isAdmin && (
            <Box>
              <GuardiaoLogotype size={50} />
              {/* <Button
                component={Link}
                to={"/adminDashboard"}
                // onClick={() => handleRedirect(page)}
                sx={{ mx: 0.8, my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button> */}
            </Box>
          )}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              verticalAlign: "center",
            }}
          >
            {/* <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              LOGO
            </Typography> */}

            {pages.map((page) => (
              <Button
                component={Link}
                to={`${page.path}`}
                key={page.name}
                // onClick={() => handleRedirect(page)}
                sx={{ mx: 0.8, my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box>
            {/* <IconButton
              onClick={() => {}}
              sx={{ mx: 0.8, my: 2, color: 'white', display: 'block' }}
            >
              <MoreVertIcon />
            </IconButton> */}
            <AppBarOptionsPopover />
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
