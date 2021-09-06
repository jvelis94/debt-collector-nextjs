import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCookies } from 'react-cookie';
import axios from 'axios'

const Bills = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const router = useRouter()
    const bills = props.bills
    console.log(bills)

    useEffect(() => {
        if (!cookies.token) { router.push('/') }
    })


    return (
        <div>
            <button>
                <Link href="/bills/create-bill">
                    New Bill
                </Link>
            </button>
            <div>
                {bills.map(bill => (
                    <div key={bill.id}>
                        <h1>{bill.bill_name}</h1>
                    </div>
                ))}
            </div>
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
        const response = await axios.get(`http://localhost:3000/api/bills`, { headers: {'Authorization': token}})
        const data = response.data

        return {
            props: { bills: data }
        }
    }
  
}

export default Bills