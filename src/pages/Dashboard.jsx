 import AddNewBill from './AddNewBill'
 import CurrentBalance from './CurrentBalance'
 import Expenses from './Expenses'
 import Income from './Income'
 import Budget from './budget'
import RecentTransactions from './RecentTransactions'
 
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