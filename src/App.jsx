import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardUser from './components/CardUser'
import Form from './components/Form'

function App() {
  
  const [data, setData] = useState([])
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const getAllUsers = () => {
    const urlCall = 'https://users-crud1.herokuapp.com/users/'
    axios.get(urlCall)
    .then(resp => setData(resp.data))
    .catch(err => console.log(err))
  }

  useEffect(()=> {
    getAllUsers()
  }, [])

  const handleOpenForm = () => setIsFormOpen(true)
  const handleCloseForm = () => setIsFormOpen(false)
 
  return (
<div className='App'>
  <h1>USUARIOS</h1>
  <button onClick={handleOpenForm}>Open Form</button>
  <div className={isFormOpen ? 'form_container' : 'form_none'}>
        <Form
        getAllUsers={getAllUsers}
        updateInfo={updateInfo}
        setUpdateInfo={setUpdateInfo}
        handleCloseForm={handleCloseForm}
        /> 
      </div>
  <div className='card_container'>
  {
    data?.map(user => (
    <CardUser 
    key={user.id}
    user={user}
    getAllUsers={getAllUsers}
    setUpdateInfo={setUpdateInfo}
    handleOpenForm={handleOpenForm}
    />
    ))
  }
  </div>
</div>
  )
}

export default App
