import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render Hello with the name whn name is provided", () => {
    // renderiza el componente dentro de un dom virtual que es implementado por jsdom
    render(<Greet name="Mosh" />);

    // para ver el estado del dom usamos el objeto screen
    // esto devuelve cualquier elemento que tenga el rol de heading (h1, h2, h3, etc)
    const heading = screen.getByRole("heading");

    // utilizamos un matcher de testing library
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/mosh/i);
  });

  it("should render login button when name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
