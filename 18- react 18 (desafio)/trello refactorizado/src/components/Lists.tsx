import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../store/configureStore.ts";
import {
  getAllListsByBoardId,
  listAdded,
  listUnselected,
} from "../store/lists";
import { navbarClassChanged } from "../store/ui";
import { getOrderListByBoard, getBoardById } from "../store/boards";
import { addListUpdateOrder } from "../store/middlewares/updateOrderList.ts";
import List from "./List";
import { VscAdd, VscChromeClose } from "react-icons/vsc";
import { FiStar } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { MdExpandMore } from "react-icons/md";
import { RiRocketLine } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { DiAptana } from "react-icons/di";
import { VscListFilter } from "react-icons/vsc";
import { LiaUser, LiaThListSolid, LiaCalendar } from "react-icons/lia";
import { FaTrello } from "react-icons/fa6";
import { BsFillLightningFill, BsPersonPlus } from "react-icons/bs";
import { LuAlignStartHorizontal } from "react-icons/lu";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
// import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
// import {
//   arrayMove,
//   horizontalListSortingStrategy,
//   SortableContext,
// } from "@dnd-kit/sortable";
// import SortableItem from "./dnd/SortableItem.tsx";
// import ListContent from "./dnd/ListContent.tsx";

// ------------------------------------- ESTILOS -------------------------------------

const ListsContainer = styled.div`
  width: 100%;
  display: flex;
`;
const AsideContainer = styled.aside`
  margin-top: 48px;
  width: 260px;
  height: calc(100vh - 48px);
  background-color: hsla(323, 70.6%, 34.8%, 0.9);
`;

const SpaceWork = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 12px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.16);
`;

const SpaceWorkImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 800;
  background: linear-gradient(rgb(174, 71, 135), rgb(231, 116, 187));
  color: #fff;
`;

const SpaceWorkName = styled.div`
  flex-grow: 1;
  margin-right: 4px;
  margin-left: 8px;
  text-align: left;
`;

const Links = styled.div`
  padding-top: 12px;
`;

const Link = styled.div`
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  display: flex;
  color: #fff;
  align-items: center;
  padding-left: 16px;
  gap: 12px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const LinksTitle = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 0 4px 12px;
`;

const Main = styled.main`
  margin-top: 48px;
  flex-grow: 1;
  width: calc(100% - 260px);
  height: calc(100vh - 48px);
  background-image: url(/flower.svg);
  overflow-x: scroll;
  overflow: auto;
`;

const Paragraph = styled.p`
  margin: 0;
`;

const ListsHeaderWrapper = styled.div`
  background-color: #0000003d;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    to bottom,
    hsla(323, 70.6%, 34.8%, 0.9),
    #0000003d,
    #0000003d
  );
  height: auto;
  width: calc(100% - 260px);
  position: fixed;
  z-index: 0;
`;

const ListsHeader = styled.div`
  padding: 12px;
  display: flex;
  justify-content: space-between;
`;

const ListsHeaderItems = styled.div`
  display: flex;
  align-items: center;
`;

const ListsHeaderTitle = styled.h3`
  margin: 0;
  padding: 0 10px;
  overflow: hidden;
  background: transparent;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  line-height: 32px;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListsHeaderLink = styled.div<{ $button?: boolean }>`
  color: ${(props) => (props.$button ? "#172b4d" : "#fff")};
  background-color: ${(props) => (props.$button ? "#dcdfe4" : "none")};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 10px;
  font-weight: 600;
  padding: ${(props) => (props.$button ? "6px 12px" : "0")};
  border-radius: ${(props) => (props.$button ? "3px" : "0")};
`;

const SpaceBar = styled.span`
  height: 16px;
  margin: 8px 4px 8px 4px;
  border-left: 1px solid hsla(0, 0%, 100%, 0.16);
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin: 0 5px;
  width: 28px;
  height: 28px;
  background-color: rgb(38, 36, 36);
  color: #fff;
  font-size: 8px;
  letter-spacing: 0px;
`;

const UserIcon = styled.p`
  margin: 0;
  font-size: 12;
  font-weight: 600;
`;

const ListsItems = styled.div`
  display: flex;
  overflow: visible;
  margin-top: 70px;
  padding: 0 7px;
`;

const ListContainer = styled.article``;

const ListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 272px;
  padding: 12px;
  border-radius: 12px;
  background-color: #ffffff3d;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
`;

const Form = styled.form`
  margin: 0 6px;
  width: 272px;
  padding: 12px;
  font-size: 14px;
  background-color: #f1f2f4;
  border-radius: 12px;
  box-shadow: 0px 1px 1px #091e4240, 0px 0px 1px #091e424f;
`;

const Input = styled.input`
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

const FormControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
  border-radius: 4px;
  gap: 4px;
`;

const FormButton = styled.button`
  border-radius: 3px;
  border: none;
  background-color: #0c66e4;
  color: #fff;
  padding: 6px 12px;
`;

const FormIcon = styled.div`
  padding: 6;
  display: flex;
  align-items: center;
`;

// ------------------------------------- COMPONENTE -------------------------------------

const arrayMove = (arr: any[], fromIndex: number, toIndex: number): any[] => {
  const newArr = Array.from(arr);
  const [removed] = newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, removed);
  return newArr;
};

