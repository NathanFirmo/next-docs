import {
  List,
  ListSubheader as MaterialSubHeader,
} from '@mui/material'

export default function ListSubheader({ children, label }) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader2"
      subheader={
        <MaterialSubHeader component="div" id="nested-list-subheader">
          { label }
        </MaterialSubHeader>
      }
    >
      { children }
    </List>
  )
}
