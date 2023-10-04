<div class="wrapper">

    <div class="text-wrapper">
        <p class="date">{formatDateToString(ostEvent.date, false, true)}</p>
        <p class="name">{ostEvent.name}</p>
    </div>

    <div class="controls">
        <button on:click={editEvent}>
            <img src="/images/intern/edit-icon.svg" alt="Bearbeiten Icon">
        </button>
        <div class="separator"></div>
        <button on:click={deleteEvent}>
            <img src="/images/intern/delete-icon.svg" alt="Löschen Icon">
        </button>
    </div>

</div>


<script lang="ts">

    import {formatDateToString} from "$lib/util.js";

    export let ostEvent: OstEvent

    function editEvent() {
        document.location.href = `/intern/dashboard/edit-event/${ostEvent._id}`
    }

    function deleteEvent() {
        // TODO: handle delete
    }

</script>


<style>

    .wrapper {
        border: 2px solid var(--admin-gray);
        display: flex;
        margin-bottom: 16px;
    }

    .text-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        padding-left: 28px;

        font-family: "Radwave", sans-serif;
        line-height: 1.1;
    }

    .date {
        font-size: 28px;
    }

    .name {
        font-size: 20px;
    }

    .controls {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        border-left: 2px solid var(--admin-gray);
    }

    .separator {
        width: 100%;
        border-top: 2px solid var(--admin-gray);
    }

    .controls > button {
        padding: 16px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition-duration: 250ms;
    }

    .controls > button:hover {
        background-color: #ff5454;
    }

    button:first-child:hover {
        background-color: var(--admin-gray);
    }

    .controls > button > img {
        width: 28px;
    }

</style>
