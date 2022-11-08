import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers, updateUser } from '../../Firebase/users'
import { BoxModal, Container, ContainerTable, ViewSubmit } from './styles'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid } from '@mui/x-data-grid'
import Logo from '../../Img/logo.png'
import InputMask from 'react-input-mask'
import { useContext } from 'react'
import AuthContext from '../../Context/AuthContext'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import { FirstText } from '../SignUp/styles'
import axios from 'axios'
import Lottie from 'react-lottie'
import animationData from '../../Img/confetti.json'

export default function Home() {
  const { signOut } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  function sendEmail(data) {
    axios({
      url: 'https://formspree.io/f/xnqrlnnp',
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      data: data,
    }).then((response) => {
      if (response.status === 200) {
        setConfirmOpen(!confirmOpen)
      }
      console.log(response)
    })
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 300,
      description: 'Os nomes dos usuários',
      sortable: false,
    },
    { field: 'email', headerName: 'E-mail', width: 300 },
    { field: 'phone', headerName: 'Telefone', width: 200 },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar os dados do usuário">
            <IconButton
              aria-label="search"
              onClick={() => {
                setOpen(true)
                setUser(params.row)
                setNome(params.row.name)
                setPhone(params.row.phone)
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Apagar usuário">
            <IconButton
              aria-label="delete"
              onClick={() => {
                const result = deleteUser(params.row.id)
                if (result) {
                  setUpdate(!update)
                }
              }}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Enviar os dados para o e-mail caroline-brod@overmind.ai">
            <IconButton aria-label="send" onClick={() => sendEmail(params.row)}>
              <ForwardToInboxIcon color="primary" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  function handleUpdate() {
    setLoading(true)
    updateUser({ id: user.uid, name: nome, phone, email: user.email })
    setUpdate(!update)
    setOpen(!open)
    setLoading(false)
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  useEffect(() => {
    getUsers().then((item) => setUsers(item))
  }, [update])

  return (
    <Container>
      <FirstText>Gestão de usuários</FirstText>
      <img
        src={Logo}
        alt="Logo"
        style={{
          position: 'fixed',
          top: '2%',
          zIndex: 0,
          width: 'auto',
          height: '30%',
        }}
      />
      <ViewSubmit>
        <Button
          variant="contained"
          color="error"
          sx={{
            textTransform: 'none',
            fontSize: 20,
          }}
          onClick={signOut}
        >
          Sair
        </Button>
      </ViewSubmit>
      <ContainerTable>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </ContainerTable>

      {open && (
        <Modal open={open} onClose={() => setOpen(!open)}>
          <BoxModal>
            <Grid
              container
              display="flex"
              direction="column"
              justifyContent="center"
              rowSpacing={2}
              alignItems="center"
              sx={{
                backgroundColor: 'white',
                pl: 2,
                pr: 2,
                borderRadius: 3,
              }}
            >
              <Typography sx={{ color: '#2b2d4f', fontSize: 20 }}>
                Alterar dados do usuário
              </Typography>
              <Grid item>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Nome"
                  autoComplete="name"
                  variant="outlined"
                  placeholder="Preencha com o nome"
                  onChange={(e) => setNome(e.target.value)}
                  value={nome}
                />
              </Grid>
              <Grid item>
                <InputMask
                  mask="(99)99999-9999"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  disabled={false}
                  maskChar=" "
                  style={{ color: 'black' }}
                >
                  {() => (
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      label="Telefone"
                      autoComplete="phone"
                      variant="outlined"
                      placeholder="Preencha com o telefone"
                    />
                  )}
                </InputMask>
              </Grid>
              {loading ? (
                <CircularProgress sx={{ m: 2 }} />
              ) : (
                <ViewSubmit>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      backgroundColor: '#2b2d4f',
                      mr: 5,
                    }}
                    onClick={handleUpdate}
                  >
                    Enviar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    type="submit"
                    sx={{ textTransform: 'none' }}
                    onClick={(e) => setOpen(!open)}
                  >
                    Cancelar
                  </Button>
                </ViewSubmit>
              )}
            </Grid>
          </BoxModal>
        </Modal>
      )}

      <Dialog open={confirmOpen} sx={{ textAlign: 'center' }}>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          style={{ position: 'fixed', top: '20%', zIndex: 0 }}
        />
        <DialogTitle sx={{ m: 4 }}>
          E-mail enviado com sucesso para:
        </DialogTitle>
        <Typography fontSize={20} fontWeight={'bold'} sx={{ mb: 6 }}>
          caroline-brod@overmind.ai
        </Typography>

        <Button
          variant="contained"
          color="error"
          type="submit"
          sx={{ textTransform: 'none' }}
          onClick={(e) => setConfirmOpen(!confirmOpen)}
        >
          Voltar
        </Button>
      </Dialog>
    </Container>
  )
}
