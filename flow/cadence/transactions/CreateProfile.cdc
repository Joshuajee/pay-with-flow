import FlowMerchant from 0x01

transaction {
    prepare(acct: AuthAccount, name: String) {

        // Create a new empty Games
        let profile <- FlowMerchant.createProfile(merchantName: name)

        // store the empty Account in account storage
        acct.save<@FlowMerchant.Profile>(<-profile, to: FlowMerchant.MerchantStoragePath)

        let capability = acct.link<&{FlowMerchant.PublicProfileInterface}>(FlowMerchant.MerchantPublicPath, target: FlowMerchant.MerchantStoragePath)

    }
    execute {
        log("Profile Created")
    }
}