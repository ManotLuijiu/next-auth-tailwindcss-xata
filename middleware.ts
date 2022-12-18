import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log('middleware_req', req);
      console.log('middleware_token', token);
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin"
      }
      // `/me` only requires the user to be logged in
      console.log('!!token', !!token);
      return !!token
    },
  },
})

export const config = { matcher: ["/admin", "/me"] }
