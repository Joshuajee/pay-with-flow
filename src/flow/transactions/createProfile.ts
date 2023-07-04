import { contract, resolveTransaction } from "@/libs/utils";
import * as fcl from "@onflow/fcl";

const createProfile = async (name: string, callback?: () => void, errCallback?: ()=> void) => {

  const cadence = `
    import FlowMerchant from 0xFlowMerchant

      transaction (name: String) {

        prepare(acct: AuthAccount) {
  
          // Create a new profile
          let profile <- FlowMerchant.createProfile(merchantName: name)
  
          // store the empty Account in account storage
          acct.save<@FlowMerchant.Profile>(<-profile, to: FlowMerchant.MerchantStoragePath)
  
          let capability = acct.link<&{FlowMerchant.PublicProfileInterface}>(FlowMerchant.MerchantPublicPath, target: FlowMerchant.MerchantStoragePath)
  
        }
        execute {
          log("Profile Created")
        }
      
      }
    `


  const args = (arg: any, t: any) => [arg(name, t.String)];

  await resolveTransaction(cadence, args, callback, errCallback)

};

export default createProfile
 