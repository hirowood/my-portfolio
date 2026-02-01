export { default } from "next-auth/middleware";

// 守りたいページを指定
export const config = {
  matcher: ["/mission", "/dashboard", "/todo"],
};