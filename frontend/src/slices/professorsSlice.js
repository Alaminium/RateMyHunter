import { apiSlice } from './apiSlice';
const PROFESSORS_URL = '/api/ratings';

export const professorsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      addProfessor: builder.mutation({
        query: (data) => ({
          url: `${PROFESSORS_URL}`,
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
  
  export const {
    useAddProfessorMutation
  } = professorsSlice;