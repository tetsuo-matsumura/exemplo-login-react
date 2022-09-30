import 'dracula-ui/styles/dracula-ui.css'
import styled from 'styled-components';

import { Box, Button, Card, Text } from 'dracula-ui'
import { useUser } from './contexts/Auth';


const Page = styled.div`
  width: 50vw;

  &>input {
    width: 50%;
  }
`

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &>span {
    padding: 1rem;
  }
`

const ProtectedComponent = () => {
  let me = useUser()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <Page>
      <Box p="md">
        <Profile>
          <ProfilePic src={me.profile_pic} />
          <Text size="lg">{me.username}</Text>

          <Button onClick={handleSignOut} variant="outline" size="sm" m="sm">Deslogar</Button>
        </Profile>
      </Box>
      <Card color="pinkPurple" p="sm">
        <Text color="black">Você está logado com sucesso!</Text>
      </Card>
      <Box>


      </Box>
    </Page>
  );
}

export default ProtectedComponent;
