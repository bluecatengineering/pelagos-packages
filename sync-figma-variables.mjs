#!/usr/bin/env node
/**
 * Sync variables to a Figma file from three YAML files:
 *  - themes-meta.yaml  (token -> { group, set, properties })
 *  - colors.yaml       (base palettes and their shades/hover variants)
 *  - themes.yaml       (theme -> token -> palette reference like "gray-100/50%" or "blue-60-hover")
 *
 * Requirements:
 *  - Node.js 18+ (uses native fetch)
 *  - npm i yaml
 *
 * Usage:
 *  FIGMA_TOKEN=xxxx FILE_KEY=yyyy node sync-figma-variables.js
 * Optional flags:
 *  --themes-meta ./themes-meta.yaml --colors ./colors.yaml --themes ./themes.yaml
 *  --dry-run  (print the request body instead of sending to Figma)
 *
 * Notes:
 *  - Creates one Variable Collection per *group* (from themes-meta.yaml).
 *  - Creates two modes per collection: "white" and "g100" (from themes.yaml).
 *  - Creates a COLOR variable for every token key in that group.
 *  - Sets each variable's value in each mode, using the palettes in colors.yaml.
 *  - Assumes the file has no pre-existing variable definitions.
 */

/*
 * Prompt used to generate this file:
 * Write a nodejs program which reads the three attached yaml files and calls the Figma "POST variables" end point documented at https://developers.figma.com/docs/rest-api/variables-endpoints Assume the Figma file has no variable definitions, so all items are to be created. Create one variable collection per group (from themes-meta.yaml). The format of the yaml files is exactly as the files provided. Use only the "white" and "g100" themes from themes.yaml. Use the native fetch function and use the yaml module (not js-yaml)
 */

/* eslint-disable no-console,@bluecateng/no-async */

import {readFile} from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import YAML from 'yaml';

const args = new Map();
for (let i = 2; i < process.argv.length; ++i) {
	const a = process.argv[i];
	if (a.startsWith('--')) {
		const key = a.slice(2);
		const val = process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[++i] : true;
		args.set(key, val);
	}
}
const DEFAULT_PATH = 'packages/pelagos/defs';
const THEMES_META_PATH = args.get('themes-meta') || path.resolve(process.cwd(), DEFAULT_PATH, 'themes-meta.yaml');
const COLORS_PATH = args.get('colors') || path.resolve(process.cwd(), DEFAULT_PATH, 'colors.yaml');
const THEMES_PATH = args.get('themes') || path.resolve(process.cwd(), DEFAULT_PATH, 'themes.yaml');
const DRY_RUN = !!args.get('dry-run');

const REQUIRED_THEMES = ['white', 'g100'];

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';
const FILE_KEY = process.env.FILE_KEY || '';

if (!DRY_RUN && (!FIGMA_TOKEN || !FILE_KEY)) {
	console.error('Missing FIGMA_TOKEN or FILE_KEY env vars. Set them then re-run.');
	process.exit(1);
}

// ---------- YAML helpers ----------
async function loadYaml(filepath) {
	const raw = await readFile(filepath, 'utf8');
	return YAML.parse(raw);
}

// ---------- Color parsing helpers ----------
/**
 * Convert hex (#rrggbb) to { r,g,b,a } with 0..1 floats
 */
function hexToRgba(hex, alpha = 1) {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex);
	if (!m) throw new Error(`Unsupported hex: ${hex}`);
	const int = parseInt(m[1], 16);
	const r = (int >> 16) & 255;
	const g = (int >> 8) & 255;
	const b = int & 255;
	return {r: +(r / 255).toFixed(6), g: +(g / 255).toFixed(6), b: +(b / 255).toFixed(6), a: +alpha.toFixed(6)};
}

/**
 * Map dashed family names from themes.yaml to camelCase keys in colors.yaml.
 * e.g. "cool-gray" -> "coolGray"
 */
