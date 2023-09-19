{#if showWarning}
<div class="wrapper">

    <div on:click={toggleWarning} class="wip-warning">
        <p>Diese Seite befindet sich aktuell noch in Entwicklung. Falls du mithelfen willst, melde dich gerne bei uns.</p>
        <button class="close-text">Schliessen</button>
    </div>

</div>
{/if}

<script lang="ts">

    let showWarning = true

    function toggleWarning() {
        showWarning = !showWarning
    }

</script>


<style>

    .wrapper {
        position: fixed;
        top: 30px;
        z-index: 999;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 100vw;
    }

    .wip-warning {
        padding: 20px 40px;
        background-color: white;
        box-shadow: rgba(0, 39, 93, 0.1) 0 8px 33px;
        text-align: center;
        max-width: 600px;
    }

    .close-text {
        border: none;
        outline: none;
        background-color: transparent;
        opacity: 0.5;
    }

</style>
