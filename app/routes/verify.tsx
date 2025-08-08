import * as React from "react";
import { useSearchParams } from "react-router";
import { verifyController } from "~/core/interface-adapters/controllers/auth/verify.controller";
import { InputParseError } from "~/core/entities/errors/common";
import { AuthenticationError } from "~/core/entities/errors/auth";

export default function Verify() {
	const [searchParams] = useSearchParams();

	const userId = searchParams.get("userId");
	const secretToken = searchParams.get("secret");

	// TODO: Put this in an action file
	async function init() {
		try {
			await verifyController(userId, secretToken);
		} catch (err) {
			// TODO: report errors
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

		return {
			success: true,
		};
	}

	React.useEffect(() => {
		init();
	}, []);

	return <h1>You are on the verify page</h1>;
}
