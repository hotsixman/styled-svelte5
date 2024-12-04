import Base from "./Base.svelte";
import { generateCommonSASS, generateSASS, hash } from "./utils.js";
import type { StyledSvelteComponent, StyledSvelteComponentWithCommonStyle } from "./types.js";
import CommonStyleBase from "./CommonStyleBase.svelte";

export function styled<T extends Record<string, any>>(tagName: string, generateStyle: (props: T) => string): StyledSvelteComponent<T>;
export function styled<T extends Record<string, any>, U extends Record<string, any>>(tagName: string, generateStyle: (props: T) => string, generateCommonStyle: (props: U) => string): StyledSvelteComponentWithCommonStyle<T, U>;
export function styled<T extends Record<string, any>, U extends Record<string, any> = Record<string, any>>(tagName: string, generateStyle: (props: T) => string, generateCommonStyle?: (props: U) => string) {
    let useCommonStyle = false;
    let commonHashClass: string | null = null;
    let generateCommonSass: ((props: Record<string, any>) => string) | null = null;
    if (generateCommonStyle) {
        useCommonStyle = true;
        commonHashClass = hash(tagName + ', ' + generateCommonStyle.toString());
        generateCommonSass = function (props: Record<string, any>) {
            return generateCommonSASS(tagName, commonHashClass as string, generateCommonStyle, props);
        }
    }

    let StyledComponentCommon = null;;
    if (useCommonStyle) {
        StyledComponentCommon = new Proxy(CommonStyleBase, {
            apply(target, thisArg, argArray) {
                const props = argArray[1];
                props.generateCommonSass = generateCommonSass;
                return Reflect.apply(target, thisArg, argArray);
            }
        })
    }

    const StyledComponent = new Proxy(Base, {
        get(target, props, receiver) {
            if (props === "generateStyle") {
                return generateStyle;
            }
            else {
                if (useCommonStyle) {
                    if (props === "common") {
                        return StyledComponentCommon as unknown as StyledSvelteComponentWithCommonStyle<T, U>['common'];
                    }
                    else if (props === "generateCommonStyle") {
                        return generateCommonStyle;
                    }
                    else {
                        return Reflect.get(target, props, receiver);
                    }
                }
                else {
                    return Reflect.get(target, props, receiver);
                }
            }
        },
        apply(target, thisArg, argArray) {
            const props = argArray[1];
            let classes: string[] = [];
            if (props.class as string) {
                classes = props.class.split(' ');
            }
            if (useCommonStyle) {
                classes.unshift(`common-styled-svelte-${commonHashClass}`);
            }
            const hashClass = hash(tagName + ',' + generateStyle.toString() + ',' + crypto.randomUUID());
            const generateSass = function (props: T) {
                return generateSASS(tagName, hashClass, generateStyle, props)
            }
            classes.unshift(`styled-svelte-${hashClass}`);
            props.class = classes.join(' ');
            props.generateSass = generateSass;
            props.tagName = tagName;
            return Reflect.apply(target, thisArg, argArray);
        }
    }) as unknown as StyledSvelteComponentWithCommonStyle<T, U>

    return StyledComponent;
}