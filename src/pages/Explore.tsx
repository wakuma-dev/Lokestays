import { useSearchProperties } from "@/feature/search"
export default function Explore(){
    const { data:properties = [], isPending, error, isError} = useSearchProperties();
    if(properties?.length === 0){
        return <p>No approved products</p>
    }
    return(
        <main>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        Property ID: {property.id}
                    </li>
                ))}
            </ul>
        </main>

    )
}