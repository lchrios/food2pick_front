import React, { useState, useEffect } from 'react'
import { Card, Grid } from '@material-ui/core'
import InvoiceViewer from './InvoiceViewer'
import InvoiceEditor from './InvoiceEditor'
import { useParams } from 'react-router-dom'

const InvoiceDetails = () => {
    const [showInvoiceEditor, setShowInvoiceEditor] = useState(false)
    const [isNewInvoice, setIsNewInvoice] = useState(false)

    const { id } = useParams()

    const toggleInvoiceEditor = () => {
        setShowInvoiceEditor(!showInvoiceEditor)
        setIsNewInvoice(false)
    }

    useEffect(() => {
        if (id === 'add') {
            setShowInvoiceEditor(true)
            setIsNewInvoice(true)
        }
    }, [id])

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card elevation={6} className="m-sm-30">
                        {showInvoiceEditor ? (
                            <InvoiceEditor
                            toggleInvoiceEditor={toggleInvoiceEditor}
                            isNewInvoice={isNewInvoice}
                            />
                            ) : (
                                <InvoiceViewer toggleInvoiceEditor={toggleInvoiceEditor} />
                                )}
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default InvoiceDetails
