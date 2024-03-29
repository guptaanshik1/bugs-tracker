export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/issues/new",
    "/issues/:id/edit", // to include anything that comes after edit in the middleware function (kind of a modifier)
  ],
};
