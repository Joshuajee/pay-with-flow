import { resolveTransaction } from "@/libs/utils";

const withdrawTGBP = async ( amount: number, callback?: () => void, errCallback?: () => void) => {
    const cadence = `
        import FungibleToken from 0xFT
        import TGBP from 0xFlowMerchant
        import FlowMerchant from 0xFlowMerchant
    
        transaction(amount: UFix64){

            prepare(signer: AuthAccount){

                let profile = signer.borrow<&FlowMerchant.Profile>(from: FlowMerchant.MerchantStoragePath)
                    ?? panic("Could not borrow Provider reference Merchant")
        
                let receiverAccount = getAccount(signer.address)

                log(profile)

                let receiver = receiverAccount.getCapability(/public/tgbpReceiver)
                    .borrow<&TGBP.Vault{FungibleToken.Receiver}>()
                    ?? panic("Could not borrow Receiver reference to the Vault")
          
        
                let tempVault <- profile.withdrawTGBP(amount: amount)

                receiver.deposit(from: <- tempVault)

            }
            execute {
                log("Withdrawn successfully")
            }
        }
    `;

    const args = (arg: any, t: any) => [arg(amount.toFixed(6), t.UFix64)];

    await resolveTransaction(cadence, args, callback, errCallback)

}

export default withdrawTGBP