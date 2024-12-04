import { compileString } from "sass";

export function hash(str: string) {
	str = str.replace(/\r/g, '');
	let hash = 5381;
	let i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return (hash >>> 0).toString(36);
}

export function generateSASS(tagName: string, hash: string, generateStyle: (...args: any[]) => string, restProps?: Record<string, unknown>) {
    const style = generateStyle(restProps);
    const css = `${tagName}.${`styled-svelte-${hash}`}{${style}}`;
    try {
        const sass = compileString(css, {silenceDeprecations: ['mixed-decls']});
        return sass.css;
    } catch {
        return css;
    }
}

export function generateCommonSASS(tagName: string, hash: string, generateCommonStyle: (...args: any[]) => string, restProps?: Record<string, unknown>) {
    const style = generateCommonStyle(restProps);
    const css = `${tagName}.${`common-styled-svelte-${hash}`}{${style}}`;
    try {
        const sass = compileString(css, {silenceDeprecations: ['mixed-decls']});
        return sass.css;
    } catch {
        return css;
    }
}

export function isBrowser(){
    return !(typeof(window) === "undefined");
}