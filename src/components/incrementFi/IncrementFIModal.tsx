import { useAuth } from "@/contexts/AuthContext"
//import createProfile from "@/flow/transactions/accountSetUp"
import ModalWrapper from "../modals/ModalWrapper"
import { fromTokenId } from "@/libs/utils"
import IncrementPayBtn from "./IncrementPayBtn"


interface IProps {
    open: boolean;
    token: number | undefined | null;
    amount: number;
    tx_ref: string;
    address: string;
    redirect: string | null;
    handleClose: () => void
}

const IncrementFIModal = ({open, token, amount, tx_ref, address, redirect, handleClose } : IProps) => {

    const requestedToken = Number(token)

    return (
        <ModalWrapper title={"Pay With another currency"} open={open} handleClose={handleClose}>
        
            <div className="flex flex-col justify-center">

                <h3 className="text-center text-xl font-bold py-3">
                    Amount: {amount} {fromTokenId(token as number)}
                </h3>

                {   (token != 0) && <IncrementPayBtn redirect={redirect} tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(0)}   handClose={handleClose} />   }

                {   (token != 1) && <IncrementPayBtn redirect={redirect} tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(1)}   handClose={handleClose} />   }

                {   (token != 2) && <IncrementPayBtn redirect={redirect} tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(2)}   handClose={handleClose} />   }

                {   (token != 3) && <IncrementPayBtn redirect={redirect} tx_ref={tx_ref} address={address} amount={amount} requestedToken={requestedToken} token={fromTokenId(3)}   handClose={handleClose} />   }


                <div className="text-end pt-6">

                    Powered by Increment Finance

                </div>

            </div>

        </ModalWrapper>
    )
}

export default IncrementFIModal
 