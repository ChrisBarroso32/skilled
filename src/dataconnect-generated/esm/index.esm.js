import { executeQuery, makeMemoryCacheProvider, queryRef, validateArgs, validateArgsWithOptions } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'skilled-9a511-service',
  location: 'us-west4'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
export const skillsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'Skills', inputVars);
}
skillsRef.operationName = 'Skills';

export function skills(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(skillsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

