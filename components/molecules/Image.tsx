import Image from 'next/image'
import Box from '@mui/material/Box'
import { styled } from '@mui/system'

const ImageContainer = styled(Box)({
  display: 'flex',
  margin: '15px auto',
  justifyContent: 'center',
})

const ImageBox = styled(Box)({
  margin: '0 auto',
})

interface Iprops {
  src: string
  alt: string
  height: number
  width: number
}

export default function MyImage({ width, height, src, alt }: Iprops) {
  return (
    <>
      <ImageContainer>
        <ImageBox>
          <Image
            placeholder="blur"
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
        </ImageBox>
      </ImageContainer>
    </>
  )
}
