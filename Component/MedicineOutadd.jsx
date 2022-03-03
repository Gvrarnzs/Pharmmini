import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../connections/Connect';
import {useFormik} from 'formik'
import ErrorIcon from '@mui/icons-material/Error';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const TextfieldCustom = styled(TextField)({
    '& label.Mui-focused': {
      color: '#38A3A5',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ceeaeb',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ceeaeb',
      },
      '&:hover fieldset': {
        borderColor: '#38A3A5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ceeaeb',
      },
    },
});
const MedoutAdd = ({open, handleModal}) => {
    const colRef = collection(db, 'medout')
    let regexSymbol = new RegExp("^(?=.*?[#?!@$%^&*}{:;-])")
    //? Untuk Validate Value Formik
    const validate = values => {
        const errors = {}
        if (!values.name){
            errors.name = "Required"
        }else if (values.name.length < 4){
            errors.name = 'Must be 4 Characters or more'
        }
        if (!values.price){
            errors.price = "Required"
        }else if (regexSymbol.test(values.price.toString())){
            errors.price = 'Fill Number Only!'
        }
        if (!values.total){
            errors.total = "Required"
        }else if (regexSymbol.test(values.total.toString())){
            errors.total = 'Fill Number Only'
        }
        if (!values.status){
            errors.status = "Required"
        }else if (values.status.length < 2){
            errors.status = 'Must be 4 Characters or more'
        }
        return errors
    }

    //? Cara menggunakan Formik 
    const formik = useFormik({
        initialValues:{
            price: '',
            name: '',
            status: '',
            total: ''
        },validate,
        onSubmit: values => {
            const { price, name, status, total } = values
            addDoc(colRef, {
                price,
                name, 
                status, 
                total,
                createdAt : serverTimestamp()
            })
            // alert(JSON.stringify(values, null, 2))
            handleModalclose()
        }
    })

    //? Close Modal dan Reset Form
    const handleModalclose = () => {
        formik.handleReset()
        handleModal()
    }

    return (
        <div className='bg-gray-400'>
            <Modal
                open={open}
                onClose={handleModalclose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" sx={{mb:3, mt: 1, textAlign: 'center', fontSize: 25}} component="h2">
                        Add Medicine In
                    </Typography>
                    <form onSubmit={formik.handleSubmit} id="add-form-next">
                        <TextfieldCustom 
                            name = "name"
                            value = {formik.values.name}
                            onChange= {formik.handleChange}
                            onBlur={formik.handleBlur}
                            label = 'Name'
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.name && formik.errors.name ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.name}
                            </Typography> : null}
                        <TextfieldCustom 
                            name = "price"
                            value = {formik.values.price}
                            onChange= {formik.handleChange}
                            label = 'Price'
                            type = "number"
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.price && formik.errors.price ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.price}
                            </Typography> : null}
                        <TextfieldCustom 
                            name = "total"
                            value = {formik.values.total}
                            onChange= {formik.handleChange}
                            onBlur={formik.handleBlur}
                            label = 'Total'
                            type="number"
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.total && formik.errors.total ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.total}
                            </Typography> : null}
                        <TextfieldCustom 
                            name = "status"
                            value = {formik.values.status}
                            onChange= {formik.handleChange}
                            onBlur={formik.handleBlur}
                            label = 'Status'
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.status && formik.errors.status ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.status}
                            </Typography> : null}
                        <Button fullWidth variant="outlined" sx={{mt:3,color: "#293045", borderColor: "#293045", ":hover":{color: "#293045", borderColor: "#293045"}}} type="submit">Add</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default MedoutAdd