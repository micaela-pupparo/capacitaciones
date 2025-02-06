/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
// import { connect } from "react-redux";
// import { SlTrash } from "react-icons/sl";
import { FaTrello } from "react-icons/fa6";
import { MdExpandMore } from "react-icons/md";
import { HiOutlineViewGrid } from "react-icons/hi";
import { CgHeart } from "react-icons/cg";
import { DiAptana } from "react-icons/di";
import { GoPeople } from "react-icons/go";
// import { TfiPulse } from "react-icons/tfi";
import { getUserId } from "../store/users";
import {
  boardAdded,
  boardSelected,
  boardUnselected,
  boardDeleted,
  getBoardsByUser,
} from "../store/boards";
import { RootState } from "../store/configureStore";
import styled from "styled-components";

// ------------------------------------- ESTILOS -------------------------------------

const PageContainer = styled.div`
  margin-top: 88px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const Aside = styled.aside`
  box-sizing: content-box;
  padding: 0 16px;
  height: 85vh;
  width: 256px;
`;

const asideWrapperStyles = {
  firstChild: `
        border-bottom: 2px solid #091e4224;
    `,
  secondChild: `
        padding: 12px 0 40px;
    `,
};

const AsideWrapper = styled.section<{
  $variant: keyof typeof asideWrapperStyles;
}>`
  ${(props) => asideWrapperStyles[props.$variant]};
`;

const AsideWrapperTitle = styled.p`
  margin: 0;
  font-size: 12;
  padding: 8px 0 8px 12px;
`;

const AsideLink = styled.div<{ $selected?: boolean; $morePadding?: boolean }>`
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  min-height: 20px;
  margin: 0 0 4px 0;
  padding: 6px 8px;
  overflow: hidden;
  border-radius: 8px;
  gap: 8px;
  color: ${(props) =>
    props.$selected ? "rgb(12, 102, 228)" : "rgb(23, 43, 77)"};
  background-color: ${(props) =>
    props.$selected ? "rgb(233, 242, 255)" : "none"};
  padding-left: ${(props) => (props.$morePadding ? "40px" : "8px")};

  &:hover {
    background-color: ${(props) =>
      props.$selected ? "rgb(233, 242, 255)" : "#091e4224"};
  }
`;

const AsideLinkLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 800;
  background: linear-gradient(rgb(174, 71, 135), rgb(231, 116, 187));
  color: #fff;
`;

const Paragraph = styled.p`
  margin: 0;
`;

const Main = styled.main`
  max-width: 825px;
  min-width: 288px;
  width: 100%;
  margin: 0 16px;
`;

const BoardsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
  column-gap: 2%;
  row-gap: 20px;
`;

const BoardContainer = styled.article<{ $withBackground?: boolean }>`
  height: 96px;
  width: 100%;
  overflow: hidden;
  background-color: #091e420f;
  background-size: cover;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  border-radius: 3px;
  max-width: 194px;
  background-image: ${(props) =>
    props.$withBackground ? "url(/flower.svg)" : "none"};
`;

const BoardLink = styled(Link)<{ $background?: boolean }>`
  display: block;
  height: 100%;
  padding: 8px;
  color: #fff;
  background: ${props => props.$background ? "url(/flower.svg)" : "none"};
`;

const boardTitleStyles = {
  normal: `
    font-size: 16px;
    font-weight: 700;
  `,
  new: `
    font-size: 14px;
    font-weight: 400;
  `,
};

const BoardTitle = styled.h3<{ $variant: keyof typeof boardTitleStyles }>`
  ${(props) => boardTitleStyles[props.$variant]};
  margin: 0;
`;

const NewBoardForm = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  color: #172b4d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ------------------------------------- COMPONENTE -------------------------------------

const BoardList = () => {
  // const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState("none");

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => getUserId(state));
  const boards = useSelector((state: RootState) =>
    user ? getBoardsByUser(user.id)(state) : null
  );

  // const handleChange = (e) => {
  //   setQuery(e.target.value);
  // };

  const handleToggle = () =>
    toggle === "none" ? setToggle("block") : setToggle("none");

  const handleBoardClick = (boardId: number) => {
    dispatch(boardSelected(boardId));
  };

  return (
    <PageContainer>
      <Aside>
        <AsideWrapper $variant="firstChild">
          <AsideLink $selected>
            <FaTrello />
            <Paragraph>Tableros</Paragraph>
          </AsideLink>

          <AsideLink>
            <FaTrello />
            <Paragraph>Plantillas</Paragraph>
          </AsideLink>

          <AsideLink>
            <FaTrello />
            <Paragraph>Inicio</Paragraph>
          </AsideLink>
        </AsideWrapper>

        <AsideWrapper $variant="secondChild">
          <AsideWrapperTitle>Espacios de trabajo</AsideWrapperTitle>

          <AsideLink onClick={handleToggle}>
            <AsideLinkLogo>E</AsideLinkLogo>
            <Paragraph>Espacio de trabajo de Trello</Paragraph>
            <MdExpandMore size={16} />
          </AsideLink>

          <div style={{ display: toggle }}>
            <AsideLink $morePadding>
              <FaTrello />
              <Paragraph>Tableros</Paragraph>
            </AsideLink>

            <AsideLink $morePadding>
              <CgHeart />
              <Paragraph>Lo más destacado</Paragraph>
            </AsideLink>

            <AsideLink $morePadding>
              <HiOutlineViewGrid />
              <Paragraph>Vistas</Paragraph>
            </AsideLink>

            <AsideLink $morePadding>
              <GoPeople />
              <Paragraph>Miembros</Paragraph>
            </AsideLink>

            <AsideLink $morePadding>
              <DiAptana />
              <Paragraph>Configuración</Paragraph>
            </AsideLink>
          </div>
        </AsideWrapper>
      </Aside>

      <Main>
        <BoardsContainer>
          {boards &&
            boards.map((board) => (
              <BoardContainer key={board.id}>
                <BoardLink
                  to="/lists"
                  onClick={() => handleBoardClick(board.id)}
                  $background
                >
                  <BoardTitle $variant="normal">{board.name}</BoardTitle>
                </BoardLink>
              </BoardContainer>
            ))}

          <BoardContainer>
            <NewBoardForm>
              <BoardTitle $variant="new">Crear un tablero nuevo</BoardTitle>
            </NewBoardForm>
          </BoardContainer>
        </BoardsContainer>
      </Main>
    </PageContainer>
  );
};

export default BoardList;
