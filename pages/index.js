import React, { useState } from 'react';
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import {useFormik} from 'formik'
import { db } from '../connections/Connect';
import { 
  collection, query, where, getDocs
} from "firebase/firestore";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const TextfieldCustom = styled(TextField)({
  '& label.Mui-focused': {
    color: '#e6af2f',
  },
  '& label': {
    color: '#e6af2f'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#e6af2f',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e6af2f',
    },
    '&:hover fieldset': {
      borderColor: '#e6af2f',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e6af2f',
    },
  },
});

export default function Home() {
  const [showPassword, setshowPassword] = useState(false);
  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };



  const colRef = collection(db, 'apoteker')
  const router = useRouter()
  const formik = useFormik({
    initialValues:{
      username: '',
      password: '',
    },
    onSubmit: values => {
      const { username, password } = values
      const queries = query(colRef, where("username", "==", username), where("password", "==", password))
      getDocs(queries)
      .then((snapshot) => {
        let user = []
        snapshot.docs.forEach((doc) => {
          user.push({...doc.data(), id: doc.id})
        })
        if(!user.length){
          throw ("User tidak ada")
        }
        let setData = {
          username : user[0].username,
          idUser : user[0].id,
          role : user[0].role
        }
        localStorage.setItem('id', JSON.stringify(setData))
        if(user[0].role === "admin"){
          router.push("/crud/apoteker")
        }else {
          router.push("/crud/obatmasuk")
        }
      }).catch(err => {
        alert(err.message || err)
      })
    }
  })
  return (
    <div className='bg-primary h-screen flex justify-center items-center'>
      <div className='neu-change h-3/5 w-2/6 p-3'>
        <div className='text-center text-3xl font-bold text-secondary'>
          Login
        </div>
        <div className='mt-12'>
          <form onSubmit={formik.handleSubmit}>
            <TextfieldCustom 
              name = "username"
              value = {formik.values.username}
              onChange= {formik.handleChange}
              onBlur={formik.handleBlur}
              label = 'Username'
              id='custom-css-outlined-input'
              sx={{ mt: 1, color: "#E6AF2F", input : {color : '#E6AF2F'} }}
              fullWidth
            />
            <TextfieldCustom 
              name = "password"
              value = {formik.values.password}
              onChange= {formik.handleChange}
              onBlur={formik.handleBlur}
              label = 'Password'
              type={showPassword ? 'text' : 'password'}
              id='custom-css-outlined-input'
              sx={{ mt: 2, input : {color : '#E6AF2F'} }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff sx={{color: '#E6AF2F'}} /> : <Visibility sx={{color: '#E6AF2F'}} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button sx={{mt:4, color: "#E6AF2F", borderColor: "#E6AF2F",":hover":{color: "#E6AF2F", borderColor: "#E6AF2F"}}} fullWidth variant='outlined' type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
