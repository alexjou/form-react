import { Box, Grid, styled, Typography } from '@mui/material'

export const Container = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #2b2d4f;
  margin: -8px;
`

export const FirstText = styled(Typography)`
  position: absolute;
  top: 10%;
  color: white;
  z-index: 2;
  font-size: 40px;
`
export const ViewSubmit = styled(Box)`
  margin-top: 20px;
  margin-bottom: 20px;
`
export const ContainerForm = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
`

export const BoxModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  border: 1px solid #000;
  border-radius: 10px;
`

export const ContainerTable = styled(Box)`
  height: 400px;
  width: 100%;
`
export const ErroForm = styled(Typography)`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  margin: 10px;
  color: red;
`
