import { useDataConnectQuery, validateReactArgs } from '@tanstack-query-firebase/react/data-connect';
import { CallerSdkTypeEnum } from 'firebase/data-connect';
import { connectorConfig, skillsRef } from '../../esm/index.esm.js';


export function useSkills(dcOrVars, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateReactArgs(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  const ref = skillsRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}