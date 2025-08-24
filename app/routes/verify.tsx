import { redirect } from "react-router";
import type { Route } from "./+types/verify";
import { verifyController } from "~/core/interface-adapters/controllers/auth/verify.controller";
import { InputParseError } from "~/entities/errors/common";
import { AuthenticationError } from "~/entities/errors/auth";

export async function loader(loader: Route.LoaderArgs) {
	const url = new URL(loader.request.url);
	const userId = url.searchParams.get("userId");
	const secretToken = url.searchParams.get("secret");

	try {
		await verifyController(userId, secretToken);
	} catch (err) {
		console.error("Failed on init... ", err);

		if (err instanceof InputParseError) {
			return { error: err.message };
		}

		if (err instanceof AuthenticationError) {
			return { error: err.message };
		}

		return {
			error: "An error has occured when trying to verify your credentials.",
		};
	}

	return redirect("/");
}

export default function Verify() {
	return <h1>You are on the verify page</h1>;
}