function familyKey(dashed) {
	return dashed.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Parse palette refs like:
 *  - "gray-10"            (normal shade)
 *  - "gray-10-hover"      (hover shade)
 *  - "gray-50/20%"        (normal shade with opacity)
 *  - "gray-50-hover/32%"  (hover shade with opacity)
 *  - "black/12%" or "white/50%"
 * Returns an object: { family, shadeIndex, variant: 'normal'|'hover'|null, alpha }
 */
function parsePaletteRef(ref) {
	const m = /^([a-z-]+)(?:-(\d{2,3}))?(?:-hover)?(?:\/(\d{1,3})%)?$/i.exec(ref);
	if (!m) throw new Error(`Unrecognized palette reference: ${ref}`);

	// Check for hover explicitly so we don't lose it when using the regex above
	const hover = /-hover\b/i.test(ref);

	const family = m[1].toLowerCase();
	const numberStr = m[2] || null;
	const alphaPct = m[3] !== undefined ? parseInt(m[3], 10) : null;

	return {
		family,
		shadeNumber: numberStr ? parseInt(numberStr, 10) : null,
		variant: hover ? 'hover' : 'normal',
		alpha: alphaPct !== null ? Math.max(0, Math.min(100, alphaPct)) / 100 : 1,
	};
}

/**
 * Resolve a themes.yaml value to a Figma Color object {r,g,b,a}
 * using colors.yaml palette data.
 */
function resolveColor(ref, colors) {
	if (typeof ref !== 'string') throw new Error(`Color ref must be a string, got: ${ref}`);

	// Special-case: black/xx% or white/xx%
	const simple = /^([a-z]+)(?:\/(\d{1,3})%)?$/i.exec(ref);
	if (simple && (simple[1].toLowerCase() === 'black' || simple[1].toLowerCase() === 'white')) {
		const name = simple[1].toLowerCase();
		const alpha = simple[2] ? Math.max(0, Math.min(100, parseInt(simple[2], 10))) / 100 : 1;
		const hex = colors[name]?.value;
		if (!hex) throw new Error(`Missing base hex for ${name}`);
		return hexToRgba(hex, alpha);
	}

	// General palette case
	const {family, shadeNumber, variant, alpha} = parsePaletteRef(ref);
	const key = familyKey(family); // map dashed to camel (if needed)
	const fam = colors[key];
	if (!fam) throw new Error(`Unknown color family "${family}" (key: ${key}) in colors.yaml`);

	// Families like 'black' and 'white' handled above; others have arrays.
	const list = fam[variant] || fam.normal;
	if (!Array.isArray(list)) {
		// Some families (e.g., black/white) store a single "value"
		const hex = fam.value;
		if (!hex) throw new Error(`Family "${family}" has no ${variant} or normal array`);
		return hexToRgba(hex, alpha);
	}

	if (shadeNumber === null) {
		throw new Error(`Shade number is required for family "${family}" in ref "${ref}"`);
	}

	// Map 10..100 (or 0..100 multiples of 10) to index 0..9
	const idx = Math.round(shadeNumber / 10) - 1;
	if (idx < 0 || idx >= list.length) {
		throw new Error(`Shade index out of range for "${ref}" -> idx=${idx}, list length=${list.length}`);
	}

	const hex = list[idx];
	if (!hex) throw new Error(`No hex found for "${ref}" at index ${idx}`);
	return hexToRgba(hex, alpha);
}

// ---------- Build request body ----------
function buildRequestBody({themesMeta, colors, themes, requiredThemes}) {
	// 1 collection per group
	const groups = new Map(); // groupName -> { tokens: [tokenName] }
	for (const [token, meta] of Object.entries(themesMeta)) {
		const group = meta?.group;
		if (!group) continue;
		if (!groups.has(group)) groups.set(group, []);
		groups.get(group).push(token);
	}

	const variableCollections = [];
	const variableModes = [];
	const variables = [];
	const variableModeValues = [];

	// Build collections/modes/variables for each group
	for (const [groupName, tokens] of groups.entries()) {
		const colId = `col_${groupName}`;
		const modeIds = Object.fromEntries(requiredThemes.map((t) => [t, `mode_${groupName}_${t}`]));

		// Create collection with initial mode id for the first theme
		const initialTheme = requiredThemes[0];
		variableCollections.push({
			action: 'CREATE',
			id: colId,
			name: groupName,
			initialModeId: modeIds[initialTheme],
		});

		// Rename the initial mode to the first theme's name
		variableModes.push({
			action: 'UPDATE',
			id: modeIds[initialTheme],
			name: initialTheme,
			variableCollectionId: colId,
		});

		// Create remaining modes
		for (const theme of requiredThemes.slice(1)) {
			variableModes.push({
				action: 'CREATE',
				id: modeIds[theme],
				name: theme,
				variableCollectionId: colId,
			});
		}

		// Create variables and set values for each required theme
		for (const token of tokens) {
			const varId = `var_${groupName}_${token}`;
			variables.push({
				action: 'CREATE',
				id: varId,
				name: token,
				resolvedType: 'COLOR',
				variableCollectionId: colId,
			});

			for (const themeName of requiredThemes) {
				const themeTable = themes[themeName];
				if (!themeTable) {
					throw new Error(`Theme "${themeName}" not found in themes.yaml`);
				}
				const ref = themeTable[token];
				if (ref === null) {
					// If a token isn't defined for a theme, skip setting its value; variable will have default
					continue;
				}
				const color = resolveColor(String(ref), colors);
				// Figma Color requires r,g,b (0..1). Alpha is part of Color in other APIs; for Variables REST,
				// Color object also supports "a" (alpha). We'll include 'a' when it's < 1.
				const colorValue = color.a !== null ? color : {r: color.r, g: color.g, b: color.b};
				variableModeValues.push({
					variableId: varId,
					modeId: modeIds[themeName],
					value: colorValue,
				});
			}
		}
	}

	return {variableCollections, variableModes, variables, variableModeValues};
}

// ---------- Figma call ----------
async function postVariables(fileKey, body, token, dryRun) {
	const url = `https://api.figma.com/v1/files/${encodeURIComponent(fileKey)}/variables`;
	if (dryRun) {
		console.log(JSON.stringify(body, null, 2));
		return {status: 200, error: false, meta: {tempIdToRealId: {}}};
	}

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(`Figma POST failed: ${res.status} ${res.statusText}\n${text}`);
	}

	return await res.json();
}