const Lists = () => {
  console.log("o yo");

  const boardId = useSelector(
    (state: RootState) => state.boards.selectedId,
    shallowEqual
  );

  const listsSelector = useMemo(
    () => getAllListsByBoardId(boardId || 0),
    [boardId]
  );
  const lists = useSelector(listsSelector, shallowEqual);

  const listsOrderSelector = useMemo(
    () => getOrderListByBoard(boardId || 0),
    [boardId]
  );
  const listsIds = useSelector(listsOrderSelector, shallowEqual);

  const boardSelector = useMemo(() => getBoardById(boardId || 0), [boardId]);
  const board = useSelector(boardSelector, shallowEqual);

  const dispatch = useDispatch<AppDispatch>();

  const [listsOrder, setListOrder] = useState(listsIds ?? []);
  const [showInput, setShowInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setShowInput(true);
    },
    []
  );

  const handleAddList = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const formData = new FormData(e.currentTarget);
      if (inputRef.current) {
        const newList = {
          id: 0,
          name: formData.get("name") as string,
          boardId: boardId || 0,
        };

        dispatch(addListUpdateOrder(newList, boardId || 0));
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    },
    [dispatch, boardId]
  );

  useEffect(() => {
    if (listsIds && listsIds.length > 0) {
      // Tomamos el último ID del array proveniente del store.
      const newId = listsIds[listsIds.length - 1];

      setListOrder((prevLists) => {
        if (prevLists?.includes(newId)) {
          return prevLists; // No lo agregamos de nuevo.
        }
        return [...(prevLists ?? []), newId];
      });
    }
  }, [listsIds]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    setListOrder(arrayMove(listsOrder, sourceIndex, destinationIndex));
  };

  const memoizedListsOrder = useMemo(() => listsOrder, [listsOrder]);

  return (
    <ListsContainer>
      <AsideContainer>
        <SpaceWork>
          <SpaceWorkImage>E</SpaceWorkImage>

          <SpaceWorkName>Espacio de trabajo de Trello</SpaceWorkName>

          <MdExpandMore
            style={{
              minWidth: 16,
              color: "#fff",
              transform: "rotate(90deg)",
              width: 24,
              height: 24,
            }}
          />
        </SpaceWork>

        <Links>
          <Link>
            <FaTrello />
            <div>Tableros</div>
          </Link>

          <Link>
            <LiaUser />
            <div>Miembros</div>
          </Link>

          <Link>
            <DiAptana />
            <div>Ajustes del Espacio de trabajo</div>
          </Link>
        </Links>

        <Links>
          <LinksTitle>Vistas del Espacio de trabajo</LinksTitle>

          <Link>
            <LiaThListSolid />
            <div>Tabla</div>
          </Link>

          <Link>
            <BiCalendar />
            <div>Calendario</div>
          </Link>
        </Links>

        <Links>
          <LinksTitle>Sus tableros</LinksTitle>

          <Link>
            <LiaThListSolid />
            <div>Tabla</div>
          </Link>

          <Link>
            <BiCalendar />
            <div>Calendario</div>
          </Link>
        </Links>
      </AsideContainer>

      <Main>
        <ListsHeaderWrapper>
          <ListsHeader>
            <ListsHeaderItems>
              <ListsHeaderTitle>{board?.name}</ListsHeaderTitle>

              <FiStar
                style={{ color: "#fff", fontSize: 14, margin: "0 5px" }}
              />

              <ListsHeaderLink>
                <GoPeople />
                <Paragraph>Visible para el Espacio de trabajo</Paragraph>
              </ListsHeaderLink>

              <ListsHeaderLink>
                <LuAlignStartHorizontal />
                <Paragraph>Tablero</Paragraph>
              </ListsHeaderLink>

              <MdExpandMore
                style={{ minWidth: 16, color: "#fff", fontSize: 20 }}
              />
            </ListsHeaderItems>

            <ListsHeaderItems>
              <ListsHeaderLink>
                <RiRocketLine style={{ transform: "rotate(45deg)" }} />
                <Paragraph>Power-ups</Paragraph>
              </ListsHeaderLink>

              <ListsHeaderLink>
                <BsFillLightningFill />
                <Paragraph>Automatización</Paragraph>
              </ListsHeaderLink>

              <ListsHeaderLink>
                <VscListFilter />
                <Paragraph>Filtros</Paragraph>
              </ListsHeaderLink>

              <SpaceBar />

              <User>
                <UserIcon>MP</UserIcon>
              </User>

              <ListsHeaderLink $button>
                <BsPersonPlus />
                <Paragraph>Compartir</Paragraph>
              </ListsHeaderLink>
            </ListsHeaderItems>
          </ListsHeader>
        </ListsHeaderWrapper>

        <ListsItems>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="lists" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{display: 'flex'}}>
                  {listsOrder?.map((id, index) => (
                    <Draggable
                      key={id}
                      draggableId={id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style }}
                        >
                          <ListContainer>
                            <List id={id} />
                          </ListContainer>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <ListContainer>
            {!showInput && (
              <ListButton onClick={(e) => handleAddClick(e)}>
                <VscAdd style={{ marginRight: 8 }} />
                <Paragraph>Añade otra lista</Paragraph>
              </ListButton>
            )}

            {showInput && (
              <Form onSubmit={(e) => handleAddList(e)}>
                <Input
                  ref={inputRef}
                  name="name"
                  type="text"
                  placeholder="Introduce el nombre de la lista..."
                  autoFocus
                />

                <FormControls>
                  <FormButton type="submit">Añadir lista</FormButton>

                  <FormIcon onClick={() => setShowInput(false)}>
                    <VscChromeClose size={18} />
                  </FormIcon>
                </FormControls>
              </Form>
            )}
          </ListContainer>
        </ListsItems>
      </Main>
    </ListsContainer>
  );
};

export default Lists;
