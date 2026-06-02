#!/usr/bin/env bun
import { watch } from 'fs';
import { join } from 'path';
import { compileResource } from './src/compile';

const isWatchMode = Bun.argv.includes('--watch');
const executionDir = process.cwd();

const serverEntry = join(executionDir, 'src/server/server.ts');
const clientEntry = join(executionDir, 'src/client/client.ts');
const outDir = join(executionDir, 'dist');

async function runPipeline() {
	if (await Bun.file(serverEntry).exists()) {
		await compileResource({
			entrypoint: serverEntry,
			outdir: outDir,
			filename: 'server.js',
			isWatch: isWatchMode,
			target: 'node',
		});
	}
	if (await Bun.file(clientEntry).exists()) {
		await compileResource({
			entrypoint: clientEntry,
			outdir: outDir,
			filename: 'client.js',
			isWatch: isWatchMode,
			target: 'browser',
		});
	}
}

await runPipeline();

if (isWatchMode) {
	watch(
		join(executionDir, 'src'),
		{ recursive: true },
		async (_, filename) => {
			if (filename?.endsWith('.ts')) await runPipeline();
		},
	);
}
