import Base from "./Base.svelte";
import { generateCommonSASS, generateSASS, hash } from "./utils.js";
import type { GenerateStyle, StyledSvelteComponent, StyledSvelteComponentData, StyledSvelteComponentDataWithCommonStyle, StyledSvelteComponentWithCommonStyle } from "./types.js";
import CommonStyleBase from "./CommonStyleBase.svelte";

export function styled<T extends Record<string, any>>(tagName: string, generateStyle: GenerateStyle<T>): StyledSvelteComponent<T>;
export function styled<T extends Record<string, any>, U extends Record<string, any>>(tagName: string, generateStyle: GenerateStyle<T> | null, generateCommonStyle: GenerateStyle<U>): StyledSvelteComponentWithCommonStyle<T, U>;
export function styled<T extends Record<string, any>, U extends Record<string, any> = Record<string, any>>(tagName: string, generateStyle: GenerateStyle<T> | null, generateCommonStyle?: GenerateStyle<U>) {
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
            if (props === "common" && useCommonStyle) {
                return StyledComponentCommon as unknown as StyledSvelteComponentWithCommonStyle<T, U>['common'];
            }
            if (props === "styledComponentData") {
                if (useCommonStyle) {
                    return {
                        tagName,
                        generateStyle,
                        generateCommonStyle
                    } as StyledSvelteComponentDataWithCommonStyle<T, U>
                }
                else {
                    return {
                        tagName,
                        generateStyle
                    } as StyledSvelteComponentData<T>
                }
            }
            return Reflect.get(target, props, receiver);
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
            if (generateStyle) {
                const hashClass = hash(tagName + ',' + generateStyle.toString() + ',' + crypto.randomUUID());
                const generateSass = function (props: T) {
                    return generateSASS(tagName, hashClass, generateStyle, props)
                }
                classes.unshift(`styled-svelte-${hashClass}`);
                props.generateSass = generateSass;
            }
            else {
                props.generateSass = null;
            }
            props.class = classes.join(' ');
            props.tagName = tagName;
            return Reflect.apply(target, thisArg, argArray);
        }
    }) as unknown;

    return StyledComponent;
}