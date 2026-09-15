import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn((url: string) => {
    if (url.includes("/users")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([{ id: 1, name: "John", email: "john@example.com" }]),
      }) as any;
    }
    if (url.includes("/products")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([{ id: 1, name: "Laptop", price: 75000 }]),
      }) as any;
    }
    if (url.includes("/orders")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([{ id: 1, userId: 1, productId: 1, quantity: 2 }]),
      }) as any;
    }
    return Promise.reject(new Error("Unknown URL"));
  }) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders the main heading", () => {
  render(<App />);
  const heading = screen.getByText(/CI\/CD Demo Application/i);
  expect(heading).toBeInTheDocument();
});

test("renders all three service panel titles", () => {
  render(<App />);
  expect(screen.getByText("User Service")).toBeInTheDocument();
  expect(screen.getByText("Product Service")).toBeInTheDocument();
  expect(screen.getByText("Order Service")).toBeInTheDocument();
});

test("renders user data returned from the user service", async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByText(/John \(john@example.com\)/)).toBeInTheDocument()
  );
});

test("shows an error message when a service call fails", async () => {
  (global.fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes("/users")) {
      return Promise.resolve({ ok: false, status: 500 }) as any;
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve([]) }) as any;
  });

  render(<App />);
  await waitFor(() => expect(screen.getAllByRole("alert").length).toBeGreaterThan(0));
});
