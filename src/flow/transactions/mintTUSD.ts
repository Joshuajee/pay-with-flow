import { resolveTransaction } from "@/libs/utils";

const mintTUSD = async (callback?: () => void, errCallback?: () => void) => {
    const cadence = `
        import FungibleToken from 0xFT
        import TUSD from 0xFlowMerchant
        
        transaction(){
            prepare(signer: AuthAccount) {

                let vault = signer.borrow<&TUSD.Vault>(from: /storage/tusdVault)
                    
                // It's OK if the account already has a Vault, but we don't want to replace it
                if(vault != nil) {
                    vault?.deposit(from: <- TUSD.mintTokens())
                    return
                }
                
                // Create a new TUSD Vault and put it in storage
                signer.save(<-TUSD.mintTokens(), to: /storage/tusdVault)
        
                // Create a public capability to the Vault that only exposes
                // the deposit function through the Receiver interface
                signer.link<&TUSD.Vault{FungibleToken.Receiver}>(
                    /public/tusdReceiver,
                    target: /storage/tusdVault
                )
        
                // Create a public capability to the Vault that only exposes
                // the balance field through the Balance interface
                signer.link<&TUSD.Vault{FungibleToken.Balance}>(
                    /public/tusdBalance,
                    target: /storage/tusdVault
                )
                
            }
            execute {
                log("Minted successfully")
            }

        }

    `;

    const args = (arg: any, t: any) => [];

    await resolveTransaction(cadence, args, callback, errCallback)

}

export default mintTUSD