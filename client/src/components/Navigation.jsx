import * as React from 'react';
import { AppBar,
          Box,
          Toolbar,
          IconButton,
          Typography,
          Menu,
          Container,
          MenuItem
        } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdbIcon from '@mui/icons-material/Adb';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, ListItemIcon } from '@mui/material';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'react-toastify';

const pages = [
                {
                  path:'/home',
                  name:'Home'
                }, 
                {
                  path:'/friend-requests',
                  name: 'Friend Requests'
                },
                {
                  path: '/groups',
                  name:'Groups'
                }];
const settings = [
                  {
                    icon: <AccountCircleIcon /> ,
                    path:'/profile',
                    name:'Profile'
                  }, 
                  {
                    icon: <SpaceDashboardIcon /> ,
                    path:'/account',
                    name:'Account'
                  },
                ];

function Navigation() {

  const {logout,user} = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate= useNavigate()
  const handleLogout = () => {
    
    logout()
    toast.success('Logout successful')
    navigate('/login')
        
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl" style={{backgroundColor:'var(--main-theme-background)'}}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'var(--brand)',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             &lt; Connected /&gt;
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
              {pages.map((page,index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to="/friend-requests" className='link'>{page.name}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'var(--brand)',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             &lt; Connected /&gt;
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (
               <MenuItem key={index} onClick={handleCloseNavMenu}>
               <Link to={page.path} style={{
                                                    color:'white',
                                                    textDecoration:'none',
                                                  }}>{page.name}</Link>
             </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={user?.avatar}/>
              </IconButton>
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
              {settings.map((setting,index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                  {setting.icon}
                </ListItemIcon> &nbsp;
                  <Link to={setting.path}>{setting.name}</Link>
                </MenuItem>
              ))}
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                  <Logout/>
                </ListItemIcon>
                  <Button onClick={handleLogout}>Logout</Button>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;