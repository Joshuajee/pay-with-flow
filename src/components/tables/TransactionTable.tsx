import { Transaction, TransactionStatus } from "@prisma/client";
import dateFormat from "dateformat";
import Badge from "@/components/utils/Badge";
import { useRouter } from "next/router";
import { fromTokenId } from "@/libs/utils";
import TableNav from "./tableNav";

interface IProps {
    columns: string[]
    data: Transaction[]
    page: number,
    counts: number
}

interface IPropsTx {
    status: TransactionStatus
}

const TransactionTable = (props: IProps) => {

    const router = useRouter()

    const Status = ({status} : IPropsTx) => {
        switch (status) {
            case "pending":
                return <Badge type="info" status="Pending" />
            case "paid":
                return <Badge type="success" status="Paid" />
            case "success":
                return <Badge type="success" status="Success" />
            case "partial_payment":
                return <Badge type="primary" status="Pairtial Payment" />
            default:
                return <Badge type="info" status="Pending" />
        }
    }

    const view = (id: number) => {
        router.push(`/transactions/${id}`)
    }

    return (  
        <div className="overflow-y-scroll h-[80vh]">

            <table className="w-full text-sm text-left text-gray-50 dark:text-gray-400">
            
                <thead className="text-xs text-white-700 uppercase">
            
                    <tr>
                        {
                            props.columns.map((column: string, index: number) => {
                                return (
                                    <th key={index} scope="col" className="px-6 py-3">
                                        {column}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>

                    {
                        props?.data?.map((row, index) => {

                            return (
                                <tr onClick={() => view(row.id)} key={index} className="cursor-pointer border-b hover:bg-gray-800">
                                    <td className="px-6 py-4">{row.tx_ref}</td>
                                    <td className="px-6 py-4">{Number(row.amount)}</td>
                                    <td className="px-6 py-4">{fromTokenId(Number(row.requestedToken))}</td>
                                    <td className="px-6 py-4"><Badge type="primary" status={row.source} /></td>
                                    <td className="px-6 py-4"><Status status={row.status} /></td>
                                    <td className="px-6 py-4">{dateFormat(row.createdAt)}</td>
                                </tr>
                            )
                        })
                    }
                
                </tbody>

            </table>

            <TableNav page={props.page} counts={props.counts} />
        
        </div>
    )

}

export default TransactionTable