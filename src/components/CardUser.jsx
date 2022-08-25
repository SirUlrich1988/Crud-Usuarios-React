import React, { useEffect, useState } from 'react'
import { generateAvatar } from '../helpers/generateAvatar'
import { getRandomColor } from '../helpers/getRandomColor'
import axios from 'axios'


const CardUser = ({user, getAllUsers, setUpdateInfo, handleOpenForm}) => {

    const [avatar, setAvatar] = useState('')
    const [color, setColor] = useState(getRandomColor())

    useEffect(()=> {
        if(user){
            setAvatar(generateAvatar(user.first_name, user.last_name))
        }
    }, [user])

    const deleteUser = ()=> {
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
    <article className='card_users'>
      <ul>
        <li><span className='avatar_item' style={{backgroundColor: color}}>{avatar}</span></li>
      </ul> 
    <ul className='card'>
    <h2 className='card_title'>{user.first_name} {user.last_name}</h2>
        <ul className='card_list'>
          <li className='card_item'>
            Correo <span className='card_span'>{user.email}</span>
          </li>
          <li className='card_item'>
            Contraseña <span className='card_span'>{user.password}</span>
          </li>
          <li className='card_item'>
            Fecha de Cumpleaños <span className='card_span'>{user.birthday}</span>
          </li>
        </ul>
        <footer className='card_footer'>
          <button onClick={deleteUser} className='card_btn'>Delete</button>
          <button onClick={handleUpdateClick} className='card_btn'>Update</button>
        </footer>
      </ul>
    </article>
  )
}

export default CardUser
