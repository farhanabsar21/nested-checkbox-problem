import { render, screen, fireEvent } from "@testing-library/react";
import { describe, beforeEach, it, expect } from "vitest";
import App from "../App";

describe("Nested Checkbox Component", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render all checkboxes", () => {
    expect(screen.getByLabelText("Select All")).toBeInTheDocument();
    expect(screen.getByLabelText("Option A")).toBeInTheDocument();
    expect(screen.getByLabelText("Option B")).toBeInTheDocument();
    expect(screen.getByLabelText("Option B1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option B2")).toBeInTheDocument();
    expect(screen.getByLabelText("Option C")).toBeInTheDocument();
  });

  it("should check all children when parent is checked", () => {
    const parentCheckbox = screen.getByLabelText("Select All");
    fireEvent.click(parentCheckbox);

    expect(screen.getByLabelText("Option A")).toBeChecked();
    expect(screen.getByLabelText("Option B")).toBeChecked();
    expect(screen.getByLabelText("Option B1")).toBeChecked();
    expect(screen.getByLabelText("Option B2")).toBeChecked();
    expect(screen.getByLabelText("Option C")).toBeChecked();
  });

  it("should set parent to indeterminate when some children are checked", () => {
    const optionA = screen.getByLabelText("Option A");
    fireEvent.click(optionA);

    const parentCheckbox = screen.getByLabelText(
      "Select All"
    ) as HTMLInputElement;
    expect(parentCheckbox.indeterminate).toBe(true);
    expect(parentCheckbox.checked).toBe(false);
  });

  it("should handle nested child selections correctly", () => {
    const optionB1 = screen.getByLabelText("Option B1");
    fireEvent.click(optionB1);

    const optionB = screen.getByLabelText("Option B") as HTMLInputElement;
    const parentCheckbox = screen.getByLabelText(
      "Select All"
    ) as HTMLInputElement;

    expect(optionB.indeterminate).toBe(true);
    expect(parentCheckbox.indeterminate).toBe(false);
  });

  it("should uncheck parent when all children are unchecked", () => {
    const parentCheckbox = screen.getByLabelText("Select All");
    fireEvent.click(parentCheckbox);
    fireEvent.click(parentCheckbox);

    expect(screen.getByLabelText("Option A")).not.toBeChecked();
    expect(screen.getByLabelText("Option B")).not.toBeChecked();
    expect(screen.getByLabelText("Option B1")).not.toBeChecked();
    expect(screen.getByLabelText("Option B2")).not.toBeChecked();
    expect(screen.getByLabelText("Option C")).not.toBeChecked();
  });
});
