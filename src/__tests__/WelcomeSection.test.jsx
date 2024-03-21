import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Welcome Component testing", () => {
  it("mounts correctly the Welcome Component at launch", () => {
    //1) montaggio componente
    render(<App />);
    //2) ricerca dell'elemento
    const WelcomeComponent = screen.getByText("Benvenuti in EpiBooks!");
    //3) (opzionale) interazione tra componenti

    //4) verifica dei risultati
    expect(WelcomeComponent).toBeInTheDocument();
  });
});
