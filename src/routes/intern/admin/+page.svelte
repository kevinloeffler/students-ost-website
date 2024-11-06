<h1>test</h1>

{#each users as user}
    <p>{user.username}</p>
{/each}

<script lang="ts">

    export let data
    const users: User[] = data.users

</script>