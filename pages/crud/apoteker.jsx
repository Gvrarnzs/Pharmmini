import React, { useEffect, useState } from 'react';
import Link from "next/link"
import Button from '@mui/material/Button';
// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { 
 collection, doc, deleteDoc, onSnapshot, orderBy, query, where
} from "firebase/firestore";
import { db } from '../../connections/Connect';
import ButtonGroup from '@mui/material/ButtonGroup';
import Swal from 'sweetalert2'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Component/Header';
import AddApoteker from '../../Component/AddModalApoteker';
import EditmodalApoteker from '../../Component/EditModalApoteker';
import { useRouter } from 'next/router'


const Apoteker = () => {
    const colRef = collection(db, 'apoteker')
    const [usersData, setusersData] = useState([]);
    const [loading, setloading] = useState(true)

    //? Modal add Handle
    const [open, setOpen] = useState(false);
    const handleModal = () => setOpen(!open)
    //? Modal Edit Handle
    const [indexEdit, setindexEdit] = useState(-1)
    const [openEdit, setOpenedit] = useState(false);
    const handleModalEdit = () => setOpenedit(!openEdit)
    const editUsers = (index) => {
        setindexEdit(index)
        handleModalEdit()
    }


    // const queries = query(colRef, orderBy('username', 'asc'))
    //? Real time func so we dont need to refresh the page after adding/deleting/updating data, firestore will send us back a new snapshot, and realtimeFunc will re-run
    const router = useRouter()
    const realtimeFunc = () => {
        let data = JSON.parse(localStorage.getItem('id'));
        if (!data){
            return router.push("/")
        }
        if(data.role === "user"){
            return router.push("/crud/obatmasuk")
        }
        console.log(data)
        onSnapshot(colRef, (snapshot) => {
            let users= []
            snapshot.docs.forEach((doc) => {
                users.push({...doc.data(), id: doc.id})
            })
            setusersData(users)
            setloading(false)
            console.log(users)
        })
    }
    useEffect(() => {
        realtimeFunc()
    }, []);

    if (loading){
        return (
            <div className='flex justify-center mt-5'>
                <CircularProgress  sx={{mr: 5}}/>
                <CircularProgress />
            </div>
        )
    }
    const deleteUsers = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const userDoc = doc(db, "apoteker",usersData[index].id )
                deleteDoc(userDoc)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }

    return (
        <div className='bg-primary min-h-screen'>
            <Header/>
            <EditmodalApoteker openEdit={openEdit} handleModalEdit={handleModalEdit} userEdit={usersData[indexEdit]} />
            <AddApoteker open={open} handleModal={handleModal} />
            <div className='flex justify-between pr-5 pt-6 pl-5'>
                <div className='text-secondary text-2xl'>CRUD Apoteker</div>
                <Button variant='outlined' sx={{color: "#E6AF2F", borderColor: "#E6AF2F", ":hover":{color: "#E6AF2F", borderColor: "#E6AF2F"}}} onClick={handleModal}>Add +</Button>
            </div>
            <div className="p-5">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, backgroundColor: "#E6AF2F" }} aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#E6AF2F'}}>
                            <TableRow>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Password</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: '#F5D062'}}>
                            {usersData.map((val, index) => (
                                <TableRow 
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{val.username}</TableCell>
                                    <TableCell align="center">{val.name}</TableCell>
                                    <TableCell align="center">{val.password}</TableCell>
                                    <TableCell align="center">{val.email}</TableCell>
                                    <TableCell align="center">{val.age}</TableCell>
                                    <TableCell align="center">{val.role}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup color='inherit' size="small" aria-label="small button group">
                                            <Button onClick={() => editUsers(index)}>Edit</Button>
                                            <Button onClick={() => deleteUsers(index)}>Delete</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Apoteker