import { listAdded, lastId, List } from "../lists";
import { boardUpdatedOder } from "../boards";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";

export const addListUpdateOrder = (list: List, boardId: number) => (dispatch: Dispatch<UnknownAction>) => {
  const newList = { ...list };
  let lastListId = lastId;
  newList.id = ++lastListId;
  dispatch(listAdded(newList));

  dispatch(boardUpdatedOder({ boardId, listId: lastListId }));
};
