import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getListById, listDeleted } from "../store/lists";
import { RootState } from "../store/configureStore";
import { getTasksByList, Task, taskAdded } from "../store/tasks";
import { RxDotsHorizontal } from "react-icons/rx";
import styled from "styled-components";
import { VscAdd, VscChromeClose } from "react-icons/vsc";

// ------------------------------------- ESTILOS -------------------------------------

const ListContainer = styled.article`
  padding: 8px;
  height: min-content;
  width: 18rem;
  box-sizing: border-box;
  border: 0;
  margin: 0 6px;
  width: 272px;
  padding: 12px;
  font-size: 14px;
  background-color: #f1f2f4;
  border-radius: 12px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
`;

const ListHeading = styled.div`
  padding-bottom: 20px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0px;
  margin: 0px;
  margin-bottom: 10px;
`;

const ListName = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 600;
  padding: 6px 8px 6px 12px;
`;

const TaskContainer = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const TaskDiv = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  margin: auto;
  min-height: 24px;
  padding: 8px 12px 4px;
  padding: 6px 12px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
  border: none;
`;

const TaskName = styled.div`
  width: 100%;
  margin: auto;
`;

const NewTaskButton = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  gap: 10px;
  cursor: pointer;
  padding: 6px 12px 6px 8px;
  border-radius: 8px;

  &:hover {
    background-color: #091e4224;
  }
`;

const NewTaskForm = styled.form``;

const NewTaskInput = styled.input`
  box-sizing: border-box;
  height: 32px;
  width: 100%;
  min-height: 20px;
  padding: 6px 12px;
  overflow: hidden;
  border-radius: 4px;
  overflow-wrap: break-word;
  color: var(--ds-text, #172b4d);
  font-weight: 600;
  border: 1px solid transparent;

  &:focus {
    border: 1px solid #0c66e4;
  }
`;

const NewTaskButtonForm = styled.button`
  border-radius: 3px;
  border: none;
  background-color: #0c66e4;
  color: #fff;
  padding: 6px 12px;
`;

const FormControlsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const FormIcon = styled.div`
  padding: 6;
  display: flex;
  align-items: center;
`;

// ------------------------------------- COMPONENTE -------------------------------------

interface Props {
  id: number;
}

const List = ({ id }: Props) => {
  const dispatch = useDispatch();

  const listSelector = useMemo(() => getListById(id), [id]);
  const list = useSelector(listSelector, shallowEqual);

  const selectedList = useSelector(
    (state: RootState) => state.lists.selectedId,
    shallowEqual
  );

  const tasksSelector = useMemo(() => getTasksByList(id), [id]);
  const tasks = useSelector(tasksSelector, shallowEqual);

  const [showInputTask, setShowInputTask] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tasksOrder, setTasksOrder] = useState(tasks ?? []);

  const inputRef = useRef<HTMLInputElement>(null);
  const lastTask = useRef<Task | null>(
    null
  ) as React.MutableRefObject<Task | null>;

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>, id: number) => {
      e.preventDefault();
      // e.stopPropagation();
      dispatch(listDeleted(id));
    },
    [dispatch, id]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (inputRef.current?.value) {
        const newTask = {
          name: inputRef.current.value,
          listId: id,
        };

        dispatch(taskAdded(newTask));
        setShowInputTask(false);
      }
    },
    [dispatch, id]
  );

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const newTask = tasks[tasks.length - 1];

    if (lastTask.current?.id !== newTask.id) {
      setTasksOrder((prevTasks) => {
        if (prevTasks.some((task) => task.id === newTask.id)) return prevTasks;
        return [...prevTasks, newTask];
      });
      lastTask.current = newTask;
      console.log("taskOrder");
    }
  }, [tasks]);

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
            <TaskContainer key={task.id}>
              <TaskDiv>
                <TaskName>{task.name}</TaskName>
              </TaskDiv>
            </TaskContainer>
          );
        })}

      <TaskContainer>
        {!showInputTask && (
          <NewTaskButton onClick={(e) => setShowInputTask(true)}>
            <VscAdd />
            <div>Añade una tarjeta</div>
          </NewTaskButton>
        )}

        {showInputTask && (
          <NewTaskForm onSubmit={handleSubmit}>
            <NewTaskInput name="name" ref={inputRef} autoFocus />
            <FormControlsContainer>
              <NewTaskButtonForm type="submit">
                Añadir tarjeta
              </NewTaskButtonForm>
              <FormIcon onClick={() => setShowInputTask(false)}>
                <VscChromeClose size={18} />
              </FormIcon>
            </FormControlsContainer>
          </NewTaskForm>
        )}
      </TaskContainer>
    </ListContainer>
  );
};

export default memo(List);
