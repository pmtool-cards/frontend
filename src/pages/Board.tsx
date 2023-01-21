import {
  CircularProgress,
  Container,
  Box,
  CssBaseline,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  useBoardData,
  Board as BoardType,
  Column as ColumnType,
  useAddColumn,
  useUpdateColumn,
} from "../api/boards";
import ColumnItem from "../components/ColumnItem";
import { Container as DNDContainer, Draggable } from "react-smooth-dnd";
import PosCalculation from "../utils/pos-calculation";

const Board = () => {
  let { boardId } = useParams();

  const { isLoading, data, isError, error } = useBoardData(boardId as string);

  const { mutate: addColumn } = useAddColumn(boardId as string);

  const { mutate: updateColumn } = useUpdateColumn(boardId as string);

  const handleAddColumn = () => {
    addColumn({
      title: "New column",
      boardId: parseInt(boardId as string),
      order:
        data.data.columns && data.data.columns.length > 0
          ? data.data.columns[data.data.columns.length - 1].order + 16384
          : 16384,
    });
  };

  const onColumnDrop = ({
    removedIndex,
    addedIndex,
    payload,
  }: {
    removedIndex: number;
    addedIndex: number;
    payload: ColumnType;
  }) => {
    if (removedIndex === addedIndex) {
      return;
    }

    let updatePOS = PosCalculation(
      removedIndex,
      addedIndex,
      data.data?.columns
    );

    updateColumn({
      ...payload,
      order: parseInt(updatePOS),
    });
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

  if (isError) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container component="main" maxWidth={false}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "nowrap",
          gap: 3,
        }}
      >
        <DNDContainer
          orientation={"horizontal"}
          onDrop={onColumnDrop}
          getChildPayload={(index) => {
            return data.data?.columns[index];
          }}
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
          }}
        >
          {data.data.columns.length
            ? data.data?.columns.map((column: ColumnType) => (
                <Draggable key={column.id}>
                  <ColumnItem column={column} />
                </Draggable>
              ))
            : "There are not any columns yet"}
        </DNDContainer>
      </Box>
      <Fab
        color="success"
        aria-label="add"
        sx={{ position: "absolute", bottom: 100, right: 100 }}
        onClick={handleAddColumn}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default Board;
