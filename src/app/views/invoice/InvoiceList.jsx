import React, { useState, useEffect } from 'react'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Card,
} from '@material-ui/core'
import { getAllInvoice, deleteInvoice } from './InvoiceService'
import { Link, useHistory } from 'react-router-dom'
import { ConfirmationDialog } from 'app/components'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import { getAllReceivers, getAllTransports, getDonationsByDonator } from 'app/services/queries'
import Loading from 'app/components/Loading/Loading'

const InvoiceList = () => {
    const [invoiceList, setInvoiceList] = useState([])
    const [invoice, setInvoice] = useState(null)
    const [open, setOpen] = useState(false)
    const [isAlive, setIsAlive] = useState(true)
    const { user } = useAuth();
    const history = useHistory()

    const [counter, setCounter] = useState(3)
    const [loading, setLoading] = useState(true)
    
    const [donations, setDonations] = useState([]);
    const [transports, setTransports] = useState([]);
    const [receivers, setReceivers] = useState([]);

    useEffect(() => {
        getAllInvoice().then((res) => {
            if (isAlive) setInvoiceList(res.data)
        })

        return () => setIsAlive(false)
    }, [isAlive])

    useEffect(() => {
        getDonationsByDonator(user.id)
        .then((donations) => {
            console.log(donations.result)
            setDonations(donations.result)
            setCounter(cnt => cnt-1)
        })

        getAllTransports()
        .then((transports) => {
            console.log(transports.result)
            setTransports(transports.result)
            setCounter(cnt => cnt-1)
        })

        getAllReceivers()
        .then((receivers) => {
            console.log(receivers.result)
            setReceivers(receivers.result)
            setCounter(cnt => cnt-1)
        })

    }, [])

    useEffect(() => {
        if (counter === 0) setLoading(false)
    }, [counter])

    const handeViewClick = (invoiceId) => {
        history.push(`/invoice/${invoiceId}`)
    }

    const handeDeleteClick = (invoice) => {
        setInvoice(invoice)
        setOpen(true)
    }

    const handleConfirmationResponse = () => {
        deleteInvoice(invoice).then((res) => {
            if (isAlive) {
                setInvoiceList(res.data)
                setOpen(false)
            }
        })
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    return (
        <>{   loading ? <Loading /> : 

        <div className="m-sm-30">
            <Link to="/invoice/add">
                <Button className="mb-4" variant="contained" color="primary">
                    Add Invoice
                </Button>
            </Link>
            <Card elevation={6} className="w-full overflow-auto">
                <Table className="min-w-750">
                    <TableHead>
                        <TableRow>
                            <TableCell className="pl-sm-24">
                                ID
                            </TableCell>
                            <TableCell className="px-0">Receiver</TableCell>
                            <TableCell className="px-0">Transportist</TableCell>
                            <TableCell className="px-0">Status</TableCell>
                            <TableCell className="px-0">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donations.map((invoice, index) => (
                            <TableRow key={index}>
                                <TableCell
                                    className="pl-sm-24 capitalize"
                                    align="left"
                                >
                                    {invoice.donacion_id}
                                </TableCell>
                                <TableCell
                                    className="pl-0 capitalize"
                                    align="left"
                                >
                                    {receivers[receivers.map(r => r.id).indexOf(invoice.receptor_id)]?.nombre}
                                </TableCell>
                                <TableCell
                                    className="pl-0 capitalize"
                                    align="left"
                                >
                                    {transports[transports.map(r => r.id).indexOf(invoice.transportista_id)]?.nombre}
                                </TableCell>
                                <TableCell className="pl-0 capitalize">
                                    <small
                                        className={clsx({
                                            'border-radius-4  text-white px-2 py-2px': true,
                                            'bg-primary':
                                                invoice.entregado === 1 ,
                                            'bg-secondary':
                                                invoice.entregado !== 1 && invoice.entregado !== 0,
                                            'bg-error':
                                                invoice.entregado === 0,
                                        })}
                                    >
                                        {invoice.entregado === 1 ? 'delivered' : invoice.entregado === 0 ? 'pending' : 'processing'}
                                    </small>
                                </TableCell>
                                <TableCell className="pl-0">
                                    <Button
                                        color="primary"
                                        className="mr-2"
                                        onClick={() =>
                                            handeViewClick(invoice.donacion_id)
                                        }
                                    >
                                        Open
                                    </Button>
                                    {/* <Button
                                        color="secondary"
                                        onClick={() =>
                                            handeDeleteClick(index)
                                        }
                                    >
                                        Delete
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <ConfirmationDialog
                open={open}
                onConfirmDialogClose={handleDialogClose}
                onYesClick={handleConfirmationResponse}
                text="Are you sure to delete?"
            />
        </div>
        }</>
    )
}

export default InvoiceList
