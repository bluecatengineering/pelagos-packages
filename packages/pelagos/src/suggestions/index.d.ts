import type {ReactElement} from 'react';

/** Renders a simple suggestion. */
export function renderSimpleSuggestion({name}: {name: string}): ReactElement;

/** Renders a suggestion. */
export function renderSuggestion({name, description}: {name: string; description?: string}): ReactElement;
