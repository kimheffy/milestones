import * as React from "react";
import { Field } from "@base-ui-components/react/field";
import { Form } from "@base-ui-components/react/form";

import { createHabitController } from "~/core/interface-adapters/controllers/habits/create-habit.controller";

export async function action({ request }: Route.ActionArgs) {
	try {
		const formData = new FormData(event.currentTarget);
		const value = formData.get("habit") as string;

		setLoading(true);
		await createHabitController(value);
	} catch (err) {
		console.error("Something went wrong...", err);
		setErrors({ error: err });
	} finally {
		setLoading(false);
	}

	return { success: true };
}

export function HabitForm() {
	const [errors, setErrors] = React.useState({});
	const [loading, setLoading] = React.useState(false);

	return (
		<div className="flex justify-center mt-4">
			<Form
				className="flex w-full max-w-64 flex-col gap-4"
				errors={errors}
				onClearErrors={setErrors}
				onSubmit={createHabit}
			>
				<Field.Root name="habit" className="flex flex-col items-start gap-1">
					<Field.Control
						required
						placeholder="Enter your new habit"
						className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
					/>
					<Field.Error className="text-sm text-red-800" />
				</Field.Root>
				<button
					disabled={loading}
					type="submit"
					className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
				>
					Submit
				</button>
			</Form>
		</div>
	);
}

async function submitForm(value: string) {
	// Mimic a server response
	await new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

	if (!value) {
		return { error: "Please enter a habit you want to track." };
	}

	// try {
	// 	const url = new URL(value);
	//
	// 	if (url.hostname.endsWith("example.com")) {
	// 		return { error: "The example domain is not allowed" };
	// 	}
	// } catch {
	// 	return { error: "This is not a valid URL" };
	// }

	return { success: true };
}
