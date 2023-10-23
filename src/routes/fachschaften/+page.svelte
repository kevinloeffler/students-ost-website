<NavBar />

<!-- Background grid decoration -->
<img class="background-grid grid-left" src="/images/students-vereine-grid.svg" alt="Ein hellgraues geometrisches muster">
<img class="background-grid grid-right" src="/images/students-vereine-grid.svg" alt="Ein hellgraues geometrisches muster">

<section class="default-section">
    <div class="default-container">

        <h1 class="page-title">Fachschaften</h1>

        <div class="wrapper">

            {#each data.fachschaften as fachschaft, index}
                <div class="fachschaft-wrapper">
                    <p>{String.fromCharCode((index % 24) + 65)}</p>
                    <a class="fachschaft-link" href="/fachschaften/{encodeURI(fachschaft.name)}">{fachschaft.name}</a>
                </div>
            {/each}

        </div>

    </div>
</section>

<Footer />


<script lang="ts">

    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data;

</script>


<style>

    .default-section {
        min-height: 75vh;
    }

    .wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .fachschaft-wrapper {
        width: 48%;
    }

    .fachschaft-wrapper:hover > .fachschaft-link {
        transform: translate(-6px, -6px);
        box-shadow: 6px 6px var(--accent-color);
    }

    .fachschaft-wrapper:hover > p {
        transform: translate(-3px, -3px);
    }

    p {
        color: var(--accent-color);
        font-size: 11pt;
        margin-top: 12px;
        transition-duration: 300ms;
    }

    .fachschaft-link {
        display: block;
        width: 100%;
        padding: 16px 20px;
        font-size: 18px;
        font-weight: 600;
        background-color: white;
        border: var(--default-border);
        transition: 300ms;
    }

    .page-title {
        font-size: 80px;
        margin-top: 40px;
        text-align: center;
    }

    .background-grid {
        position: absolute;
        z-index: -1;
        max-height: 80vh;
    }

    .grid-left {
        left: 0;
        top: 20vh;
    }

    .grid-right {
        right: 0;
        transform: scale(-1, 1);
        top: -35vh;
    }

    @media (max-width: 600px) {

        .fachschaft-wrapper {
            width: 100%;
        }

        .page-title {
            font-size: 40px;
        }

        .background-grid {
            display: none;
        }

        .default-section {
            min-height: auto;
        }

    }

</style>
