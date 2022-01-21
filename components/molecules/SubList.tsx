import {
  List,
  Collapse,
} from '@mui/material'

export default function SubList({ children }) {
  return (
    <Collapse in={true}>
      <List component="div" disablePadding>
        {children}
      </List>
    </Collapse>
  )
}
