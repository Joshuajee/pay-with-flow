import { query } from "@onflow/fcl";

const getFlowBalance = async (address: string) => {
  const cadence = `
    import FlowToken from 0xFLOW
    import FungibleToken from 0xFT

    pub fun main(address: Address): UFix64 {
      let account = getAccount(address)

      let vaultRef = account.getCapability(/public/flowTokenBalance)
        .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

      return vaultRef.balance
    }
  `;
  const args = (arg: any, t: any) => [arg(address, t.Address)];
  const balance = await query({ cadence, args });
  console.log({ balance });
  return balance
};

export default getFlowBalance