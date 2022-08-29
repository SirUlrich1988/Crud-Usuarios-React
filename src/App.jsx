import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardUser from './components/CardUser'
import Form from './components/Form'

function App () {
  const [data, setData] = useState([])
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const getAllUsers = () => {
    const urlCall = 'https://users-crud1.herokuapp.com/users/'
    axios.get(urlCall)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const handleOpenForm = () => setIsFormOpen(true)
  const handleCloseForm = () => setIsFormOpen(false)

  return (
    <div className='App'>
      <h1 className='App__title'>USUARIOS</h1>
      <div className='Button'>
        <button
          type='button'
          className='Button__Btn'
          onClick={handleOpenForm}
        >
          Open Form <i className='bx bx-menu-alt-left' />
        </button>
      </div>

      {
        isFormOpen &&
          <div className='form_container'>
            <Form
              getAllUsers={getAllUsers}
              updateInfo={updateInfo}
              setUpdateInfo={setUpdateInfo}
              handleCloseForm={handleCloseForm}
            />
          </div>
      }

      <div className='Cards__Container'>
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
