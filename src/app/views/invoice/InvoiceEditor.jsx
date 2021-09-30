import React, { useState, useEffect } from 'react'
import {
    Button,
    Radio,
    FormControl,
    FormControlLabel,
    Divider,
    RadioGroup,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Icon,
    Card,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { getInvoiceById, addInvoice, updateInvoice } from './InvoiceService'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useCallback } from 'react'
import { uploadDonation } from 'app/services/queries'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    invoiceEditor: {
        '& h5': {
            fontSize: 15,
        },
    },
}))

const InvoiceEditor = ({ isNewInvoice, toggleInvoiceEditor }) => {
    const [isAlive, setIsAlive] = useState(true)
    const [state, setState] = useState({
        "id": id,
        "fecha": new Date().toISOString(),
        "nombre": "Arroz",
        "cantidad": 50,
        "descripcion": "Bolsa kileada de arroz"
    })

    const history = useHistory()
    const { id } = useParams()
    const classes = useStyles()

    const generateRandomId = useCallback(() => {
        let tempId = Math.random().toString()
        let id = tempId.substr(2, tempId.length - 1)
        setState((state) => ({ ...state, id }))
    }, [])

    const handleChange = (event) => {
        event.persist()
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const handleSellerBuyerChange = (event, fieldName) => {
        event.persist()
        setState({
            ...state,
            [fieldName]: {
                ...state[fieldName],
                [event.target.name]: event.target.value,
            },
        })
    }

    const handleIvoiceListChange = (event, index) => {
        let tempItemList = [...state.item]
        tempItemList.map((element, i) => {
            if (index === i) element[event.target.name] = event.target.value
            return element
        })

        setState({
            ...state,
            item: tempItemList,
        })
    }

    const addItemToInvoiceList = () => {
        let tempItemList = [...state.item]
        tempItemList.push({
            name: '',
            unit: '',
            price: '',
        })
        setState({
            ...state,
            item: tempItemList,
        })
    }

    const deleteItemFromInvoiceList = (index) => {
        let tempItemList = [...state.item]
        tempItemList.splice(index, 1)

        setState({
            ...state,
            item: tempItemList,
        })
    }

    const handleDateChange = (date) => {
        setState({ 
            ...state, 
            "fecha": date 
        })
    }

    const handleSubmit = () => {
        setState({ ...state, loading: true })
        let tempState = { ...state }
        // delete tempState.loading
        // delete tempState.buyer
        // delete tempState.currency
        // delete tempState.date
        // delete tempState.item
        // delete tempState.orderNo;
        // delete tempState.status;
        // delete tempState.seller;

        tempState.fecha = new Date().toISOString();   
        console.log(tempState)

        uploadDonation(tempState).then((invoice) =>{
            console.log(invoice)
            
        })
        // if (isNewInvoice)
        //     // addInvoice(tempState).then(() => {
        //     //     setState({ ...state, loading: false })
        //     //     history.push(`/invoice/${state.id}`)
        //     //     toggleInvoiceEditor()
        //     // })
        // else
        //     updateInvoice(tempState).then(() => {
        //         setState({ ...state, loading: false })
        //         toggleInvoiceEditor()
        //     })
    }

    useEffect(() => {
        if (!isNewInvoice) {
            getInvoiceById(id).then(({ data }) => {
                if (isAlive) setState({ ...data })
            })
        } else {
            generateRandomId()
        }
    }, [id, isNewInvoice, isAlive, generateRandomId])

    useEffect(() => {
        return () => setIsAlive(false)
    }, [])

    let subTotalCost = 0
    let {
        transportista_id,
        receptor_id,
        entregado,
        fecha,
        nombre,
        descripcion,
        cantidad,
        loading,
    } = state

    return (
        <div className={clsx('invoice-viewer py-4', classes.invoiceEditor)}>
            <ValidatorForm onSubmit={handleSubmit} onError={(errors) => null}>
                <div className="viewer_actions px-4 flex justify-end">
                    <div className="mb-6">
                        <Button
                            type="button"
                            className="mr-4 py-2"
                            variant="text"
                            onClick={() => toggleInvoiceEditor()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="py-2"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>

                <div className="viewer__order-info px-4 mb-4 flex justify-between">
                    <div>
                        <h5 className="mb-2">Order Info</h5>
                        <p className="mb-4">Order Number</p>
                        <TextValidator
                            label="Order No."
                            type="text"
                            fullWidth
                            name="id"
                            value={id}
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                    <div>
                        <FormControl
                            component="fieldset"
                            className="w-full mb-4"
                        >
                            <RadioGroup
                                aria-label="status"
                                name="entregado"
                                value={state ? state.entregado : 0 }
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    className="h-32"
                                    value={0}
                                    control={<Radio color="secondary" />}
                                    label="Pending"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    className="h-32"
                                    value={-1}
                                    control={<Radio color="secondary" />}
                                    label="Processing"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    className="h-32"
                                    value={1}
                                    control={<Radio color="secondary" />}
                                    label="Delivered"
                                    labelPlacement="start"
                                />
                            </RadioGroup>
                        </FormControl>

                        <div className="text-right">
                            <h5 className="font-normal">
                                <strong>Order date: </strong>
                            </h5>
                        </div>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="none"
                                id="mui-pickers-date"
                                label="Order Date"
                                inputVariant="standard"
                                type="text"
                                autoOk={true}
                                value={fecha}
                                fullWidth
                                format="MMMM dd, yyyy"
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                </div>

                <Divider />

                <Grid
                    className="px-4 py-5"
                    container
                    justify="space-between"
                    spacing={4}
                >
                    <Grid item>
                        <div>
                            <h5 className="mb-5 ">Transportist</h5>
                            <TextValidator
                                className="mb-5"
                                label="Transportman name"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'seller')
                                }
                                type="text"
                                name="name"
                                fullWidth
                                value={"Transportista 1"}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                label="Transports id"
                                type="text"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'seller')
                                }
                                name="transportista_id_address"
                                fullWidth
                                multiline={true}
                                rowsMax={4}
                                value={"1"}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="text-right">
                            <h5 className="mb-5">Bill To</h5>
                            <TextValidator
                                className="mb-5"
                                label="Receiver"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'buyer')
                                }
                                type="text"
                                name="name"
                                fullWidth
                                value={"Receiver Name"}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                label="Receiver ID"
                                onChange={(event) =>
                                    handleSellerBuyerChange(event, 'buyer')
                                }
                                type="text"
                                name="address"
                                fullWidth
                                multiline={true}
                                rowsMax={4}
                                value={"1"}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                    </Grid>
                </Grid>

                {/* Item list for editing */}
                <Table className="mb-4">
                    <TableHead>
                        <TableRow className="bg-default">
                            <TableCell className="pl-sm-24">#</TableCell>
                            <TableCell className="px-0">Item Name</TableCell>
                            <TableCell className="px-0">Unit</TableCell>
                            <TableCell className="px-0">Description</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    <TableRow key={1}>
                            <TableCell
                                className="pl-sm-24 capitalize"
                                align="left"
                            >
                                {1}
                            </TableCell>

                            <TableCell
                                className="pl-0 capitalize"
                                align="left"
                            >
                                <TextValidator
                                    label="Item Name"
                                    onChange={(event) =>
                                        handleIvoiceListChange(
                                            event,
                                            1
                                        )
                                    }
                                    type="text"
                                    name="npmbre"
                                    fullWidth
                                    value={nombre}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required',
                                    ]}
                                />
                            </TableCell>

                            <TableCell
                                className="pl-0 capitalize"
                                align="left"
                            >
                                <TextValidator
                                    label="Quantity"
                                    onChange={(event) =>
                                        handleIvoiceListChange(
                                            event,
                                            1
                                        )
                                    }
                                    type="number"
                                    name="cantidad"
                                    fullWidth
                                    value={cantidad}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required',
                                    ]}
                                />
                            </TableCell>

                            <TableCell
                                className="pl-0 capitalize"
                                align="left"
                            >
                                <TextValidator
                                    label="Descripcion"
                                    onChange={(event) =>
                                        handleIvoiceListChange(
                                            event,
                                            1
                                        )
                                    }
                                    type="text"
                                    name="descripcion"
                                    fullWidth
                                    value={descripcion}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required',
                                    ]}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {/* <div className="flex justify-end px-4 mb-4">
                    <Button onClick={addItemToInvoiceList} color="primary"><Icon className="mr-2">add_box</Icon>Add Item</Button>
                </div> */}

                {/* total cost calculation */}
                <div className="px-4 flex justify-end">
                    <div className="flex">
                        <div className="pr-12">
                            <p className="mb-8">Sub Total:</p>
                            <p className="mb-12">Vat(%):</p>
                            <strong>
                                <p>Grand Total:</p>
                            </strong>
                        </div>
                        <div>
                            <p className="mb-4">{subTotalCost} Kg</p>
                            <TextValidator
                                className="mb-1"
                                label="Vat"
                                type="number"
                                name="vat"
                                value={10}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <p className="mt-8">
                                <strong>
                                    {(cantidad * 10) / 100}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </ValidatorForm>
        </div>
        
    )
}



export default InvoiceEditor
