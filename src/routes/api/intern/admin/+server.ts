import {json, type RequestHandler} from "@sveltejs/kit";
import {getAllUsers} from "$lib/database.server";
import {Schema} from "mongoose";

export const GET: RequestHandler = ( async ({cookies}) => {
  /*const jwtCookie = cookies.get('jwt')
  if (jwtCookie === undefined) {
    console.log('no jwt found')
    return new Response(JSON.stringify({'body': '401 - Unauthorized'}), {status: 401})
  }

  let accessToken
  try {
    accessToken = readJWT(jwtCookie)
    console.log('JWT:', accessToken)
  } catch (error) {
    console.error('Can not read JWT: re-authentication is required')
    console.error(error)
    return new Response(JSON.stringify({'body': '401 - Unauthorized'}), {status: 401})
  }*/
  
  const users = await getAllUsers()
  //const organisation = await getOrganisation(user.organisation || '')
  //const orgEvents = await getOstEventsByOrganiser(user.organisation || '')
  return json(users)
})
