import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import BillIndexContainer from "../../components/BillIndexContainer";
import NewBillBtn from "../../components/NewBillBtn";

const Bills = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const router = useRouter()
    const bills = props.bills

    useEffect(() => {
        if (!cookies.token) { router.push('/') }
    })


    return (
        <div>
            <NewBillBtn />
            {props.bills.map(bill => (
                <BillIndexContainer key={bill.id} bill={bill} />
            ))}
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
        const response = await axios.get(`${process.env.API_URL}/api/bills`, { headers: {'Authorization': token}})
        const data = response.data

        return {
            props: { bills: data }
        }
    }
  
}

export default Bills