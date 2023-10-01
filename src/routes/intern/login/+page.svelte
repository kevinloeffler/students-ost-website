<section class="default-section">
    <div class="default-container">

        <h1>Login</h1>
        <form action="/intern/login" method="post" use:enhance={onSubmit}>
            <label for="email">Email</label>
            <input name="email" id="email" type="email" required>

            <label for="password">Passwort</label>
            <input name="password" id="password" type="password" required>

            <button type="submit">Login</button>
        </form>

        {#if form?.loggedIn}
            <p>logged in</p>
        {:else}
            <p>not logged in</p>
        {/if}

    </div>
</section>


<script lang="ts">

    import { enhance } from "$app/forms";
    import type {ActionData} from "./$types";

    export let form: ActionData

    function onSubmit() {
        if (form?.loggedIn) {
            history.back()
        }
    }

</script>
