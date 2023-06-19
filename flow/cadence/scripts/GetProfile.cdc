import FlowMerchant from 0x01


pub fun main(address: Address): &{FlowMerchant.PublicProfileInterface} {

    let account = getAccount(address)
    // Get the public capability from the public path of the owner's account
    let capability = account.getCapability<&{FlowMerchant.PublicProfileInterface}>(FlowMerchant.MerchantPublicPath)
    // borrow a reference for the capability
    let reference = capability.borrow()
      ?? panic("Could not borrow a reference to the Profile capability")
  
    return reference
  
}
