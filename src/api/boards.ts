import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
import { User } from "./auth";

export type Board = {
  id: number;
  title: string;
  user: User;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
};

export type Column = {
  id: number;
  title: string;
  order: number;
  cards: Card[];
  boardId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Card = {
  id: number;
  title: string;
  description?: string;
  order: number;
  columnId: number;
  createdAt: Date;
  updatedAt: Date;
};

// BOARD PROMISES

const getBoardListOfUser = () => {
  return request({ url: "/boards" });
};

const getBoard = ({ queryKey }: { queryKey: any[] }) => {
  const boardId = queryKey[1];
  return request({ url: `/boards/${boardId}` });
};

const addBoard = (boardData: any) => {
  return request({
    url: "/boards",
    method: "post",
    data: boardData,
  });
};

const updateBoard = (boardData: any) => {
  return request({
    url: `/boards/${boardData.id}`,
    method: "put",
    data: boardData,
  });
};

const deleteBoard = (boardId: number) => {
  return request({
    url: `/boards/${boardId}`,
    method: "delete",
  });
};

// COLUMN PROMISES

const getColumnListOfBoard = (boardId: number) => {
  return request({ url: `/columns/ofboard/${boardId}` });
};

const getColumn = ({ queryKey }: { queryKey: any[] }) => {
  const columnId = queryKey[1];
  return request({ url: `/columns/${columnId}` });
};

const addColumn = (columnData: any) => {
  return request({
    url: "/columns",
    method: "post",
    data: columnData,
  });
};

const updateColumn = (columnData: any) => {
  return request({
    url: `/columns/${columnData.id}`,
    method: "put",
    data: columnData,
  });
};

const deleteColumn = (columnId: number) => {
  return request({
    url: `/columns/${columnId}`,
    method: "delete",
  });
};

// CARD PROMISES

const getCardListOfColumn = (columnId: number) => {
  return request({ url: `/card/ofcolumn/${columnId}` });
};

const getCard = ({ queryKey }: { queryKey: any[] }) => {
  const cardId = queryKey[1];
  return request({ url: `/cards/${cardId}` });
};

const addCard = (cardData: any) => {
  return request({
    url: "/cards",
    method: "post",
    data: cardData,
  });
};

const updateCard = (cardData: any) => {
  return request({
    url: `/cards/${cardData.id}`,
    method: "put",
    data: cardData,
  });
};

const deleteCard = (cardId: number) => {
  return request({
    url: `/cards/${cardId}`,
    method: "delete",
  });
};

// BOARD QUERIES

export const useBoardData = (boardId: string, onSuccess?: any) => {
  const queryClient = useQueryClient();
  return useQuery(["board", boardId], getBoard, {
    initialData: () => {
      const board = queryClient
        .getQueryData("boards")
        ?.data?.find((board: Board) => board.id === parseInt(boardId));

      if (board) {
        return { data: board };
      } else {
        return undefined;
      }
    },
    onSuccess,
    retry: false,
  });
};

export const useBoardList = (onSuccess?: any, onError?: any) => {
  const queryClient = useQueryClient();
  return useQuery("boards", getBoardListOfUser, {
    initialData: () => {
      const boards = queryClient.getQueryData("boards")?.data;

      if (boards) {
        return { data: boards };
      } else {
        return undefined;
      }
    },
    onSuccess,
    onError,
    retry: false,
  });
};

export const useAddBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(addBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

// COLUMN QUERIES

export const useAddColumn = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addColumn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });
};

export const useUpdateColumn = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(updateColumn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });
};

export const useDeleteColumn = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(deleteColumn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });
};

// CARD QUERIES

export const useAddCard = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(addCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });
};

export const useUpdateCard = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(updateCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });
};

export const useDeleteCard = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation(deleteCard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });
};
