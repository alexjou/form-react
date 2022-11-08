import React, { useContext, useState } from 'react'
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Container, ContainerForm, ErroForm, FirstText, ViewSubmit } from './styles'
import Logo from '../../Img/logo.png'
import * as Yup from 'yup'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const initialValues = {
    email: '',
    password: '',
  }

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, actions) => {
      setLoading(true)
      const result = await signIn(values.email, values.password)
      if (result) {
        actions.resetForm()
        setLoading(false)
      } else {
        setErro('Erro ao fazer login')
        setTimeout(() => {
          setErro('')
        }, 3000)
        setLoading(false)
      }
    },
  })

  return (
    <Container>
      <FirstText>OVERMIND</FirstText>
      <img
        src={Logo}
        alt="Logo"
        style={{
          position: 'fixed',
          top: '2%',
          zIndex: 1,
          width: 'auto',
          height: '25%',
        }}
      />

      <form
        noValidate
        onSubmit={formik.handleSubmit}
        style={{ zIndex: 2, marginTop: 50 }}
      >
        <ContainerForm container rowSpacing={2}>
          <Typography sx={{ color: '#2b2d4f', fontSize: 20, mt: 1 }}>
            Login
          </Typography>
          <Grid item>
            <TextField
              sx={{ width: 300 }}
              required
              type="email"
              id="email"
              name="email"
              variant="outlined"
              label="E-mail"
              autoComplete="email"
              placeholder="Preencha com o e-mail"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item>
            <FormControl sx={{ width: 300 }}>
              <InputLabel htmlFor="Senha" variant="outlined">
                Senha *
              </InputLabel>
              <OutlinedInput
                required
                id="password"
                name="password"
                label="Senha"
                autoComplete="password"
                placeholder="Informe uma senha"
                onChange={formik.handleChange}
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>
          </Grid>
          <ErroForm>{erro && erro}</ErroForm>

          {loading ? (
            <CircularProgress sx={{ m: 2 }} />
          ) : (
            <>
              <ViewSubmit>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ textTransform: 'none', backgroundColor: '#2b2d4f' }}
                >
                  Entrar
                </Button>
              </ViewSubmit>
              <ViewSubmit>
                <Button
                    variant="contained"
                    onClick={() => navigate("/criarConta")}
                  sx={{ textTransform: 'none'}}
                >
                  Criar conta
                </Button>
              </ViewSubmit>
            </>
          )}
        </ContainerForm>
      </form>
    </Container>
  )
}
