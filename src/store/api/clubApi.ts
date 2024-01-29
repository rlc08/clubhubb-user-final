

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const clubApi = createApi({
    reducerPath: "clubApi",
    baseQuery,
    endpoints: (builder) => ({
        GetClubList: builder.mutation({
            query: (body) => {

                return {
                    url: "/api/v1/club/club-list",
                    method: "get",
                    headers: {
                        Authorization: `${body.token}`,
                    },
                };
            },
        }),
        GetSingleClub: builder.mutation({
            query: (body) => {
                const token = localStorage.getItem("token");
                return {
                    url: `/api/v1/club/${body.clubId}`,
                    method: "get",
                    headers: {
                        Authorization: `${token}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetClubListMutation, useGetSingleClubMutation } = clubApi;
