import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useContext } from 'react'
import GroupBill from '../../components/GroupBill';

const BillShow = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    // console.log(cookies)
    const bill = props.bill
    console.log(bill)

    
    // removeCookie("random cookie", { path: "/" })
    
    return (
        <div>
            <GroupBill bill={bill} /> 
        </div>
    )
}


export async function getServerSideProps(context) {
    // Get external data from the file system, API, DB, etc.
    const token = context.req.cookies.token
    if (!token)
        return {
          redirect: {
            destination: '/',
            permanent: false,
        },
    }
    else {
        const response = await axios.get(`http://localhost:3000/api/bills/${context.query.pid}`, { headers: {'Authorization': token}})
        console.log(response)
        const data = response.data
        return {
          props: { bill: data }
        }
    }
  
}


export default BillShow