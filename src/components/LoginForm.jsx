import { useState } from 'react';
import { Button, Divider, Input, Paragraph } from 'dracula-ui'
import axios from 'axios'

const LoginForm = () => {
  const [userInput, setUserInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUserInputChange = (event) => setUserInput(event.target.value)
  const handlePasswordInputChange = (event) => setPasswordInput(event.target.value)
  const handleLoginClick = () => {
    setLoading(true)
    axios.post('http://localhost:3333/login',
      {
        username: userInput,
        password: passwordInput
      })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          window.location.reload()
        }
        setLoading(false)
      })
  }

  const handleSignUpClick = () => {
    setLoading(true)
    axios.post('http://localhost:3333/signup',
      {
        username: userInput,
        password: passwordInput
      })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          window.location.reload()
        }
        setLoading(false)
      })
  }

  return (
    <>
      <Input placeholder="Usuário" value={userInput} onChange={handleUserInputChange} size="lg" m="xs" color="pink" />
      <Input placeholder="Senha" value={passwordInput} onChange={handlePasswordInputChange} type="password" size="lg" m="xs" color="pink" />
      <Button onClick={handleLoginClick} color="purple" m="sm">
        {loading ? 'Carregando' : 'Logar'}
      </Button>
      <Button onClick={handleSignUpClick} color="purple" m="sm">
        {loading ? 'Carregando' : 'Cadastrar'}
      </Button>
      <Divider color="purple" />
    </>
  )
}

export default LoginForm