import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

// ------------------------------------- ESTILOS -------------------------------------

const HomeWrapper = styled.section`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(rgb(82, 67, 170), rgb(237, 80, 180)) no-repeat;
`;

const Hero = styled.section`
  margin: 0 150px;
  padding: 0 16px;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1140px;
`;

const HeroColumn = styled.article`
  padding: 128px 16px;
`;

const HeroTitle = styled.h2`
  font-size: 3rem;
  line-height: 1.25;
  font-weight: 500;
`;

const HeroParagraph = styled.p`
  font-size: 1.25rem;
`;

const HeroForm = styled.form`
  display: flex;
  justify-content: start;
  gap: 1rem;
  font-size: 0.8rem;
`;

const HeroInput = styled.input`
  padding: 0.7rem 0.75rem 0.8rem;
  border: 1px solid rgb(223, 225, 230);
  border-radius: 0.3rem;
  max-width: 300px;
  width: 375px;
`;

const HeroButton = styled.button`
  background-color: rgb(0, 101, 255);
  border: 1px solid rgb(0, 101, 255);
  color: #fff;
  padding: 0.7rem 1rem 0.8rem;
  border-radius: 0.3rem;
  white-space-collapse: preserve;
  width: 60%;
`;

const HeroImgContainer = styled.div`
  left: 16.6%;
  flex: 0 0 auto;
  margin-top: 0;
  padding: 128px 16px;
  padding-top: 8rem;
`;

const Image = styled.img`
  width: 100%;
`;

const InfoWrapper = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoTitle = styled.div`
  margin: 0 auto;
  max-width: 1140px;
  padding: 3rem 1rem 1rem;
  text-align: center;
  color: rgb(9, 30, 66);
`;

const GroupBadges = styled.div`
  max-width: 1140px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
`;

const badgeStyles = {
  default: `
    display: inline;
  font-size: 1rem;
  background-color: rgb(192, 182, 242);
  color: rgb(9, 30, 66);
  border-radius: 21px;
  border: 3px solid transparent;
  padding: 0.7rem 1.2rem;
  `,
  active: `
    font-size: 1rem;
  display: inline;
  background-color: rgb(64, 50, 148);
  color: #fff;
  border-radius: 21px;
  border: 3px solid transparent;
  padding: 0.5rem 1.2rem;
  `,
};

const Badge = styled.div<{ $variant: keyof typeof badgeStyles }>`
  ${(props) => badgeStyles[props.$variant]}
`;

const InfoTasks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 1rem 0 2rem 0;
`;

const InfoTaskText = styled.div`
  margin-left: 16.66%;
  padding: 3rem 1rem;
  color: var(--color-text);
  letter-spacing: 1px;
`;

const InfoTaskTextTitle = styled.h4`
  font-size: 2rem;
  font-weight: 600;
`;

const InfoTaskImage = styled.div`
  padding: 3rem 0;
`;

// ------------------------------------- COMPONENTE -------------------------------------

const Home = () => {
  const usernameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    navigate("/register", { state: { username: usernameRef.current?.value } });
  };

  return (
    <HomeWrapper>
      <HeroContainer>
        <Hero>
          <HeroColumn>
            <HeroTitle>
              Trello makes it easier for teams to manage projects and tasks
            </HeroTitle>

            <HeroParagraph>
              Simple, flexible, and powerful. All it takes are boards, lists,
              and cards to get a clear view of who’s doing what and what needs
              to get done.
            </HeroParagraph>

            <HeroParagraph>WHAT YOU GET ON THE FREE PLAN:</HeroParagraph>

            <ul>
              <li>Unlimited cards</li>
              <li>Unlimited Power-Ups per board</li>
            </ul>

            <HeroForm onSubmit={handleSubmit}>
              <HeroInput
                ref={usernameRef}
                name="username"
                type="text"
                placeholder="Correo electrónico"
              />
              <HeroButton type="submit">Regístrate, ¡es gratis!</HeroButton>
            </HeroForm>
          </HeroColumn>

          <HeroImgContainer>
            <Image
              sizes="(max-width: 1300px) 100vw, 1300px"
              srcSet="
              01_Hero_2x_q4wg87_c_scale,w_300.webp 300w,
              01_Hero_2x_q4wg87_c_scale,w_765.webp 765w,
              01_Hero_2x_q4wg87_c_scale,w_1300.webp 1300w"
              src="01_Hero_2x_q4wg87_c_scale,w_1300.webp"
              alt="Trello Picture"
            />
          </HeroImgContainer>
        </Hero>
      </HeroContainer>

      <InfoWrapper>
        <Info>
          <InfoTitle>
            <h3>Explore Trello’s features that help your team succeed</h3>
          </InfoTitle>

          <GroupBadges>
            <Badge $variant="active">Cards</Badge>
            <Badge $variant="default">Views</Badge>
            <Badge $variant="default">Automation</Badge>
          </GroupBadges>

          <InfoTasks>
            <InfoTaskText>
              <InfoTaskTextTitle>Manage tasks with ease.</InfoTaskTextTitle>

              <ul>
                <li>
                  <strong>Members:</strong> Keep everyone accountable and never
                  have to ask “who’s doing that” by adding members to cards for
                  their projects and tasks.{" "}
                </li>
                <li>
                  <strong>Due dates:</strong> They're easy to set, hard to miss
                  (with reminders!), and oh-so-satisfying to mark as “done.”{" "}
                </li>
                <li>
                  <strong>Attachments:</strong> No more digging through endless
                  email chains to find attachments. Just drag and drop them onto
                  a card so the right files stay with the right tasks.{" "}
                </li>
                <li>
                  <strong>Checklists:</strong> Your best tool to overpower
                  overwhelming asks. Break big tasks into small ones, check
                  things off the list, and watch that status bar go to 100%
                  complete.{" "}
                </li>
              </ul>
            </InfoTaskText>

            <InfoTaskImage>
              <Image src="/tasks.webp" alt="" />
            </InfoTaskImage>
          </InfoTasks>
        </Info>
      </InfoWrapper>
    </HomeWrapper>
  );
};

export default Home;
