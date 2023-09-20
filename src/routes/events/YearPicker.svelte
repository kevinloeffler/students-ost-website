<div class="wrapper">

    {#each years as year}
        <button on:click={ () => scrollToYear(year) }>{year}</button>
    {/each}

</div>


<script lang="ts">

    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();

    export let oldestYear: number
    export let newestYear: number

    const years = Array.from(Array(newestYear - oldestYear + 1), (_, x) => x + oldestYear)

    function scrollToYear(year: number) {
        const scrollTarget = document.querySelector(`[data-date="${year}"]`)
        dispatch('scrollEvent', {target: scrollTarget})
    }

</script>


<style>

    .wrapper {
        position: sticky;
        top: 80px;
        display: flex;
        flex-direction: column;
    }

    button {
        color: #9d9d9d;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 4px 16px;
        transition: color 200ms;
    }

    button:hover {
        color: var(--accent-color);
    }

    @media (max-width: 600px) {
        .wrapper {
            position: static;
            flex-direction: row;
            justify-content: center;
        }
    }

</style>
