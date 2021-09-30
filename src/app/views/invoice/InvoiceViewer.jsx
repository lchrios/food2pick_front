import React, { useState, useEffect } from 'react'
import {
    Icon,
    Button,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Card,
} from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { getInvoiceById } from './InvoiceService'
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import { getAllReceivers, getAllTransports, getDonationById, getDonationsByDonator } from 'app/services/queries'
import Loading from 'app/components/Loading/Loading'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    '@global': {
        '@media print': {
            'body, *, html': {
                visibility: 'hidden',
            },
            '#print-area': {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                '& *': {
                    visibility: 'visible',
                },
            },
        },
    },
    invoiceViewer: {
        '& h5': {
            fontSize: 15,
        },
    },
}))

const InvoiceViewer = ({ toggleInvoiceEditor }) => {
    const [state, setState] = useState({})
    const { user } = useAuth();
    const { id } = useParams()
    const classes = useStyles()

    const [donations, setDonations] = useState([]);
    const [transports, setTransports] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [donationInd, setDonationInd] = useState(0);


    const [matchDon, setMatchDon] = useState([]);

    const [counter, setCounter] = useState(3)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (counter === 0) setLoading(false)
    }, [counter])

    useEffect(() => {
        if (id !== 'add')
            getInvoiceById(id).then((res) => {
                setState({ ...res.data })
            })
    }, [id])

    useEffect(() => {
        getDonationsByDonator(user.id)
        .then((donations) => {
            console.log(donations.result)
            setDonations(donations.result)
            setMatchDon(donations.result.filter(don => don.donacion_id == id))
            console.log(donations.result.filter(don => don.donacion_id == id))
            setDonationInd(donations.result.map(don => don.donacion_id).indexOf(parseInt(id)))
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

    const handlePrint = () => window.print()

    let subTotalCost = 0
    let {
        orderNo,
        buyer,
        seller,
        item: invoiceItemList = [],
        status,
        date,
    } = state

    let vat = 10

    return (
        <>{ loading ? <Loading className="my-5" /> : 
        
            <div className={clsx('invoice-viewer py-4', classes.invoiceViewer)}>
            <div className="viewer_actions px-4 mb-5 flex items-center justify-between">
                <Link to="/invoice/list">
                    <IconButton>
                        <Icon>arrow_back</Icon>
                    </IconButton>
                </Link>
                <div>
                    <Button
                        className="mr-4 py-2"
                        variant="contained"
                        color="primary"
                        onClick={() => toggleInvoiceEditor()}
                        >
                        Edit Invoice
                    </Button>
                    <Button
                        onClick={handlePrint}
                        className="py-2"
                        variant="contained"
                        color="secondary"
                        >
                        Print Invoice
                    </Button>
                </div>
            </div>

            <div id="print-area">
                <div className="viewer__order-info px-4 mb-4 flex justify-between">
                    <div>
                        <h5 className="mb-2">Order Info</h5>
                        <p className="mb-4">Order Number</p>
                        <p className="mb-0"># {id}</p>
                    </div>
                    <div className="text-right">
                        <h5 className="font-normal mb-4 capitalize">
                            <strong>Order status:</strong> {matchDon[matchDon.lastIndex] && matchDon[matchDon.lastIndex].entregado !== undefined ? matchDon[matchDon.lastIndex] : 'Delivered'}
                        </h5>
                        <h5 className="font-normal capitalize">
                            <strong>Order date: </strong>{donations[donationInd].fecha}
                            {/* <span>
                                {date
                                    ? format(
                                        new Date(date).getTime(),
                                        'MMMM dd, yyyy'
                                        )
                                        : ''}
                            </span> */}
                        </h5>
                    </div>
                </div>

                <Divider />

                <div className="viewer__billing-info px-4 py-5 flex justify-between">
                    <div>
                        <h5 className="mb-2">Transportist</h5>
                        <p className="mb-4">{transports[transports.map(rec => rec.id).indexOf(parseInt(donations[donationInd].transportista_id))].nombre}</p>
                        <p className="mb-0 whitespace-pre-wrap">
                            {seller ? seller.address : null}
                        </p>
                    </div>
                    <div className="text-right w-full">
                        <h5 className="mb-2">Receiver</h5>
                        <p className="mb-4">{receivers[receivers.map(rec => rec.id).indexOf(parseInt(donations[donationInd].receptor_id))].nombre}</p>
                        <p className="mb-0 whitespace-pre-wrap">
                            {buyer ? buyer.address : null}
                        </p>
                    </div>
                    <div />
                </div>

                <Card className="mb-4" elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="pl-sm-24">#</TableCell>
                                <TableCell className="px-0">
                                    Item Name
                                </TableCell>
                                <TableCell className="px-0">Unit</TableCell>
                                <TableCell className="px-0">
                                    Weight
                                </TableCell>
                                {/* <TableCell className="px-0">Cost</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matchDon.map((item, index) => {
                                subTotalCost += parseInt(item.cantidad);
                                return (
                                    <TableRow key={index}>
                                        <TableCell
                                            className="pl-sm-24 capitalize"
                                            align="left"
                                            >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="pl-0 capitalize"
                                            align="left"
                                            >
                                            {item.nombre}
                                        </TableCell>
                                        <TableCell className="pl-0 capitalize">
                                            {item.cantidad}
                                        </TableCell>
                                        <TableCell
                                            className="pl-0 capitalize"
                                            align="left"
                                            >
                                            {item.descripcion}
                                        </TableCell>
                                        {/* <TableCell className="pl-0">
                                            {item.unit * item.price}
                                        </TableCell> */}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Card>

                <div className="px-4 flex justify-end">
                    <div className="flex">
                        <div className="pr-12">
                            <p className="mb-4">Sub Total:</p>
                            <p className="mb-4">Vat(%):</p>
                            <strong>
                                <p>Grand Total:</p>
                            </strong>
                        </div>
                        <div>
                            <p className="mb-4">{subTotalCost} Kg</p>
                            <p className="mb-4">{vat}</p>
                            <p>
                                <strong>
                                    $
                                    {
                                        ((subTotalCost * vat) / 100)
                                    }
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}</>
    )
}

export default InvoiceViewer
