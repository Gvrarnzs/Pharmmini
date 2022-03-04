import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { updateDoc, collection, doc } from 'firebase/firestore';
import { db } from '../connections/Connect';

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
const MedicineEditout = ({openEdit, handleModalEdit, dataEditout }) => {
    const [editAccount, seteditAccount] = useState({
        name: '',
        price: '',
        status: '',
        total: ''
    });
    
    const inputHandler = (e) => {
        seteditAccount({ ...editAccount, [e.target.name]: e.target.value });
    };

    const editDataClick = async() => {
        try {
            const userDoc = doc(db, "medout",dataEditout?.id )
            const updateAccount = {...editAccount}
            for (var key in updateAccount) {
                if (updateAccount.hasOwnProperty(key)) {
                    //Now, updateAccount[key] is the current value
                    if (updateAccount[key] === undefined || updateAccount[key] === "")
                        delete updateAccount[key];
                }
            }
            // console.log(updateAccount)
            if(!Object.keys(updateAccount).length){
                throw ("Harap Isi Salah Satu Box")
            }
            await updateDoc(userDoc, updateAccount)
            handleModalEdit()
            console.log(updateAccount)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='bg-gray-400'>
            <Modal
                open={openEdit}
                onClose={handleModalEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{mb:3, mt: 1, textAlign: 'center', fontSize: 25 }}>
                        Edit Medicine Out
                    </Typography>
                    <TextfieldCustom 
                        name = "name"
                        defaultValue = {dataEditout?.name}
                        onChange= {inputHandler}
                        label = 'Name'
                        id='custom-css-outlined-input'
                        sx={{ mt: 1 }}
                        fullWidth
                    />
                    <TextfieldCustom 
                        name = "price"
                        defaultValue = {dataEditout?.price}
                        onChange= {inputHandler}
                        label = 'Price'
                        id='custom-css-outlined-input'
                        sx={{ mt: 1 }}
                        fullWidth
                    />
                    <TextfieldCustom 
                        name = "total"
                        defaultValue = {dataEditout?.total}
                        onChange= {inputHandler}
                        label = 'Total'
                        id='custom-css-outlined-input'
                        sx={{ mt: 1 }}
                        fullWidth
                    />
                    <TextfieldCustom 
                        name = "status"
                        defaultValue = {dataEditout?.status}
                        onChange= {inputHandler}
                        label = 'Status'
                        id='custom-css-outlined-input'
                        sx={{ mt: 1 }}
                        fullWidth
                    />
                    <Button fullWidth variant='outlined' onClick={editDataClick} sx={{mt:3,color: "#E6AF2F", borderColor: "#E6AF2F",":hover":{color: "#E6AF2F", borderColor: "#E6AF2F"} }} >Edit</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default MedicineEditout
