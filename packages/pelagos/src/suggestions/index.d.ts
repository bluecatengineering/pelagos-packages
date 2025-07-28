import type {ReactNode} from 'react';

/** Renders a simple suggestion. */
export function renderSimpleSuggestion({name}: {name: string}): ReactNode;

/** Renders a suggestion. */
export function renderSuggestion({name, description}: {name: string; description?: string}): ReactNode;
