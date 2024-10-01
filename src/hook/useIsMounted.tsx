import { useCallback, useEffect, useState } from "react"

const useIsMounted = () : boolean => {
    const [ isMounted, setIsMounted ] = useState<boolean>(false)
    
    useEffect(() => {
        setIsMounted(true)
        return () => void (setIsMounted(false))
    }, [])

    return isMounted
}

export default useIsMounted