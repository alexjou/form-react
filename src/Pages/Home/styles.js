import { Box, styled } from '@mui/material'

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #2b2d4f;
  margin: -8px;
  width: 100vw;
  height: 100vh;
`

export const ContainerTable = styled(Box)`
  z-index: 1;
  height: 300px;
  width: 70%;
  background-color: #fff;
`
export const ViewSubmit = styled(Box)`
  margin-top: 20px;
  margin-bottom: 20px;
`
export const BoxModal = styled(Box)`
  top: 50%;
  left: 50%;
  width: 70%;
  height: 50%;
  display: flex;
  overflow: auto;
  position: absolute;
  border-radius: 10px;
  border: 10px;
  transform: translate(-50%, -50%);
  background-color: white;
`
