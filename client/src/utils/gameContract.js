import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
})

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

// account is not optional
export function getSigner(
  library,
  account,
) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library,
  account,
) {
  return account ? getSigner(library, account) : library;
}

export const getContract = (contractAddress, contractABI, library, account) => {
  return new Contract(
    contractAddress,
    contractABI,
    getProviderOrSigner(library, account),
  );
}