import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { To, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const accessToken = useSelector((state : RootState) => state.session.accessToken);
  const loading = useSelector((state : RootState) => state.session.loading);
  const currentUser = useSelector((state : RootState) => state.session.currentUser);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleNavigate(route: To, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event?.preventDefault();
    navigate(route);
  }

  function handleLogout(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event?.preventDefault();
    handleCloseUserMenu();
    navigate('/logout');
  }
  function handleUpdateProfileAccount(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    event?.preventDefault();
    handleCloseUserMenu();
    navigate('/update-profile');
  }

  let sessionLinks;
  if (accessToken) {
    sessionLinks = <Box sx={{ flexGrow: 0 }}>
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Typography marginRight={2} marginTop={1} textAlign="center">{currentUser?.email}</Typography>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
    </Box>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
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
        <MenuItem onClick={(event) => handleUpdateProfileAccount(event)}>
          <Typography textAlign="center">Update Profile</Typography>
        </MenuItem>
        <MenuItem onClick={(event) => handleLogout(event)}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
    </Menu>
  </Box>;
  } else if (!accessToken && !loading) {
    sessionLinks = <>
    <Button
      onClick={(event) => handleNavigate("/signup", event)}
      sx={{ my: 2, color: 'white', display: 'block' }}
    >
      Create Account
  </Button>
  <Button
    onClick={(event) => handleNavigate("/login", event)}
    sx={{ my: 2, color: 'white', display: 'block' }}
  >
    Login
  </Button>
    </>
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            WishList
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Wishlist
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={(event) => handleNavigate("/", event)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
          </Box>
          {sessionLinks}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
