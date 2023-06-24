import { resolveTransaction } from "@/libs/utils";
import { mutate, tx } from "@onflow/fcl";


const createProfile = async (name: string, callback?: () => void, errCallback?: () => void) => {

  const cadence = `
    import FlowMerchant from 0xFlowMerchant

    transaction {
      prepare(acct: AuthAccount, name: String) {

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
  `

  const args = (arg: any, t: any) => [arg(name, t.String), t.UFix64];

  await resolveTransaction(cadence, args, callback, errCallback)

};

export default createProfile
 