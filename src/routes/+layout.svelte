<script lang="ts" module>
    import { styled } from "$lib/styled.js";

    export const RedDiv = styled<{color: string}, {background: string}>('div', ({color}) => `background-color: ${color};`, ({background}) => `background-color:${background}; &::before{content: '<'}`);
</script>

<script lang="ts">
    let {children}: any = $props();

    
    let background = $state("blue");
</script>

<input type="text" bind:value={background}>
<RedDiv.common {background}/>
{@render children?.()}