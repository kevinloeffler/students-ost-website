<svelte:head>
    <link rel="stylesheet" href="/styles-dashboard.css">
</svelte:head>

{#if !hasVerein}
    <div class="no-verein-overlay">
        <p>Du hast keinen Zugriff auf einen Verein oder eine Fachschaft.</p>
        <DashboardButton link="/" content="Logout" onClick="{logout}" minimalWidth />
    </div>
{/if}

<section class="default-section dashboard-top-bar">
    <div class="default-container">
        <h1>{data.organisation?.name} <span>Dashboard</span></h1>
        <DashboardButton link="/" content="Logout" onClick="{logout}" minimalWidth />
    </div>
</section>

<section class="default-section">
    <div class="default-container">
        <slot />
    </div>
</section>


<script lang="ts">

    import DashboardButton from "$lib/components/dashboard/DashboardButton.svelte";

    export let data
    $: hasVerein = !!data.organisation

    async function logout() {
        await fetch('/api/intern/logout')
    }

</script>


<style>

    .dashboard-top-bar {
        border-bottom: 2px solid var(--admin-gray);
        padding: 20px;
        margin-bottom: 20px;
    }

    .dashboard-top-bar > .default-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

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

    .no-verein-overlay > p {
        margin-bottom: 8px;
    }

    h1 {
        font-family: "Jumbox", sans-serif;
        font-size: 28px;
    }

    h1 > span {
        color: var(--admin-gray);
    }

</style>
