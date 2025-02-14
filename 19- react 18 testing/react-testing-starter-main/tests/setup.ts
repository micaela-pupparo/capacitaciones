import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import {server} from "./mocks/server";

// antes de los archivo de prueba, empezamos el servidor para que escuche asi escucha los pedidos a los endpoints configurados
beforeAll(() => server.listen());
// debemos resetear nuestros handlers despues de que un archivo de prueba se ejecute para que cada archivo empiece con un estado limpio
afterEach(() => server.resetHandlers());
// luego de todos los tests, queremos cerrar el servidor
afterAll(() => server.close())

global.ResizeObserver = ResizeObserver;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });