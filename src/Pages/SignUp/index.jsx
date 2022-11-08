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
import {
  Container,
  ContainerForm,
  ErroForm,
  FirstText,
  ViewSubmit,
} from './styles'
import Logo from '../../Img/logo.png'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'
import AuthContext from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const { signUp } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  }

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email().required('Campo obrigatório'),
    phone: Yup.string().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    confirmPassword: Yup.string().required('Campo obrigatório'),
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, actions) => {
      if (values.password !== values.confirmPassword) {
        setErro('As duas senhas devem ser iguais')
        formik.setErrors({ confirmPassword: 'erro' })
        setTimeout(() => {
          setErro('')
        }, 3000)
        return
      } else {
        setLoading(true)
        actions.resetForm()
        const result = await signUp(values)
        if (result) {
          setLoading(false)
          navigate('/')
        } else {
          setErro('Erro ao criar a conta')
          setTimeout(() => {
            setErro('')
          }, 3000)
          setLoading(false)
        }
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
          height: '20%',
        }}
      />

      <form
        noValidate
        onSubmit={formik.handleSubmit}
        style={{ zIndex: 2, marginTop: 50 }}
        action="https://formspree.io/f/xnqrlnnp"
        method="POST"
      >
        <ContainerForm container rowSpacing={2}>
          <Typography sx={{ color: '#2b2d4f', fontSize: 20, mt: 1 }}>
            Cadastro
          </Typography>
          <Grid item>
            <TextField
              sx={{ width: 300 }}
              required
              id="name"
              name="name"
              label="Nome"
              autoComplete="name"
              variant="outlined"
              placeholder="Preencha com o nome"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item>
            <InputMask
              mask="(99)99999-9999"
              value={formik.values.phone}
              onChange={formik.handleChange}
              disabled={false}
              maskChar=" "
              style={{ color: 'black' }}
            >
              {() => (
                <TextField
                  sx={{ width: 300 }}
                  required
                  id="phone"
                  name="phone"
                  label="Telefone"
                  autoComplete="phone"
                  variant="outlined"
                  placeholder="Preencha com o telefone"
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              )}
            </InputMask>
          </Grid>

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
                Senha
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

          <Grid item>
            <FormControl sx={{ width: 300 }}>
              <InputLabel htmlFor="Confirmação de senha" variant="outlined">
                Confirmação de senha
              </InputLabel>
              <OutlinedInput
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmação de senha"
                autoComplete="confirmPassword"
                placeholder="Confirme a senha"
                onChange={formik.handleChange}
                type={showConfirmPassword ? 'text' : 'password'}
                value={formik.values.confirmPassword}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>
            <ErroForm>{erro && erro}</ErroForm>
          </Grid>

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
                  Criar
                </Button>
              </ViewSubmit>
              <ViewSubmit>
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={{ textTransform: 'none' }}
                >
                  Voltar para Login
                </Button>
              </ViewSubmit>
            </>
          )}
        </ContainerForm>
      </form>
    </Container>
  )
}
