import * as React from "react";
import { useSubmit } from "react-router";
import type { Route } from "./+types/sign-up";
import { Form } from "@base-ui-components/react/form";
import { Field } from "@base-ui-components/react/field";
import { InputParseError } from "~/entities/errors/common";
import { signUpController } from "~/core/interface-adapters/controllers/auth/sign-up.controller";
import { AuthenticationError } from "~/entities/errors/auth";

export async function action({ request }: Route.ActionArgs) {
	try {
		const formData = await request.formData();
		const email = formData.get("input");

		if (!email) {
			return;
		}

		await signUpController(email);
	} catch (err) {
		console.error("something went wrong.", err);

		if (err instanceof InputParseError) {
			return { error: err.message };
		}

		if (err instanceof AuthenticationError) {
			return { error: err.message };
		}

		return {
			error: "An error happended while signing up.",
		};
	}
}

export default function Signup() {
	const [errors, setErrors] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const submit = useSubmit();

	return (
		<div className="flex justify-center mt-4">
			<Form
				className="flex w-full max-w-64 flex-col gap-4"
				errors={errors}
				onClearErrors={setErrors}
				onSubmit={(evt) => {
					evt.preventDefault();
					const formData = new FormData(evt.currentTarget);
					submit(
						{
							input: formData.get("email") as string,
						},
						{ action: "/register", method: "post" },
					);
				}}
			>
				<Field.Root name="email" className="flex flex-col items-start gap-1">
					<Field.Control
						required
						placeholder="Enter your email address"
						className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
					/>
					<Field.Error className="text-sm text-red-800" />
				</Field.Root>
				<button
					disabled={loading}
					type="submit"
					className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
				>
					Send magic link
				</button>
			</Form>
		</div>
	);
}
