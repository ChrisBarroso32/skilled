import type { UseDataConnectQueryResult, useDataConnectQueryOptions } from '@tanstack-query-firebase/react/data-connect';
import type { DataConnect } from 'firebase/data-connect';
import type { SkillsData, SkillsVariables } from '../';


export function useSkills(vars?: SkillsVariables, options?: useDataConnectQueryOptions<SkillsData>): UseDataConnectQueryResult<SkillsData, SkillsVariables>;
export function useSkills(dc: DataConnect, vars?: SkillsVariables, options?: useDataConnectQueryOptions<SkillsData>): UseDataConnectQueryResult<SkillsData, SkillsVariables>;
