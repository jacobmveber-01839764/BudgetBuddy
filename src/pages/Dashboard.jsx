 import AddNewBill from '../components/AddNewBill'
 import CurrentBalance from '../components/CurrentBalance'
 import Expenses from '../components/Expenses'
 import Income from '../components/Income'
 import Budget from '../components/budget'
import RecentTransactions from '../components/RecentTransactions'
 
 export default function Dashboard() {
    return (
        <>
            <CurrentBalance />
            <Budget />
            <Expenses />
            <Income />
            <RecentTransactions />
            <AddNewBill />
        </>
    )
 }