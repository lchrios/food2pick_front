import {
    Badge,
    Card,
    Divider,
    Fab,
    Grid,
    Icon,
    IconButton,
    TableCell,
    TableRow,
} from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import ProfileBarChart from './ProfileBarChart'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import { getDonationsByDonator } from 'app/services/queries';
import MUIDataTable from 'mui-datatables'
import axios from 'axios'


const usestyles = makeStyles(({ palette, ...theme }) => ({
    profileContent: {
        marginTop: -345,
        paddingTop: 74,
        paddingRight: 30,
        paddingLeft: 4,
        '& .menu-button': {
            display: 'none',
        },

        '@media only screen and (max-width: 959px)': {
            marginTop: -390,
            paddingTop: 24,
            paddingRight: 16,
            paddingLeft: 16,
        },

        '@media only screen and (max-width: 767px)': {
            marginTop: -410,
            paddingTop: 16,
            paddingRight: 16,
            paddingLeft: 16,
            '& .menu-button': {
                display: 'flex',
            },
        },
    },

    cardLeftVerticalLine: {
        '&:after': {
            content: '" "',
            position: 'absolute',
            height: 35,
            width: 5,
            top: -30,
            background: palette.primary.main,
        },
    },

    cardGrayBox: {
        height: 220,
        width: 'calc(100% - 16px)',
        borderRadius: 8,
        backgroundColor: 'rgba(var(--body), 0.1)',
    },
    largeIcon: {
        fontSize: "3em"
    }
}))

