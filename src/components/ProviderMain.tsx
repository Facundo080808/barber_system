import { PropsWithChildren } from "react";
import { ClientesProvider } from "../context/clientContext";
import { TurnosProvider } from "../context/shiftContext";


export function ProviderMain({children}: PropsWithChildren) {  
    
    return (
            <ClientesProvider>
        <TurnosProvider>
                {children}
        </TurnosProvider>
            </ClientesProvider>
    )
}