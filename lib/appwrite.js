import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("64808ad2d8955ce0863e"); // Your project ID

export const account = new Account(client);

export const board = new Databases(client, "6481da603d9c884350a7")
