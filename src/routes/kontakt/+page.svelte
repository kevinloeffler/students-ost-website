<NavBar />

<section class="default-section">
    <div class="default-container">

        <h1>Students</h1>
        <p class="subtitle">Die students.ost-RJ ist die offizielle Studierendenvereinigung am Standort Rapperswil-Jona.
            Wir sind als Organ des VS-OST die Vertretung aller studentischer Anliegen in Rapperswil
            Ansprechpartner.
        </p>

        <div class="positions">

            <div class="position position-1">
                <p class="role">Präsident</p>
                <h3>Tobias</h3>
            </div>
            <div class="position position-2">
                <p class="role">Vize</p>
                <h3>Vakant</h3>
            </div>
            <div class="position position-3">
                <p class="role">Finanzier</p>
                <h3>Lucas</h3>
            </div>
            <div class="position position-4">
                <p class="role">Aktuar</p>
                <h3>Ali</h3>
            </div>
            <div class="position position-5">
                <p class="role">IT</p>
                <h3>Kevin</h3>
            </div>
            <div class="position position-6">
                <p class="role">Co-Eventhead</p>
                <h3>Wadim</h3>
            </div>
            <div class="position position-7">
                <p class="role">Co-Eventhead</p>
                <h3>Pascal</h3>
            </div>
            <div class="position position-8">
                <p class="role">Technik</p>
                <h3>Dario</h3>
            </div>
            <div class="position position-9">
                <p class="role">Vertretung VS-OST</p>
                <h3>Nicolas</h3>
            </div>
            <div class="position position-10">
                <p class="role">Vertretung Untervereine</p>
                <h3>Vakant</h3>
            </div>

            <a href="mailto:students-rj@ost.ch">
                <div class="position position-link">
                    <p class="role">Interesse?</p>
                    <p class="link-text">Vorstandsmitglied werden -></p>
                </div>
            </a>

        </div>

        <!--<h2>Kontakt</h2>-->
        <!--TODO: add contact form-->


    </div>
</section>

<Footer />


<script>
    import Footer from '$lib/components/Footer.svelte'
    import NavBar from '$lib/components/NavBar.svelte'
</script>


<style>

    h1 {
        font-family: "Radwave", sans-serif;
        font-size: 60px;
        text-align: center;
        margin-top: 40px;
    }

    h2 {
        font-family: "Radwave", sans-serif;
        font-size: 40px;
        text-align: center;
        margin-top: 80px;
    }

    .subtitle {
        text-align: center;
        max-width: 600px;
        margin: 0 auto 40px;
    }

    .positions {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 40px;
    }

    .position {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        min-height: 160px;
        border: var(--default-border);
        padding: 20px 24px;
    }

    .position > h3 {
        font-family: "Radwave", sans-serif;
        font-size: 24px;
    }

    .position-1 {
        grid-column: 1 / 3;
    }

    .position-link {
        color: white;
        background-color: var(--accent-color);
        transition-duration: 250ms;
    }

    .position-link:hover {
        transform: translate(-8px, -8px);
        box-shadow: 6px 6px 0 -3px white, 6px 6px var(--accent-color);
    }

    .link-text {
        font-size: 20px;
    }

    @media (max-width: 600px) {

        h1 {
            font-size: 32px;
        }

        .positions {
            grid-template-columns: 1fr;
            grid-gap: 20px;
        }

        .position {
            padding: 16px 18px;
        }

        .position-1 {
            grid-column: 1 / 2;
        }

    }

</style>
