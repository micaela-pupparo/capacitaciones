import { listAdded, lastId } from "../lists";
import { boardUpdatedOder } from "../boards";

export const addListUpdateOrder = (list, boardId) => (dispatch) => {
  const newList = { ...list };
  let lastListId = lastId;
  newList.id = ++lastListId;
  dispatch(listAdded(newList));

  dispatch(boardUpdatedOder({ boardId, listId: lastListId }));
};
