import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListById, listDeleted } from "../store/lists";
import { RootState } from "../store/configureStore";
import { getTasksByList } from "../store/tasks";
import { RxDotsHorizontal } from "react-icons/rx";
import styled from "styled-components";

// ------------------------------------- ESTILOS -------------------------------------

const ListContainer = styled.article`
  padding: 8px;
  height: min-content;
  width: 18rem;
  box-sizing: border-box;
  border: 0;
`;

const ListHeading = styled.div`
  paddingbottom: 20px;
  fontsize: 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0px;
  margin: 0px;
  margin-bottom: 10px;
`;

const ListName = styled.p`
  fontweight: 600;
  padding: 6px 8px 6px 12px;
`;

const TaskContainer = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const Task = styled.div`
  width: 100%;
  margin: auto;
  min-height: 24px;
  padding: 8px 12px 4px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
  border: none;
`

const TaskName = styled.div`
  width: 100%;
  margin: auto;
`;

// ------------------------------------- COMPONENTE -------------------------------------

interface Props {
  id: number;
}

const List = ({ id }: Props) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => getListById(id)(state));
  const selectedList = useSelector(
    (state: RootState) => state.lists.selectedId
  );
  const tasks = useSelector((state: RootState) => getTasksByList(id)(state));

  const [showInputTask, setShowInputTask] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tasksOrder, setTasksOrder] = useState(tasks || []);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggingOver, setDraggingOver] = useState(null);

  const handleDelete = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(listDeleted(id));
  };

  return (
    <ListContainer>
      <ListHeading>
        <ListName>{list.name}</ListName>
        <RxDotsHorizontal
          style={{ fontSize: 15 }}
          onClick={(e) => handleDelete(e, list.id)}
        />
      </ListHeading>

      {tasksOrder &&
        tasksOrder.map((task) => {
          if (!task || !task.id) return null;
          return (
            <TaskContainer>
              <Task >
                <TaskName>{task.name}</TaskName>
              </Task>
            </TaskContainer>
          )
        })}
    </ListContainer>
  );
};

export default List;
