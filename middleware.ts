import { authMiddleware } from "@clerk/nextjs";
import { Truck } from "lucide-react";

export default authMiddleware({
  publicRoutes: ["/"],
  debug : false,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};