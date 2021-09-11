import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useContext } from 'react'
import GroupBill from '../../components/GroupBill';

const BillShow = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const bill = props.bill
    
    return (
        <GroupBill bill={bill} /> 
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
        const response = await axios.get(`${process.env.API_URL}/api/bills/${context.query.pid}`, { headers: {'Authorization': token}})
        const data = response.data
        if (data.message === "unauthorized") {
            return {
                redirect: {
                destination: '/bills',
                },
            }
        }
        else {
            return {
                props: { bill: data }
            }
        }
    }
  
}


export default BillShow