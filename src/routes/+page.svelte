<script lang="ts">
    import { styled } from "$lib/styled.js";
    import { RedDiv } from "./+layout.svelte";

    let color = $state("red");

    const TestDiv = styled<{color:string}>('div', () => '');
</script>

<input type="text" bind:value={color}>
<RedDiv {color}>
    ㅎㅇ
</RedDiv>
<RedDiv color="red">
    ㅎㅇ
</RedDiv>
<RedDiv color="blue">
    ㅎㅇ
</RedDiv>