import * as React from 'react'
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  ListItemText,
  ListItemButton,
  Button,
  MenuItem,
  IconButton,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { styled } from '@mui/system'
import Avatar from '@mui/material/Avatar'
import { signIn, signOut, useSession } from 'next-auth/client'
import { ListSubheader, SubList } from './index'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { SearchField } from '../components'

const drawerWidth = 240

const ToolbarBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'stretch',
  width: '100%',
})

const MainBox = styled(Box)({
  flexGrow: 1,
  p: 3,
  padding: '20px 30px',
})

export default function ClippedDrawer({ menuElements, children, setSelectedComponent, searchOptions }) {
  let avatar: string
  let user: string
  const [session, loading] = useSession()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [isFirstRender, setIsFirstRender] = React.useState(true)

  const handleClose = () => {
    setIsFirstRender(false)
    setDialogOpen(false)
  }

  if (session) {
    // HERE YOU CAN CONTROL USER SESSION
    avatar = session.user.image
    user = session.user.name
  }

  if (!dialogOpen && isFirstRender) {
    setDialogOpen(true)
  }

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }
  const handleSignOut = () => {
    signOut()
  }

  const handleSignIn = () => {
    setDialogOpen(false)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleSignIn}>Login</MenuItem>
      <MenuItem onClick={handleSignOut}>Logout</MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <ToolbarBox>
            <Box
              sx={{
                marginLeft: '10px',
                marginRight: 'auto',
                display: 'flex',
                alignContent: 'center',
              }}
            >
              <Typography
                sx={{ margin: 'auto' }}
                variant="h6"
                noWrap
                component="div"
              >
                Next Docs
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginLeft: 'auto', marginRight: '10px' }}>
              <SearchField setSelectedComponent={setSelectedComponent}/>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                sx={{ mr: 1 }}
              >
                <Avatar src={avatar} alt={user} />
              </IconButton>
            </Box>
          </ToolbarBox>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {menuElements && menuElements.map((item, index) => {
            return (
              <ListSubheader
                label={item.label}
                key={`${index}-ListSubheader`}
              >
                {item.children && item.children.map((children, index) => (
                  <div key={`${index}-Div`}>
                    <ListItemButton
                      key={`${index}-childrenListItemButton`}
                      onClick={() => {
                        if (children.component) {
                          setSelectedComponent(`${children.component}`)
                        }
                      }}
                    >
                      <ListItemText
                        primary={children.label}
                        key={`${index}-childrenListItemText`}
                      />
                      {children.component ? null : <ExpandMore />}
                    </ListItemButton>
                    {children.subItems && children.subItems.map((subItem, index) => (
                      <SubList key={`${index}-SubItemsSubList`}>
                        <ListItemButton
                          key={`${index}-SubItemsListItemButton`}
                          sx={{ pl: 4 }}
                          onClick={() => {
                            if (subItem.component) {
                              setSelectedComponent(`${subItem.component}`)
                            }
                          }}
                        >
                          <ListItemText
                            primary={subItem.label}
                            key={`${index}-SubItemsListItemText`}
                          />
                        </ListItemButton>
                      </SubList>
                    ))}
                  </div>
                ))}
              </ListSubheader>
            )
          })}
        </Box>
      </Drawer>
      <MainBox component="div">
        <Toolbar />
        {children}
      </MainBox>
      {renderMobileMenu}
      <Dialog
        open={dialogOpen && isFirstRender}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Hi! 😀</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can request login to control who can access your docs.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
