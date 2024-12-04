import type { Component, Snippet } from "svelte";

export type StyledSvelteComponent<T extends Record<string, any>> = Component<T & {children?: Snippet}> & {generateStyle: (props: T) => string};
export type StyledSvelteComponentWithCommonStyle<T extends Record<string, any>, U extends Record<string, any>> = StyledSvelteComponent<T> & {common: Component<U>; generateCommonStyle: (props: U) => string}