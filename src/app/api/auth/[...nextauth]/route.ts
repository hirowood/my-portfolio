import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 環境変数のパスワードと一致するかチェック
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          // ログイン成功時に返すユーザー情報
          return { id: "1", name: "Commander", email: "admin@example.com" };
        }
        // 失敗
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login', // 独自のログインページ（後で作ります）
  },
});

export { handler as GET, handler as POST };