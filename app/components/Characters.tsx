"use client";
import { useQuery } from "@apollo/client";
import { CHARACTERS_QUERY } from "../graphql/queries/characters";
import { Typography } from "@mui/material";

export default function Characters() {
  const { data, loading, error } = useQuery(CHARACTERS_QUERY);
  console.log(data);
  
  return (
    <>
      {loading && <p>Loading...</p>}
      <Typography>Characters</Typography>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  );
}