const UserProfileContent = ({ toggleSidenav }) => {
    const classes = usestyles()
    const theme = useTheme();
    const [donations, setDonations] = useState([]);
    const [summary, setSummary] = useState({
        "donations": {
            title: 'Donations made',
            amount: 0,
            icon: 'shopping_basket',
        },
        "food": {
            title: 'KG of food',
            amount: "0 Kg",
            icon: 'local_dining'
        },
        "last": {
            title: 'Last donation',
            amount: new Date(new Date().getTime() - 1*17*60*60*1000).toLocaleTimeString("es-MX", options),
            icon: 'access_time'
        }
    });
    let { user } = useAuth();

    const [isAlive, setIsAlive] = useState(true)
    

    useEffect(() => {
        getDonationsByDonator(user.id)
        .then(donations => {
            console.log(donations.result)
            //setDonations(donations)
        })
    }, [])

    useEffect(() => {
        if (donations.length > 0) {
            // * sort them by time
            donations.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

            // * calculate summaries
            donations.forEach((donation) => {

            })
        }
    }, donations)

    return (
        <Fragment>
            <div className={classes.profileContent}>
                <div className="flex justify-end menu-button">
                    <IconButton onClick={toggleSidenav}>
                        <Icon className="text-white">menu</Icon>
                    </IconButton>
                </div>
                <div className={classes.headerCardHolder}>
                    <Grid container spacing={3}>
                        {Object.keys(summary).map((key) => (
                            <Grid
                                item
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                key={summary[key].title}
                            >
                                <Card className="h-96 bg-gray bg-default flex items-center justify-between p-4">
                                    <div>
                                        <span className="text-light-white uppercase">
                                            {summary[key].title}
                                        </span>
                                        <h4 className="font-normal text-white m-0 pt-2">
                                            {summary[key].amount}
                                        </h4>
                                    </div>
                                    <div className="w-56 h-36">
                                        <Icon className={classes.largeIcon}>{summary[key].icon}</Icon>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className="py-8" />
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Card className="pb-4">
                            <h4 className="font-medium text-muted px-4 pt-4 pb-0">
                                Current donation
                            </h4>
                            <ProfileBarChart
                                height="260px"
                                color={[theme.palette.warn]}
                            />
                            <div className="pt-4 flex items-center justify-around">
                                <div>
                                    <h1 className="font-normal m-0 mb-1">
                                        {"70 kg"}
                                    </h1>
                                    <span className="font-normal text-muted uppercase">
                                        avg yearly
                                    </span>
                                </div>
                                <div>
                                    <h1 className="font-normal m-0 mb-1">12.3 Kg</h1>
                                    <span className="font-normal text-muted uppercase">
                                        avg monthly
                                    </span>
                                </div>
                                <div>
                                    <h1 className="font-normal m-0 mb-1">3.1 Kg</h1>
                                    <span className="font-normal text-muted uppercase">
                                        avg weekly
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card className="p-4 h-full">
                            <h4 className="font-medium text-muted pb-6 pb-0 mb-6">
                                Contacts
                            </h4>
                            <div className="flex items-center mb-4">
                                <Badge badgeContent="New" color="primary">
                                    <Fab className="bg-light-primary box-shadow-none overflow-hidden">
                                        <h4 className="text-primary m-0 font-normal">
                                            MR
                                        </h4>
                                    </Fab>
                                </Badge>
                                <div className="ml-4">
                                    <h5 className="m-0 mb-1 font-medium">
                                        Watson Joyce
                                    </h5>
                                    <p className="m-0 text-muted">London</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <Fab className="bg-light-green box-shadow-none overflow-hidden">
                                    <h4 className="text-green m-0 font-normal">
                                        WT
                                    </h4>
                                </Fab>
                                <div className="ml-4">
                                    <h5 className="m-0 mb-1 font-medium">
                                        Watson Joyce
                                    </h5>
                                    <p className="m-0 text-muted">London</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-4">
                                <Fab className="bg-light-error box-shadow-none overflow-hidden">
                                    <h4 className="text-error m-0 font-normal">
                                        RY
                                    </h4>
                                </Fab>
                                <div className="ml-4">
                                    <h5 className="m-0 mb-1 font-medium">
                                        Watson Joyce
                                    </h5>
                                    <p className="m-0 text-muted">London</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Fab className="bg-light-primary box-shadow-none overflow-hidden">
                                    <h4 className="text-error m-0 font-normal">
                                        MR
                                    </h4>
                                </Fab>
                                <div className="ml-4">
                                    <h5 className="m-0 mb-1 font-medium">
                                        Watson Joyce
                                    </h5>
                                    <p className="m-0 text-muted">London</p>
                                </div>
                            </div>
                        </Card>
                    </Grid>

                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <div className="py-3"></div>
                        <Card className="overflow-unset flex py-4">
                        <MUIDataTable
                            title={'User Report'}
                            data={donations}
                            columns={columns}
                            options={{
                                filter: true,
                                filterType: 'textField',
                                responsive: 'simple',
                                expandableRowsHeader: false,
                                expandableRows: true, // set rows expandable
                                expandableRowsOnClick: true,
                                selectableRows: false,
                                renderExpandableRow: (rowData, { dataIndex }) => {
                                    const colSpan = rowData.length + 1
                                    console.log(rowData)
                                    return (
                                        <TableRow>
                                            <TableCell colSpan={colSpan}>
                                                <p className="mx-4 my-2">
                                                    {rowData[0]} has ${rowData[3]} in his
                                                    wallet
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    )
                                },
                            }} />
                        </Card>
                    </Grid>

                    {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card>
                            {paymentList.map((method, index) => (
                                <Fragment key={index}>
                                    <div className="py-4 px-6 flex flex-wrap items-center justify-between">
                                        <div className="flex flex-wrap items-center">
                                            <div className="flex justify-center items-center bg-gray w-64 h-52 border-radius-4">
                                                <img
                                                    className="w-36 overflow-hidden"
                                                    src={method.img}
                                                    alt="master card"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <h5 className="mb-1 font-medium">
                                                    {method.type}
                                                </h5>
                                                <span className="text-muted">
                                                    {method.product}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {index !== paymentList.length - 1 && (
                                        <Divider />
                                    )}
                                </Fragment>
                            ))}
                        </Card>
                    </Grid> */}
                </Grid>
                <div className="py-2"></div>
            </div>
        </Fragment>
    )
}

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', };
const projectSummery = [
    {
        title: 'Donations made',
        amount: 0,
        icon: 'shopping_basket'
    },
    {
        title: 'KG of food',
        amount: "15 Kg",
        icon: 'local_dining'
    },
    {
        title: 'Last donation',
        amount: new Date(new Date().getTime() - 1*17*60*60*1000).toLocaleTimeString("es-MX", options),
        icon: 'access_time'
    },
]

const columns = [
    {
        name: 'name', // field name in the row object
        label: 'Name', // column title that will be shown in table
        options: {
            filter: true,
        },
    },
    {
        name: 'unit',
        label: 'Units',
        options: {
            filter: true,
        },
    },
    {
        name: 'weight',
        label: 'Weight',
        options: {
            filter: true,
        },
    },
]

export default UserProfileContent
