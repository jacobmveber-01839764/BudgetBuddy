 import AddNewBill from './AddNewBill'
 import CurrentBalance from './CurrentBalance'
 
 export default function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <CurrentBalance />
            <AddNewBill />
        </>
    )
 }