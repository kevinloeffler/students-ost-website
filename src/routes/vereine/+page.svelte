<NavBar />

<!-- Background grid decoration -->
<img class="background-grid grid-left" src="/images/students-vereine-grid.svg" alt="Ein hellgraues geometrisches muster">
<img class="background-grid grid-right" src="/images/students-vereine-grid.svg" alt="Ein hellgraues geometrisches muster">

<section class="default-section">
    <div class="default-container">

        <h1 class="page-title">Vereine</h1>

        <div class="wrapper">

            {#each data.vereine as verein}
                <div class="verein-wrapper">
                    <p>{verein.name.replace(/\s/g, "").charAt(0)}</p>
                    <a class="verein-link" href="/vereine/{encodeURI(verein.name)}">{verein.name}</a>
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

    .verein-wrapper {
        width: 48%;
    }

    .verein-wrapper:hover > .verein-link {
        transform: translate(-6px, -6px);
        box-shadow: 6px 6px var(--accent-color);
    }

    .verein-wrapper:hover > p {
        transform: translate(-3px, -3px);
    }

    p {
        color: var(--accent-color);
        font-size: 11pt;
        margin-top: 12px;
        transition-duration: 300ms;
    }

    .verein-link {
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

        .verein-wrapper {
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
