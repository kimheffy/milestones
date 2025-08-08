import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("register", "routes/sign-up.tsx"),
	route("verify", "routes/verify.tsx"),
] satisfies RouteConfig;
