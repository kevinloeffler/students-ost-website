<section class="default-section">
    <div class="default-container">

        <div class="form-wrapper">
            <h1>Login</h1>
            <form action="/intern/login" method="post" use:enhance={onSubmit}>
                <label for="email">Email</label>
                <input name="email" id="email" type="email" required>

                <label for="password">Passwort</label>
                <input name="password" id="password" type="password" required>

                <div class="form-submit-row">
                    <button type="submit">Login</button>
                    <p>Dieses Login ist für Vereine und Fachschaften um ihre Unterseiten zu verwalten sowie Events aufzuschalten. Studierende können sich hier nicht anmelden.</p>
                </div>
            </form>

            {#if !form?.loggedIn && form?.reason}
                <div class="login-error-wrapper">
                    <p>Login fehlgeschlagen:</p>
                    <p>Falsche login-informationen</p>
                </div>
            {/if}
        </div>

        <div class="navigation-row">
            <a href="/">&#x3C;- Zurück zur Website</a>
            <button class="help-button" on:click={() => showHelp = !showHelp }>Hilfe</button>
        </div>

    </div>
</section>

{#if showHelp}
<div class="help-overlay">

    <div class="help-wrapper">
        <h3 class="help-title">Hilfe</h3>

        <div class="help-row">
            <p>Zugangsdaten vergessen:</p>
            <a href="mailto:students-rj@ost.ch" class="help-overlay-button">Support</a>
        </div>

        <div class="help-row">
            <p>Bug Report / Source Code:</p>
            <a href="https://github.com/kevinloeffler/students-ost-website" target="_blank"
               class="help-overlay-button">GitHub</a>
        </div>

        <div class="help-row">
            <p>Feature Request / Bug Report:</p>
            <a href="https://github.com/kevinloeffler/students-ost-website/issues" target="_blank" class="help-overlay-button">Issues</a>
        </div>
    </div>

    <button on:click={ () => showHelp = !showHelp } class="help-close-button">Schliessen</button>

</div>
{/if}

<script lang="ts">

    import { enhance } from "$app/forms";
    import type {ActionData} from "./$types";

    export let form: ActionData
    let showHelp: boolean = false

    function onSubmit() {
        if (form?.loggedIn) {
            history.back()
        }
    }

</script>


<style>

    .default-section {
        color: white;
        background-color: var(--accent-color);
        min-height: 100vh;
    }

    .default-container {
        min-height: 100vh;
    }

    .form-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 85vh;
        height: 100%;
        width: 400px;
    }

    h1 {
        font-family: "Jumbox", sans-serif;
        font-size: 40px;
        margin-bottom: 20px;
    }

    label {
        font-size: 12px;
        display: block;
    }

    input {
        padding: 8px 16px;
        color: var(--accent-color);
        margin-bottom: 20px;
        width: 100%;
    }

    button {
        padding: 10px 28px;
        color: var(--accent-color);
        background-color: white;
        border: none;
    }

    .form-submit-row {
        display: flex;
    }

    .form-submit-row > p {
        font-size: 10px;
        margin-left: 12px;
    }

    .navigation-row {
        display: flex;
        justify-content: space-between;
        width: 400px;
    }

    a {
        color: white;
    }

    .help-button {
        color: white;
        background-color: transparent;
        padding: 0;
        cursor: pointer;
    }

    .login-error-wrapper {
        padding: 12px 16px;
        margin-top: 16px;
        font-weight: bold;

        color: #b02e49;
        background-color: white;
    }

    /* Help overlay */

    .help-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        color: white;
        background-color: rgba(55, 44, 107, 0.75);
    }

    .help-wrapper {
        padding: 40px;
        border: 2px solid white;
        background-color: var(--accent-color);
    }

    .help-row {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }

    .help-title {
        font-family: "Jumbox", sans-serif;
        font-size: 32px;
        text-align: center;
        margin-bottom: 12px;
    }

    .help-overlay-button {
        padding: 8px 12px;
        margin-left: 12px;
        color: var(--accent-color);
        background-color: white;
    }

    .help-close-button {
        cursor: pointer;
        color: rgba(255, 255, 255, 0.66);
        background-color: transparent;
        padding: 12px 0 0 0;
    }

    /***** MOBILE *****/

    @media (max-width: 600px) {

        .form-wrapper {
            width: 100%;
        }

        .navigation-row {
            width: 100%;
        }

        .form-submit-row {
            flex-direction: column;
        }

        .form-submit-row > p {
            margin-left: 0;
            margin-top: 8px;
        }

        .help-title {
            text-align: left;
        }

        /* Help overlay */

        .help-wrapper {
            padding: 24px;
        }

        .help-row {
            flex-direction: column;
            align-items: flex-start;
        }

        .help-overlay-button {
            margin-left: 0;
            margin-top: 4px;
        }

    }

</style>
