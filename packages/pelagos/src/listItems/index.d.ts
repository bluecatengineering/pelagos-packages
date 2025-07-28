import type {ReactElement} from 'react';

export function renderListItem(item: string, className?: string): ReactElement;
export function renderNamedListItem(item: {id: string; name?: string}, className?: string): ReactElement;
