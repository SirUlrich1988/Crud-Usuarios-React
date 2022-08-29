import { useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const defaultValue = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birthday: ''
}

const Form = ({ getAllUsers, updateInfo, setUpdateInfo, handleCloseForm }) => {
  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
    }
  }, [updateInfo])

  const createUser = data => {
    const urlCreate = 'https://users-crud1.herokuapp.com/users/'
    axios.post(urlCreate, data)
      .then(resp => {
        console.log(resp.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUser = data => {
    const urlUpdate = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
    axios.patch(urlUpdate, data)
      .then(resp => {
        console.log(resp.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const { register, reset, handleSubmit } = useForm()

  const submit = data => {
    if (updateInfo) {
      updateUser(data)
      setUpdateInfo()
    } else {
      createUser(data)
    }
    reset(defaultValue)
    handleCloseForm()
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='Form'>
      <div className='Form__Close' onClick={handleCloseForm}><span>x</span></div>
      <h2 className='Form__Title'>
        {
                    updateInfo
                      ? 'Update User Information'
                      : 'Create New User'
                }
      </h2>
      <ul className='Form__List'>
        <li className='Form__Item'>
          <label className='Form__Label' htmlFor='first_name'>Nombre</label>
          <input className='Form__Input' {...register('first_name')} type='text' id='first_name' />
        </li>
        <li className='Form__Item'>
          <label className='Form__Label' htmlFor='last_name'>Apellido</label>
          <input className='Form__Input' {...register('last_name')} type='text' id='last_name' />
        </li>
        <li className='Form__Item'>
          <label className='Form__Label' htmlFor='email'>Correo</label>
          <input className='Form__Input' {...register('email')} type='email' id='email' />
        </li>
        <li className='Form__Item'>
          <label className='Form__Label' htmlFor='password'>Contraseña</label>
          <input className='Form__Input' {...register('password')} type='password' id='password' />
        </li>
        <li className='Form__Item'>
          <label className='Form__Label' htmlFor='birthday'>Fecha de Cumpleaños</label>
          <input className='Form__Input' {...register('birthday')} type='date' id='birthday' />
        </li>
      </ul>
      <button className='Form__Button'>{updateInfo ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default Form
