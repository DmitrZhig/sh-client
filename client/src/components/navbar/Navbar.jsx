import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { checkUser } from '../../redux/auth/authThunkActions';
import Logout from '../auth/logout/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Container, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
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

  const user = useAppSelector((state) => state.authSlice.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      try {
        dispatch(checkUser());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <AppBar style={{ backgroundColor: '#366cd9' }}>
      <Container maxWidth='2'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Comic Sans MS',
              fontWeight: 700,
              fontSize: '30px',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            StudiHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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
              {user.login ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Button
                    style={{
                      fontSize: '2vw',
                      color: 'black',
                      letterSpacing: '4px',
                      fontFamily: 'Comic Sans MS',
                    }}
                  >
                    <Link
                      to='/'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Главная
                    </Link>
                  </Button>
                  <Button
                    style={{
                      fontSize: '2vw',
                      color: 'black',
                      letterSpacing: '4px',
                      fontFamily: 'Comic Sans MS',
                    }}
                  >
                    <Link
                      to='/acc'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Аккаунт
                    </Link>
                  </Button>
                  {user.access ? (
                    <div></div>
                  ) : (
                    <>
                      <Button
                        style={{
                          fontSize: '2vw',
                          color: 'black',
                          letterSpacing: '4px',
                          fontFamily: 'Comic Sans MS',
                        }}
                      >
                        <Link
                          to='/access'
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          Получить доступ
                        </Link>
                      </Button>
                    </>
                  )}

                  <Button
                    style={{
                      fontSize: '2vw',
                      color: 'black',
                      letterSpacing: '4px',
                      fontFamily: 'Comic Sans MS',
                    }}
                  >
                    {' '}
                    <Logout />
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button
                    style={{
                      fontSize: '2vw',
                      color: 'black',
                      letterSpacing: '4px',
                      fontFamily: 'Comic Sans MS',
                    }}
                  >
                    <Link
                      to='/'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Главная
                    </Link>
                  </Button>
                  <Button
                    style={{
                      fontSize: '2vw',
                      color: 'black',
                      letterSpacing: '4px',
                      fontFamily: 'Comic Sans MS',
                    }}
                  >
                    <Link
                      to='/login'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Получить доступ
                    </Link>
                  </Button>

                  <Button
                    style={{
                      fontSize: '2vw',
                      color: 'black',
                      letterSpacing: '4px',
                      fontFamily: 'Comic Sans MS',
                    }}
                  >
                    <Link
                      to='/login'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      Войти
                    </Link>
                  </Button>
                </div>
              )}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SH
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex', justifyContent: 'center' },
            }}
          >
            {user.login ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <Button
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    letterSpacing: '4px',
                    fontFamily: 'Comic Sans MS',
                  }}
                >
                  <Link
                    to='/'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Главная
                  </Link>
                </Button>
                <Button
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    fontFamily: 'Comic Sans MS',
                    letterSpacing: '4px',
                  }}
                >
                  <Link
                    to='/acc'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Аккаунт
                  </Link>
                </Button>
                {user.access ? (
                  <div style={{ display: 'none' }}></div>
                ) : (
                  <>
                    <Button
                      style={{
                        fontSize: '18px',
                        color: 'white',
                        letterSpacing: '4px',
                        fontFamily: 'Comic Sans MS',
                      }}
                    >
                      <Link
                        to='/access'
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        Получить доступ
                      </Link>
                    </Button>
                  </>
                )}

                <Button
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    letterSpacing: '4px',
                    fontFamily: 'Comic Sans MS',
                  }}
                >
                  {' '}
                  <Logout />
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <Button
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    letterSpacing: '4px',
                    fontFamily: 'Comic Sans MS',
                  }}
                >
                  <Link
                    to='/'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Главная
                  </Link>
                </Button>
                <Button
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    letterSpacing: '4px',
                    fontFamily: 'Comic Sans MS',
                  }}
                >
                  <Link
                    to='/login'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Получить доступ
                  </Link>
                </Button>

                <Button
                  style={{
                    fontSize: '18px',
                    color: 'white',
                    letterSpacing: '4px',
                    fontFamily: 'Comic Sans MS',
                  }}
                >
                  <Link
                    to='/login'
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    Войти
                  </Link>
                </Button>
              </div>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              alt={user.login}
              src={
                user.avatar === 'null'
                  ? null
                  : `http://localhost:3000/images/${user.avatar}`
              }
            >
              {user.avatar === 'null' ? user.login.charAt(0) : null}
            </Avatar>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
