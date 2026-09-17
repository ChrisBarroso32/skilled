import type { ConnectorConfig, DataConnect, DataConnectSettings, ExecuteQueryOptions, QueryPromise, QueryRef } from 'firebase/data-connect';

export declare const connectorConfig: ConnectorConfig;
export declare const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface SkillsData {
  skills: ({
    id: UUIDString;
    title: string;
    description: string;
    tags: string[];
    createdAt: TimestampString;
    installCommand: string;
    author: {
      userName?: string | null;
      imageUrl?: string | null;
      clerkId: string;
      email: string;
    } & User_Key;
  } & Skill_Key)[];
}

export interface SkillsVariables {
  searchTerm?: string | null;
  limit?: number | null;
}

export interface User_Key {
  clerkId: string;
  __typename?: 'User_Key';
}

interface SkillsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SkillsVariables): QueryRef<SkillsData, SkillsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: SkillsVariables): QueryRef<SkillsData, SkillsVariables>;
  operationName: string;
}
export declare const skillsRef: SkillsRef;

export function skills(vars?: SkillsVariables, options?: ExecuteQueryOptions): QueryPromise<SkillsData, SkillsVariables>;
export function skills(dc: DataConnect, vars?: SkillsVariables, options?: ExecuteQueryOptions): QueryPromise<SkillsData, SkillsVariables>;