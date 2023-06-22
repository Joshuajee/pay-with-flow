import * as fcl from "@onflow/fcl";
import { contract } from "@/libs/utils";

const getProfile = async (account: string | undefined) => { 

    if (!account) return
    return await fcl.query({
        cadence: `
        import FlowMerchant from ${contract}

        pub fun main(address: Address): &{FlowMerchant.PublicProfileInterface} {

            let account = getAccount(address)
            // Get the public capability from the public path of the owner's account
            let capability = account.getCapability<&{FlowMerchant.PublicProfileInterface}>(FlowMerchant.MerchantPublicPath)
            // borrow a reference for the capability
            let reference = capability.borrow()
              ?? panic("Could not borrow a reference to the Profile capability")
          
            return reference
          
        }

    `,
        args: (arg: any, t:any) => [arg(account, t.Address)],
    });

}

export default getProfile