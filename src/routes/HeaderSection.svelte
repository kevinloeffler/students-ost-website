<section class="header default-section">

    <div class="default-container">
        <div class="header-wrapper">
            <h1>Students<br>OST—RJ</h1>
            <p class="text">Wir sind der Verein der OST Studierenden am Campus Rapperswil-Jona. Neben unseren eigenen Parties unterstützen wir Vereine und Fachschaften beim Organisieren von Events. Zusätzlich vertreten wir die Anliegen der Studierenden gegenüber der Hochschule.</p>
        </div>

        <div class="event-wrapper">
            <div class="event-content">

                {#each ostEvents as ostEvent}
                    <a class="event" href="/events/{encodeURI(ostEvent.name)}">
                        <p class="event-date">{formatDateToString(ostEvent.date, true)}</p>
                        <p class="event-name">{ostEvent.name}</p>
                    </a>
                {/each}

                <a class="events-link" href="/events">Alle Events -></a>

            </div>
        </div>
    </div>

</section>


<script lang="ts">

    import {formatDateToString} from "$lib/util.js";

    export let ostEvents: OstEvent[]

</script>


<style>

    .default-section {
        overflow: hidden;
    }

    .default-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-wrapper {
        width: 52%;
    }

    h1 {
        font-family: "Radwave", sans-serif;
        font-size: 45pt;
        line-height: 1em;
        color: var(--accent-color);
        padding-bottom: 20px;
    }

    .header {
        min-height: 50vh;
        justify-content: center;
        color: var(--accent-color);
    }

    .text {
        max-width: 50em;
    }

    .event-wrapper {
        color: white;
        background-color: var(--accent-color);
        width: 66%;
        padding: 40px 0;

        margin-right: -30%;
        margin-top: 120px;
        margin-bottom: 80px;
    }

    .event-content {
        width: 80%;
    }

    .event {
        position: relative;
        display: block;
        left: -40px;

        border: solid 2px white;
        color: white;
        background-color: var(--accent-color);

        font-family: "Radwave", sans-serif;
        line-height: 1.2;

        padding: 28px 32px;
        margin: 20px 0;

        transition-duration: 300ms;
    }

    .event:hover {
        transform: translate(-8px, -8px);
        box-shadow: 8px 8px white;
    }

    .event-date {
        font-size: 40px;
    }

    .event-name {
        font-size: 20px;
    }

    .events-link {
        color: white;
        margin-left: 20px;
        transition-duration: 300ms;
    }

    .events-link:hover {
        margin-left: 24px;
    }

    @media (max-width: 600px) {

        h1 {
            font-size: 10vw;
            padding-top: 40px;
        }

        .default-container {
            flex-direction: column;
        }

        .header-wrapper {
            width: 100%;
        }

        .event-wrapper {
            width: 120%;
            padding: 20px 0;
            padding-top: 0;

            margin-right: -50%;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .event {
            padding: 20px;
        }

        .event-date {
            font-size: 32px;
        }

        .event-name {
            font-size: 16px;
        }

    }

</style>
