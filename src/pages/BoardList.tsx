import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAddBoard, useBoardList } from "../api/boards";
import BoardItem from "../components/BoardItem";
import { Board } from "../api/boards";
import { useState } from "react";

const BoardList = () => {
  const { isLoading, data, isError, error, isFetching, isSuccess } =
    useBoardList();

  const { mutate: addBoard } = useAddBoard();

  const handleAddBoard = () => {
    addBoard({ title: "New board" });
  };

  if (isLoading) {
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Box sx={{ display: "flex", mt: 2 }}>
            <CircularProgress />
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {data.data.length && isSuccess
          ? data.data?.map((board: Board) => (
              <BoardItem key={board.id} board={board} />
            ))
          : "There are not any boards yet"}
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 100, right: 100 }}
        onClick={handleAddBoard}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default BoardList;