async function main() {
	// Load YAMLs
	const [themesMeta, colors, themes] = await Promise.all([
		loadYaml(THEMES_META_PATH),
		loadYaml(COLORS_PATH),
		loadYaml(THEMES_PATH),
	]);

	// Filter to required themes only (white and g100)
	const missing = REQUIRED_THEMES.filter((t) => !(t in themes));
	if (missing.length) {
		throw new Error(`Missing required themes in themes.yaml: ${missing.join(', ')}`);
	}

	const filteredThemes = Object.fromEntries(REQUIRED_THEMES.map((t) => [t, themes[t]]));

	const body = buildRequestBody({
		themesMeta,
		colors,
		themes: filteredThemes,
		requiredThemes: REQUIRED_THEMES,
	});

	// Safety: Ensure request <= 4MB (roughly check)
	const approx = Buffer.byteLength(JSON.stringify(body), 'utf8');
	if (approx > 4 * 1024 * 1024) {
		throw new Error(`Request body too large (${approx} bytes). Split into multiple calls.`);
	}

	const result = await postVariables(FILE_KEY, body, FIGMA_TOKEN, DRY_RUN);
	console.log('Done. Response:', JSON.stringify(result, null, 2));
}

main().catch((err) => {
	console.error(err.stack || String(err));
	process.exit(1);
});
