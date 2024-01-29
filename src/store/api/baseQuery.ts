// baseQuery.ts

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8080/" }); 
// export const baseQuery = fetchBaseQuery({ baseUrl: "https://clubhub-backend-57s4.onrender.com/" }); 


