import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'light',
  },

  // Configure JWT
  // session: {
  //   jwt: true,
  //   maxAge: 7 * 24 * 60 * 60,
  // },
  callbacks: {
    async signin({ user, account, profile, email, credentials }) {
      if (user) {
        console.log('signin_user_callbacks', user);
      }
      if (account) {
        console.log('signin_account_callbacks', account);
      }
      if (profile) {
        console.log('signin_profile_callbacks', profile);
      }
      if (email) {
        console.log('signin_email_callbacks', email);
      }
      if (credentials) {
        console.log('signin_credentials_callbacks', credentials);
      }
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url) {
        console.log('redirect(url)_callbacks', url);
      }
      if (baseUrl) {
        console.log('redirect(baseUrl)_callbacks', baseUrl);
      }
      return baseUrl;
    },

    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      if (user) session.user.role = user.role;
      console.log('_session_in_session', session);
      console.log('_token_in_session', token);
      console.log('_user_in_session', user);
      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (isNewUser) {
        console.log('isNewUser', isNewUser);
      }

      if (profile) {
        console.log('profile', profile);
      }

      if (account) {
        console.log('account_jwt', account);
        token.accessToken = account.access_token;
      }

      if (user) {
        console.log('user_jwt', user);
        token.id = user.id;
      }

      if (user?.email === 'manot.luijiu@gmail.com') {
        token.userRole = 'admin';
      }

      console.log('token___nextauth.ts', token);
      return token;
    },
  },

  // Events for debugging and audit log
  events: {
    signin: async (message) => {
      console.log('events_signin', message);
    },
    signout: async (message) => {
      console.log('events_signout', message);
    },
    createUser: async (message) => {
      console.log('events_createUser', message);
    },
    linkAccount: async (message) => {
      console.log('events_linkAccount', message);
    },
    session: async (message) => {
      console.log('events_session', message);
    },
    error: async (message) => {
      console.log('events_error', message);
    },
  },
};

export default NextAuth(authOptions);
