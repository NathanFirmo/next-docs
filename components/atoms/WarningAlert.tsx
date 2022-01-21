
import Box from '@mui/material/Box'
import { styled } from '@mui/system'
import Alert from '@mui/material/Alert'

const AlertBox = styled(Box)({
  margin:'15px auto'
})

export default function MarkdownRender({ message }) {
  return (
    <AlertBox>
      <Alert severity="warning">{message}</Alert>
    </AlertBox>
  )
}