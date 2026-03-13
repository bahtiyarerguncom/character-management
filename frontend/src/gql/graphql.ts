/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  description: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Status;
};

export type CharacterFilterInput = {
  gender?: InputMaybe<Gender>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type Query = {
  __typename?: 'Query';
  characters: Array<Character>;
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilterInput>;
};

export enum Status {
  Alive = 'ALIVE',
  Dead = 'DEAD',
  Unknown = 'UNKNOWN'
}

export type GetCharactersQueryVariables = Exact<{
  filter?: InputMaybe<CharacterFilterInput>;
}>;


export type GetCharactersQuery = { __typename?: 'Query', characters: Array<{ __typename?: 'Character', id: number, image: string, name: string, status: Status, gender: Gender, description: string }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetCharactersDocument = new TypedDocumentString(`
    query GetCharacters($filter: CharacterFilterInput) {
  characters(filter: $filter) {
    id
    image
    name
    status
    gender
    description
  }
}
    `) as unknown as TypedDocumentString<GetCharactersQuery, GetCharactersQueryVariables>;