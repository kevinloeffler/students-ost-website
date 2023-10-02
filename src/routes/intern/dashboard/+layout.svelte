<svelte:head>
    <link rel="stylesheet" href="/styles-dashboard.css">
</svelte:head>

{#if !hasVerein}
    <div class="no-verein-overlay">
        <p>Du hast keinen Zugriff auf einen Verein oder eine Fachschaft.</p>
        <a href="/" on:click={logout}>Logout</a>
    </div>
{/if}

<section class="default-section">
    <div class="default-container">
        <h1>Dashboard: {data.organisation?.name}</h1>
        <a href="/" on:click={logout}>Logout</a>
    </div>
</section>

<section class="default-section">
    <div class="default-container">
        <slot />
    </div>
</section>


<script lang="ts">

    import {browser} from "$app/environment";

    export let data
    $: hasVerein = !!data.organisation

    function logout() {
        if (browser) {
            // TODO: deleting the cookie does not work (can't access cookies from document)
            console.log(document.cookie)
            document.cookie = "name=jwt;expires=" + new Date(0).toUTCString() + ';'
        }
    }

</script>


<style>

    .no-verein-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0.66);
        backdrop-filter: blur(10);
        -webkit-backdrop-filter: blur(5px);
    }

</style>
