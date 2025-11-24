<button class="menu-button" on:click={toggleShowMenu}>Menu</button>

{#if showMenu}
    <div class="menu-wrapper">
        <div class="menu-grid-element"></div>
        <div class="menu-grid-element">
            <button class="close-button" on:click={toggleShowMenu}>
                <img src="/images/students-close-menu-icon.svg" alt="A white cross">
            </button>
        </div>
        <div class="menu-grid-element"></div>
        <div class="menu-grid-element"></div>
        <div class="menu-subgrid">
            <div><a href="/" class="menu-link" on:click={toggleShowMenu}>Home</a></div>
            <div><a href="/events" class="menu-link" on:click={toggleShowMenu}>Events</a></div>
            <div><a href="/vereine" class="menu-link" on:click={toggleShowMenu}>Vereine</a></div>
            <div><a href="/fachschaften" class="menu-link" on:click={toggleShowMenu}>Fachschaften</a></div>
            <div><a href="/starthilfe" class="menu-link" on:click={toggleShowMenu}>Starthilfe</a></div>
            <div><a href="/kontakt" class="menu-link" on:click={toggleShowMenu}>Kontakt</a></div>
            <!--<div><a href="/shop" class="menu-link" on:click={toggleShowMenu}>Shop</a></div>-->
        </div>
        <div class="menu-grid-element"></div>
        <div class="menu-grid-element"></div>
        <div class="menu-grid-element">
            <a class="login-link" href="/intern/dashboard">Login Vereine</a>
        </div>
        <div class="menu-grid-element"></div>
    </div>
{/if}


<script lang="ts">

    let showMenu = false

    function toggleShowMenu() {
        showMenu = !showMenu
    }

</script>


<style>

    .menu-button {
        font-family: "Jumbox", sans-serif;
        color: var(--accent-color);
        background: none;

        outline: none;
        border: none;

        cursor: pointer;
    }

    /* Menu */

    .menu-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100dvh;

        display: grid;
        grid-template-rows: 1fr 6fr 1fr;
        grid-template-columns: 1fr clamp(0px, 90vw, 900px) 1fr;
        grid-gap: 2px;

        background-color: white;
    }

    .menu-grid-element {
        background-color: var(--accent-color);
    }

    .menu-subgrid {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr /*1fr*/;
        grid-template-columns: 1fr;
        background-color: white;
    }

    .menu-subgrid > div {
        margin-bottom: -4px;
    }

    .menu-link {
        display: flex;
        align-items: center;

        width: calc(100% + 4px);
        height: 100%;

        color: white;
        background-color: var(--accent-color);

        font-family: "Jumbox", sans-serif;
        font-size: min(7vw, 5vh);
        line-height: 1em;
        padding-left: 3%;
        margin: -2px 0 -2px -2px;

        border: solid white 2px;
        /*border-bottom: none;*/
        transition-duration: 300ms;
    }

    .menu-link:hover {
        transform: translate(-10px, -10px);
    }

    .close-button {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 80%;
        width: 20%;
        height: 100%;

        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .close-button img {
        width: 40px;
        margin-right: 20px;
    }

    .login-link {
        position: relative;
        top: 20%;

        font-size: 10pt;

        color: white;
        opacity: 0.5;
        margin-left: 3%;
    }

    /***** MOBILE *****/

    @media (max-width: 600px) {

        .menu-wrapper {
            grid-template-columns: 5% 1fr 5%;
            grid-template-rows: 1fr 7fr 2fr;
        }

        .menu-link {
            padding-left: 5%;
        }

        .login-link {
            top: 10%;
            font-size: 8pt;
            margin-left: 5%;
        }

        .close-button img {
            width: 28px;
        }

    }

</style>
