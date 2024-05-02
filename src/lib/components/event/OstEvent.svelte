<NavBar />

<section class="default-section">
    <div class="default-container">

        {#if ostEvent.mainImage}
            <img src="{ostEvent.mainImage}" alt="Event Titelbild">
        {/if}
        <h1 class="page-title">{ostEvent.name}</h1>
        <h2>{formatDateToString(ostEvent.date)}</h2>

        <div class="wrapper">

            <OstEventInfoWidget label="Beschreibung" content="{ostEvent.description}" />

            {#if ostEvent.startTime && ostEvent.endTime}
                <OstEventInfoWidget label="Zeit" content="{ostEvent.startTime} - {ostEvent.endTime}" />
            {/if}

            <OstEventInfoWidget label="Eintritt" content="{formatCHF(ostEvent.entranceFee)}" />
            <OstEventInfoWidget label="Kontakt" content="{ostEvent.contactEmail}" />
            <OstEventInfoWidget label="Telefon" content="{ostEvent.contactPhone}" />
            <OstEventInfoWidget label="Organisator" content="{ostEvent.organiser}" />

            {#if ostEvent.link && ostEvent.linkName}
                <MainButton link="{ostEvent.link}" content="{ostEvent.linkName}"/>
            {/if}

            {#if icsButtonLink}
                <MainButton link="{icsButtonLink}" content="Zum Kalender hinzufügen" file_name="{ostEvent.name}.ics" />
            {/if}

        </div>

    </div>
</section>

<Footer />


<script lang="ts">

    import NavBar from "$lib/components/NavBar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import OstEventInfoWidget from "$lib/components/event/OstEventInfoWidget.svelte";
    import {formatDateToString} from "$lib/util.js";
    import MainButton from "$lib/components/MainButton.svelte";
    import {generateICS} from "$lib/icsGenerator";
    import {onMount} from "svelte";

    export let ostEvent: OstEvent

    let icsButtonLink: Optional<string> = undefined

    function formatCHF(amount: Optional<number>): Optional<string> {
        if (amount) {
            return `CHF ${amount}.-`
        }
        return undefined
    }

    onMount( () => {
        icsButtonLink = generateICS(ostEvent)
    })

</script>


<style>

    .default-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h2 {
        font-family: "Radwave", sans-serif;
        font-size: 28px;
        padding-bottom: 12px;
    }

    img {
        max-height: 500px;
        margin-bottom: 40px;
    }

    .wrapper {
        max-width: 500px;
    }

</style>

