import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { 
 collection,getDocs
} from "firebase/firestore";
import { db } from '../../connections/Connect';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Component/Header';
import { useRouter } from 'next/router'


const ReportMed = () => {
    const [loading, setloading] = useState(true)
    const [dataReport, setdataReport] = useState([]);
    const colRef = collection(db, 'medout')
    const colRef2 = collection(db, 'medin')
    const router = useRouter()
    const realtimeFunc = async() => {
        let data = JSON.parse(localStorage.getItem('id'));
        if (!data){
            return router.push("/")
        }
        if(data.role === "user"){
            return router.push("/crud/obatmasuk")
        }
        console.log(data)
        let reportData = []
        const dataIntemp = await getDocs(colRef)
        const dataOuttemp = await getDocs(colRef2)
        dataIntemp.forEach((doc) => {
            reportData.push({...doc.data(), id: doc.id})
        })
        dataOuttemp.forEach((doc) => {
            reportData.push({...doc.data(), id: doc.id})
        })
        setdataReport(reportData)
        setloading(false)
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
    return (
        <div className='bg-primary min-h-screen'>
            <Header/>
            <div className='flex pr-5 pt-6 pl-5'>
                <div className='text-secondary text-2xl'>Medicine - In and Out</div>
            </div>
            <div className="p-5">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, backgroundColor: "#E6AF2F" }} aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#E6AF2F'}}>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Price/pcs</TableCell>
                                <TableCell align="center">Total Qty</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: '#F5D062'}}>
                            {dataReport.map((val, index) => (
                                <TableRow 
                                    key={index}
                                    sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                                    sx={val.status === "Masuk" ? {backgroundColor: '#F5D062'} : {backgroundColor: "#FFC300"}}
                                >
                                    <TableCell align="center">{val.name}</TableCell>
                                    <TableCell align="center">{val.price}</TableCell>
                                    <TableCell align="center">{val.total}</TableCell>
                                    <TableCell align="center">{val.status}</TableCell>
                                    <TableCell align="center">{JSON.stringify(val.createdAt.toDate().toLocaleString("id-ID"))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ReportMed