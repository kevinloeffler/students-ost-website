<section class="links-section default-section">

    <div class="link-container default-container">
        <a href="/vereine" class="link-wrapper link-item-1">
            <p class="link-text">Vereine</p>
        </a>
        <a href="/fachschaften" class="link-wrapper link-item-2">
            <p class="link-text">Fachschaften</p>
        </a>
        <a href="/kontakt" class="link-wrapper link-item-3">
            <p class="link-text">Students</p>
        </a>

        <a href="starthilfe" class="link-wrapper link-item-4">
            <img class="starthilfe-image" src="/images/ost-campus-rj.jpg" alt="Der Campus Rapperswil der Hochschule aus der Luft fotografiert">
            <p class="link-text">Starthilfe</p>
        </a>

<!--        TODO: show the two girds without getting y-axis scroll bars-->
<!--        <img id="grid-left" src="/images/students-grid.svg" alt="Graues Kachelmuster">-->
<!--        <img id="grid-right" src="/images/students-grid.svg" alt="Graues Kachelmuster">-->

    </div>

</section>

<style>

    .links-section {
        padding-top: 20px;
    }

    .link-container {
        position: relative;

        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-gap: 20px;
    }

    /* Grid items */

    .link-item-1 {
        grid-column: 1;
        grid-row: 1;
    }

    .link-item-2 {
        grid-column: 1;
        grid-row: 2;
    }

    .link-item-3 {
        grid-column: 1;
        grid-row: 3;
    }

    .link-item-4 {
        grid-column: 2;
        grid-row-start: 1;
        grid-row-end: 4;
    }

    .link-wrapper {
        position: relative;
        font-family: "Radwave", sans-serif;
        border: var(--default-border);
        height: 100%;
        background-color: white;
        transition-duration: 300ms;
    }

    .link-wrapper:hover {
        translate: -10px -10px;
        box-shadow: 10px 10px 0 0 var(--accent-color);
    }

    .link-text {
        position: absolute;
        left: 18px;
        bottom: 12px;
        font-size: 20px;
    }

    .starthilfe-image {
        margin-bottom: 54px;
    }

    #grid-left {
        position: absolute;
        width: 50vw;
        right: 95%;
        top: -90%;
        opacity: 0.5;
        z-index: -1;
    }

    #grid-right {
        position: absolute;
        width: 50vw;
        left: 95%;
        top: -10%;
        opacity: 0.5;
        z-index: -1;
    }

    /***** MOBILE *****/

    @media (max-width: 600px) {

        .link-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
        }

        .link-text {
            font-size: 14pt;
        }

        .link-item-1 {
            grid-column: 1;
            grid-row: 1;
        }

        .link-item-2 {
            grid-column: 1;
            grid-row: 2;
        }

        .link-item-3 {
            grid-column: 1;
            grid-row: 3;
        }

        .link-item-4 {
            grid-column: 1;
            grid-row-start: 4;
            grid-row-end: 7;
        }

    }

</style>
