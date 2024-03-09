<NavBar />

<section class="default-section">
    <div class="default-container">

        <p class="subtitle">Campus RJ</p>
        <h1 class="page-title">Events</h1>

        <div class="wrapper">

            {#if data.ostEvents.length > 0}
                <aside>
                    <YearPicker oldestYear={oldestYear} newestYear={newestYear} on:scrollEvent={scrollToTarget} />
                </aside>
            {/if}

            <div style="width: 100%">
                {#if data.ostEvents.length === 0}
                    <p class="empty-events-msg">Aktuell stehen keine Events an</p>
                {:else}
                    {#each data.ostEvents as ostEvent}
                        <EventThumbnail ostEvent="{ostEvent}" />
                    {/each}
                {/if}
            </div>

        </div>

    </div>
</section>

<Footer />


<script lang="ts">

    import EventThumbnail from "$lib/components/event/EventThumbnail.svelte";
    import YearPicker from "./YearPicker.svelte";
    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data;

    const oldestYear = new Date(data.ostEvents[0]?.date).getFullYear() || new Date().getFullYear()
    const newestYear = new Date(data.ostEvents[data.ostEvents.length - 1]?.date).getFullYear() || new Date().getFullYear()

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

    .empty-events-msg {
        width: 100%;
        padding: 12px 16px;
        text-align: center;
        color: var(--admin-gray);
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
