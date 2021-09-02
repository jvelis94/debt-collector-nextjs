import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'

const Bills = () => {
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.token) { router.push('/') }
    })
    


    return (
        <div>
            <button>
                <Link href="/bills/create-bill">
                    New Bill
                </Link>
            </button>
        </div>
    )
}

export default Bills