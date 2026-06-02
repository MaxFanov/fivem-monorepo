console.log(
	`^2[Service] @monorepo/core-auth running natively inside container layer.^7`,
);

RegisterCommand(
	'testwsl',
	(source: number) => {
		console.log(
			`WSL Integration Pipeline Operational. Source context: ${source}`,
		);
	},
	false,
);
