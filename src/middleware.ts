import { withAuth } from "next-auth/middleware";

// 明示的に withAuth を使って関数をエクスポートする
export default withAuth({
  pages: {
    signIn: '/login', // ログインページの場所を指定
  },
});

export const config = {
  matcher: ["/mission", "/dashboard", "/todo"],
};