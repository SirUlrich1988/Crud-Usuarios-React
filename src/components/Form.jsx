import { useEffect } from "react";
import axios from 'axios'
import { useForm } from "react-hook-form";

const defaultValue = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: ''
}

const Form = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {

    useEffect(()=> {
        if(updateInfo){
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

      const {register, reset, handleSubmit} = useForm()

      const submit = data => {
        if(updateInfo){
            updateUser(data)
            setUpdateInfo()
        } else {
            createUser(data)
        }
        reset(defaultValue)
        handleCloseForm()
      }

      return (
        <form onSubmit={handleSubmit(submit)} className='form'>
            <div onClick={handleCloseForm} className='form_exis'>x</div>
            <h2 className="form_title">
                {
                    updateInfo ?
                    'Update User Information'
                    :
                    'Create New User'
                }
            </h2>
            <ul className="form_list">
                <li className="form_item">
                    <label htmlFor="first_name">Nombre</label>
                    <input {...register("first_name")} type="text" id='first_name' />
                </li>
                <li className="form_item">
                    <label htmlFor="last_name">Apellido</label>
                    <input {...register("last_name")} type="text" id='last_name' />
                </li>
                <li className="form_item">
                    <label htmlFor="email">Correo</label>
                    <input {...register("email")} type="text" id='email' />
                </li>
                <li className="form_item">
                    <label htmlFor="password">Contraseña</label>
                    <input {...register("password")} type="text" id='password' />
                </li>
                <li className="form_item">
                    <label htmlFor="birthday">Fecha de Cumpleaños</label>
                    <input {...register("birthday")} type="text" id='birthday' />
                </li>
            </ul>
            <button className="form_btn">{ updateInfo ? 'Update' : 'Create'}</button>
        </form>
      )
    }

export default Form