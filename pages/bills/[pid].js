import axios from 'axios'
import { useContext } from 'react'
import AuthenticationContext, { AuthenticationContextProvider } from '../../store/authentication-store'

const BillShow = (props) => {
    return (
        <div>
            Bill show page
        </div>
    )
}


export async function getServerSideProps(context) {
    // Get external data from the file system, API, DB, etc.
    const data = await axios.get(`http://localhost:3000/api/bills/${context.query.pid}`, { headers: {'Authorization': `${localStorage.token}`}})

    console.log(data)
  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: data
    }
}
export default BillShow