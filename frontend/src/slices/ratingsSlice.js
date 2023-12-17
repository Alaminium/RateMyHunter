import { apiSlice } from './apiSlice';

const RATINGS_URL = '/api/ratings';

export const ratingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRating: builder.mutation({
      query: (data) => ({
        url: `${RATINGS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    getRatingsByProfessor: builder.query({
      query: ( professor ) => ({
        url: `${RATINGS_URL}/gets?professor_name=${encodeURIComponent(professor)}`,
        method: 'GET',
      }),
    }),
  }),
});
  
  export const {
    useAddRatingMutation, useGetRatingsByProfessorQuery
  } = ratingsSlice;