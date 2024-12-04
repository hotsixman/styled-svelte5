import type { Component, Snippet } from "svelte";
import Base from "./Base.svelte";
import { generateSASS, hash } from "./utils.js";

export function styled<T extends Record<string, any>>(tagName: string, generateStyle: (props: T) => string) {
    const hashClass = hash(tagName + ',' + generateStyle.toString());
    const generateSass = function (props?: Record<string, any>) {
        return generateSASS(tagName, hashClass, generateStyle, props)
    }

    const StyledComponent = new Proxy(Base, {
        apply(target, thisArg, argArray) {
            const props = argArray[1];
            let classes: string[] = [];
            if (props.class as string) {
                classes = props.class.split(' ');
            }
            classes.unshift(`styled-svelte-${hashClass}`);
            props.class = classes.join(' ');
            props.generateSass = generateSass;
            props.tagName = tagName;
            return Reflect.apply(target, thisArg, argArray);
        }
    }) as unknown as Component<T & {children?: Snippet}>

    return StyledComponent;
}