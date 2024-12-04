# Styled-Svelte5

You can create a styled component for svelte5, which is responsive to props, so you can create a component that changes style depending on the situation. You can also use the event handler.

## install

`npm i styled-svelte5`

## How to use

```svelte
<script lang="ts">
import styled from 'styled-svelte5';

const SampleDiv = styled<{color:string}>( //You can set types of props here.
    'div', //tag name
    ({backgroundColor, color}) => `
        background-color:${backgroundColor};
        color: ${color};
    `, // A function which returns scss or css. You can use props here.
)
</script>

<SampleDiv backgroundColor="red" color="blue" onclick={() => {alert("true");}}>
    Snom is Ass
</SampleDiv>
<SampleDiv backgroundColor="blue" color="red" onclick={() => {alert("false");}}>
    Snom is Not Ass
</SampleDiv>
```

<script lang="ts">
import styled from 'styled-svelte5';

const SampleDiv = styled<{color:string}, {hoverColor: string}>( //You can set types of props here.
    'div', //tag name
    ({backgroundColor}) => `
        background-color: ${backgroundColor};
    `, // A function which returns scss or css. You can use props here.
    ({hoverColor}) => `
        &:hover{
            color: ${hoverColor};
        }
    ` // Style for all `SampleDiv` components;
)
</script>

<SampleDiv.common hoverColor="purple"/>

<!-- Red background color and purple text color when hover -->
<SampleDiv backgroundColor="red">
    Snom is Ass
</SampleDiv>

<!-- Blue background color and purple text color when hover -->
<SampleDiv backgroundColor="blue">
    Snom is Ass
</SampleDiv>