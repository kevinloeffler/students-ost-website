<NavBar />

<section class="default-section">

    <div class="default-container">

        <div class="header">
            {#if verein.logo}
                <img class="logo" src="/public/uploads/logos/1b52d7f0-b79a-4136-8abe-336e282dceed.png" alt="Vereins Logo">
            {/if}

            <h1 class="page-title">{verein.name}</h1>
        </div>

        <div class="column-layout">
            <div class="main-column">
                <p>{verein.description}</p>
            </div>

            <aside>
                {#if verein.email}
                    <MainButton link="mailto:{verein.email}" content="📧 Email" />
                {/if}

                {#if verein.website}
                    <MainButton link="{verein.website}" content="🌐 Website" />
                {/if}
            </aside>
        </div>

    </div>

</section>

<Footer />


<script lang="ts">
    import MainButton from '$lib/components/MainButton.svelte'
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data
    const verein: Organisation = data.verein
</script>


<style>
    .default-section {
        min-height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 0;
    }

    .default-container {
        max-width: 1000px;
        width: 100%;
    }

    .column-layout {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        gap: 20px;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 24px;
    }

    .page-title {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .main-column {
        width: 75%;
        line-height: 1.6;
        font-size: 1rem;
    }

    aside {
        width: 20%;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .logo {
        width: 100px;
        height: 100px;
        object-fit: cover;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin: 20px 0 16px;
    }

    /* MOBILE */
    @media (max-width: 600px) {
        .column-layout {
            flex-direction: column;
        }

        .main-column {
            width: 100%;
        }

        aside {
            width: 100%;
            padding-top: 12px;
        }
    }
</style>
