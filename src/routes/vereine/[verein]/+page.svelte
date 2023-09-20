<NavBar />

<section class="default-section">

    <div class="default-container">

        <div>
            <div class="header">
                <img class="logo" src="/images/logos/kreaktiv-logo.png" alt="Vereins Logo">

                <h1 class="page-title">{verein.name}</h1>
            </div>

            <div class="column-layout">
                <div class="main-column">
                    <p>{verein.description}</p>
                </div>

                <aside>
                    {#if verein.email}
                        <MainButton link="mailto:{verein.email}" content="Email" />
                    {/if}

                    {#if verein.website}
                        <MainButton link="{verein.website}" content="Website" />
                    {/if}
                </aside>

            </div>

        </div>

    </div>

</section>

<Footer />


<script lang="ts">

    import MainButton from '$lib/components/MainButton.svelte'
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data
    const verein: Verein = data.verein

</script>


<style>

    .default-section {
        min-height: 80vh;
    }

    .column-layout {
        display: flex;
        justify-content: space-between;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .main-column {
        width: 80%;
        padding: 20px 0;
    }

    aside {
        width: 18%;
    }

    .logo {
        width: 80px;
        margin-top: 20px;
        margin-bottom: 32px;
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
        }

    }

</style>
