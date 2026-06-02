import { build } from 'bun';

export interface BundlerOptions {
	entrypoint: string;
	outdir: string;
	filename: string;
	isWatch: boolean;
	target: 'node' | 'browser';
}

export async function compileResource({
	entrypoint,
	filename,
	isWatch,
	outdir,
	target,
}: BundlerOptions) {
	const result = await build({
		entrypoints: [entrypoint],
		outdir,
		naming: filename,
		target,
		format: target === 'node' ? 'esm' : 'iife',
		minify: !isWatch,
		sourcemap: isWatch ? 'inline' : 'none',
	});

	if (!result.success) {
		console.error(`\n❌ Compilation failed for: ${entrypoint}`);
		console.error(result.logs.join('\n'));
		return false;
	}
	console.log(
		`\x1b[32m[${new Date().toLocaleTimeString()}] Bundled ${filename} successfully.\x1b[0m`,
	);
	return true;
}
