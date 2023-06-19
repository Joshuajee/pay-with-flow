import { contract } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const createProfile = async (name: string, callBack?: () => void) => {

  const transactionId = await fcl.mutate({
    cadence: `
        import FlowMerchant from ${contract}

        transaction {
            prepare(acct: AuthAccount) {
        
                // Create a new empty Games
                let profile <- FlowMerchant.createProfile(merchantName: "John", merchantAddress: acct.address )
        
                // store the empty Account in account storage
                acct.save<@FlowMerchant.Profile>(<-profile, to: FlowMerchant.MerchantStoragePath)
        
                let capability = acct.link<&{FlowMerchant.PublicProfileInterface}>(FlowMerchant.MerchantPublicPath, target: FlowMerchant.MerchantStoragePath)
        
            }
            execute {
                log("Profile Created")
            }
        
        }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 500,
  });

  fcl.tx(transactionId).subscribe((res: any) => {
    if (res.status === 4) {
      //callBack()
    }
  });

};

export default createProfile
 