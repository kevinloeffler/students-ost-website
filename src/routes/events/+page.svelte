<NavBar />

<section class="default-section">
    <div class="default-container">

        <p class="subtitle">Campus RJ</p>
        <h1 class="page-title">Events</h1>

        <div class="wrapper">

            <aside>
                <YearPicker oldestYear={oldestYear} newestYear={newestYear} on:scrollEvent={scrollToTarget} />
            </aside>

            <div>
                {#each data.ostEvents as ostEvent}
                    <EventThumbnail ostEvent="{ostEvent}" />
                {/each}
            </div>

        </div>

    </div>
</section>

<Footer />


<script lang="ts">

    import EventThumbnail from "$lib/components/EventThumbnail.svelte";
    import YearPicker from "./YearPicker.svelte";
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data;

    const oldestYear = new Date(data.ostEvents[0].date).getFullYear()
    const newestYear = new Date(data.ostEvents[data.ostEvents.length - 1].date).getFullYear()

    function scrollToTarget(event: any) {
        event.detail.target.scrollIntoView({behavior: "smooth"})
    }

</script>


<style>

    .subtitle {
        color: var(--accent-color);
        text-align: center;
    }

    h1 {
        font-size: 80px;
        color: var(--accent-color);
        text-align: center;
        margin-bottom: 32px;
        margin-top: 4px;
    }

    .wrapper {
        display: flex;
        flex-direction: row-reverse;
    }

    aside {
        min-width: 140px;
    }

    @media (max-width: 600px) {

        h1 {
            font-size: 44px;
            margin-bottom: 12px;
        }

        .wrapper {
            flex-direction: column;
        }

        aside {
            min-width: 100%;
            margin-bottom: 12px;
        }

    }

</style>
