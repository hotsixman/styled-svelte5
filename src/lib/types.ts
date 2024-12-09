import type { Component, Snippet } from "svelte";

type GenerateStyle<T> = (props: T) => string;
export interface StyledSvelteComponentData<T> {
    readonly tagName: string;
    readonly generateStyle: GenerateStyle<T>;
}
export interface StyledSvelteComponentDataWithCommonStyle<T, U> extends StyledSvelteComponentData<T> {
    readonly generateCommonStyle: GenerateStyle<U>
}
export type StyledSvelteComponent<T extends Record<string, any>> =
    Component<T & { children?: Snippet }> &
    { 
        styledComponentData: StyledSvelteComponentData<T>;
    };
export type StyledSvelteComponentWithCommonStyle<T extends Record<string, any>, U extends Record<string, any>> =
    StyledSvelteComponent<T> &
    { 
        common: Component<U>;
        styledComponentData: StyledSvelteComponentDataWithCommonStyle<T, U>;
    };