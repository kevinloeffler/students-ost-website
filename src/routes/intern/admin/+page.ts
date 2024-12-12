import type {PageLoad} from "./$types";

export const load: PageLoad = ( async ({ fetch }) => {
  
  //const rawUsers = await fetch(`/api/intern/admin`)
  //const users: User[] = await rawUsers.json()
  
  return {
    users: users
  }
})