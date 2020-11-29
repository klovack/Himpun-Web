import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
  profile?: Maybe<User>;
  tokenValid: Scalars['Boolean'];
};


export type QueryPostsArgs = {
  filter?: Maybe<PostFilterInput>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryTokenValidArgs = {
  token: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  featuredImage?: Maybe<Media>;
  author: User;
  votes?: Maybe<Array<User>>;
  likes?: Maybe<Array<User>>;
  dislikes?: Maybe<Array<User>>;
  bodySnippet: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
  mediaType: MediaType;
  authorId: Scalars['String'];
};

/** Avalable types for media entities */
export enum MediaType {
  Image = 'IMAGE',
  Audio = 'AUDIO',
  Video = 'VIDEO',
  Pdf = 'PDF'
}

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  medias?: Maybe<Array<Media>>;
};

export type PostFilterInput = {
  author?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  votes?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['String']>;
  dislikes?: Maybe<Scalars['String']>;
  searchableWord?: Maybe<Scalars['String']>;
  timespan?: Maybe<TimespanInput>;
};

export type TimespanInput = {
  timeStart?: Maybe<Scalars['DateTime']>;
  timeEnd?: Maybe<Scalars['DateTime']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  data: PostInput;
};


export type MutationUpdatePostArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options?: Maybe<NameInput>;
  credentials: CredentialInput;
};


export type MutationLoginArgs = {
  credentials: LoginInput;
};

export type PostInput = {
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  featuredImageId?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type NameInput = {
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type CredentialInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type BasicPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'body' | 'isPublished'>
  & { featuredImage?: Maybe<(
    { __typename?: 'Media' }
    & Pick<Media, 'url'>
  )>, author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), votes?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )>>, likes?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )>>, dislikes?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )>> }
);

export type SnippetPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'bodySnippet' | 'isPublished'>
  & { featuredImage?: Maybe<(
    { __typename?: 'Media' }
    & Pick<Media, 'url'>
  )>, author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ), votes?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )>>, likes?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )>>, dislikes?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )>> }
);

export type BasicUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type CommonUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'firstname'>
);

export type CompleteUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'firstname' | 'lastname'>
);

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & CompleteUserFragment
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  data: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'Post' }
    & BasicPostFragment
  )> }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  credentials: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & CompleteUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  credentials: CredentialInput;
  options?: Maybe<NameInput>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & CompleteUserFragment
    )> }
  ) }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  filter?: Maybe<PostFilterInput>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & SnippetPostFragment
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & BasicPostFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { profile?: Maybe<(
    { __typename?: 'User' }
    & CommonUserFragment
  )> }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { profile?: Maybe<(
    { __typename?: 'User' }
    & CompleteUserFragment
  )> }
);

export type TokenValidQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type TokenValidQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'tokenValid'>
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const BasicPostFragmentDoc = gql`
    fragment BasicPost on Post {
  id
  createdAt
  updatedAt
  title
  body
  isPublished
  featuredImage {
    url
  }
  author {
    id
    username
  }
  votes {
    username
  }
  likes {
    username
  }
  dislikes {
    username
  }
}
    `;
export const SnippetPostFragmentDoc = gql`
    fragment SnippetPost on Post {
  id
  createdAt
  updatedAt
  title
  bodySnippet
  isPublished
  featuredImage {
    url
  }
  author {
    id
    username
  }
  votes {
    username
  }
  likes {
    username
  }
  dislikes {
    username
  }
}
    `;
export const BasicUserFragmentDoc = gql`
    fragment BasicUser on User {
  id
  username
  email
}
    `;
export const CommonUserFragmentDoc = gql`
    fragment CommonUser on User {
  id
  username
  email
  firstname
}
    `;
export const CompleteUserFragmentDoc = gql`
    fragment CompleteUser on User {
  id
  username
  email
  firstname
  lastname
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    errors {
      ...RegularError
    }
    user {
      ...CompleteUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${CompleteUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($data: PostInput!) {
  createPost(data: $data) {
    ...BasicPost
  }
}
    ${BasicPostFragmentDoc}`;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($credentials: LoginInput!) {
  login(credentials: $credentials) {
    errors {
      ...RegularError
    }
    user {
      ...CompleteUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${CompleteUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($credentials: CredentialInput!, $options: NameInput) {
  register(credentials: $credentials, options: $options) {
    errors {
      ...RegularError
    }
    user {
      ...CompleteUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${CompleteUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String, $filter: PostFilterInput) {
  posts(limit: $limit, cursor: $cursor, filter: $filter) {
    ...SnippetPost
  }
}
    ${SnippetPostFragmentDoc}`;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    ...BasicPost
  }
}
    ${BasicPostFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  profile {
    ...CommonUser
  }
}
    ${CommonUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProfileDocument = gql`
    query Profile {
  profile {
    ...CompleteUser
  }
}
    ${CompleteUserFragmentDoc}`;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options });
};
export const TokenValidDocument = gql`
    query TokenValid($token: String!) {
  tokenValid(token: $token)
}
    `;

export function useTokenValidQuery(options: Omit<Urql.UseQueryArgs<TokenValidQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TokenValidQuery>({ query: TokenValidDocument, ...options });
};