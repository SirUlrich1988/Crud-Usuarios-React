import React, { useEffect, useState } from 'react'
import { generateAvatar } from '../helpers/generateAvatar'
import { getRandomColor } from '../helpers/getRandomColor'
import axios from 'axios'

const CardUser = ({ user, getAllUsers, setUpdateInfo, handleOpenForm }) => {
  const [avatar, setAvatar] = useState('')
  const [color, setColor] = useState(getRandomColor())

  useEffect(() => {
    if (user) {
      setAvatar(generateAvatar(user.first_name, user.last_name))
    }
  }, [user])

  const deleteUser = () => {
    const urlDelete = `https://users-crud1.herokuapp.com/users/${user.id}/`
    axios.delete(urlDelete)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const handleUpdateClick = () => {
    handleOpenForm()
    setUpdateInfo(user)
  }

  return (
    <article className='Card'>

      <div className='Card__Avatar'>
        <span className='avatar_item' style={{ backgroundColor: color }}>{avatar}</span>
      </div>

      <div className='Card__Body'>
        <h2 className='Card__Name'>{user.first_name} {user.last_name}</h2>

        <ul className='Card__List'>
          <li className='Card__Item'>
            <i className='bx bxs-envelope' /> Correo: <span className='Card__Item--span'>{user.email}</span>
          </li>
          <li className='Card__Item'>
            <i className='bx bxs-lock' /> Contraseña: <span className='Card__Item--span'>{user.password}</span>
          </li>
          <li className='Card__Item'>
            <i className='bx bx-calendar' /> Fecha de Cumpleaños: <span className='Card__Item--span'>{user.birthday}</span>
          </li>
        </ul>

        <footer className='card_footer'>
          <button onClick={deleteUser} className='Card__Button btn--danger'> <i className='bx bx-trash' /> Delete</button>
          <button onClick={handleUpdateClick} className='Card__Button'><i className='bx bx-edit-alt' /> Update</button>
        </footer>
      </div>
    </article>
  )
}

export default CardUser
