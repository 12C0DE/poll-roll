import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Container, Typography } from "@mui/material";

export const LoadingSkeleton = () => {
  return (
    <Container maxWidth="md" className="m-8">
      <Stack spacing={2}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" height={10} width="40%" />

        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
        <Typography variant="h4" gutterBottom component="div" align="center">
          Loading...
        </Typography>
      </Stack>
    </Container>
  );
};
