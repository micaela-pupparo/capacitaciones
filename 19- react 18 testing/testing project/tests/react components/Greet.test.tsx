import React from "react";
import { it, expect, describe, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  beforeEach(() => {
    cleanup(); //esto se debe hacer porque sino tira error en el segundo test dado a los renders. el primero no deja de tener efecto cuando se ejecuta el segundo caso de prueba
  });

  it("should render Hello with the name when name is provided", () => {
    render(<Greet name="Mica" />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/mica/i);
  });

  it("should render anonimous greet if name is not provided", () => {
    render(<Greet />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/usuario/i);
  });
});
