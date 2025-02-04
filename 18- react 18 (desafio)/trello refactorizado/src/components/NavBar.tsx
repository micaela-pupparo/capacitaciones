import styled from "styled-components";
import { Link } from "react-router";
import { screenChanged } from "../store/ui";
import { userLoggedOut } from "../store/users";
import { FaSistrix } from "react-icons/fa6";
import { BsBell, BsQuestionCircle } from "react-icons/bs";
import { MdApps, MdExpandMore } from "react-icons/md";

// ------------------------------------- ESTILOS -------------------------------------

const Nav = styled.nav`
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 100;
  padding: 0;
`;

const NavBarContainer = styled.div`
  display: flex;
  height: 48px;
  margin: 0 auto;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px 0 15px;
`;

const Logo = styled.div`
  width: 75px;
  height: 16px;
  opacity: 1;
  padding: 8px 0;
  filter: brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%)
    hue-rotate(179deg) brightness(91%) contrast(88%);
  background-image: url(/trellologo.gif);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const NavLink = styled.div`
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: rgb(68, 84, 111);
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 12px;
  margin-right: 4px;
  border-radius: 3px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #091e4224;
  }
`;

const ButtonContainer = styled.div`
  margin: 0 4px;
`;

const Button = styled.button`
  line-height: 32px;
  border: 0px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #0c66e4;
  padding: 0px 12px;

  &:hover {
    background-color: #0055cc;
  }
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 100%;
  width: 200px;
  font-size: 13px;
  margin-right: 5px;
`;

const SearchIcon = styled(FaSistrix)`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  left: 8px;
  color: #626f86;
`;

const Search = styled.input`
  border: 1px solid #8590a2;
  height: 32px;
  width: 100%;
  padding: 0 12px 0 30px;
  outline: none;
  border-radius: 5px;
  line-height: 20px;
`;

const IconContainer = styled.div`
  line-height: 32px;
  width: 32px;
  height: 32px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const UserContainer = styled.div`
    display: flex;
  align-items: center;
`

const User = styled.button`
    border-radius: 100%;
  width: 24px;
  height: 24px;
  background-color: rgb(38, 36, 36);
  color: #fff;
  font-size: 9px;
  letter-spacing: 0px;
`

// ------------------------------------- COMPONENTE -------------------------------------

const NavBar = () => {
  return (
    <Nav>
      <NavBarContainer>
        <LeftSide>
          <MdApps />

          <LogoLink to="/boards">
            <Logo />
          </LogoLink>

          <NavLink>
            <span>Espacios de trabajo</span>
            <MdExpandMore size={16} />
          </NavLink>

          <NavLink>
            <span>Reciente</span>
            <MdExpandMore size={16} />
          </NavLink>

          <NavLink>
            <span>Marcado</span>
            <MdExpandMore size={16} />
          </NavLink>

          <NavLink>
            <span>Plantillas</span>
            <MdExpandMore size={16} />
          </NavLink>

          <ButtonContainer>
            <Button>Crear</Button>
          </ButtonContainer>
        </LeftSide>

        <Items>
          <SearchContainer>
            <SearchIcon />

            <Search type="text" placeholder="Search" />
          </SearchContainer>

          <IconContainer>
            <Icon>
              <BsBell style={{ transform: "rotate(45deg)" }} />
            </Icon>
          </IconContainer>

          <IconContainer>
            <Icon>
              <BsQuestionCircle />
            </Icon>
          </IconContainer>

          <UserContainer>
            <User>MP</User>
          </UserContainer>
        </Items>
      </NavBarContainer>
    </Nav>
  );
};

export default NavBar;
