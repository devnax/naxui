"use client"
import { useEffect, useState } from "react";

const NoSSR = ({ children }: any) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, [])
    return isClient ? children : null
}

export default NoSSR