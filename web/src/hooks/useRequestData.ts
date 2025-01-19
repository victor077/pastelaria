import { getMenu } from "@/services/menu";
import { ResponseMenuDTO } from "@/services/models/menu";
import { getOrders } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

export const useRequestData = () => {
    const {data: dataOrders } = useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrders(),
        refetchOnWindowFocus: false,
        initialData: []
    })

    const {data: dataMenu} = useQuery({
        queryKey: ['menu'],
        queryFn: () => getMenu(),
        refetchOnWindowFocus: false,
        initialData: {} as ResponseMenuDTO,
    })
    return {dataOrders, dataMenu}
}