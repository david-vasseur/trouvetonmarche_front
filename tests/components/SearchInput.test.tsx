import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchInput from "@/components/ui/SearchInput";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

vi.mock("@/lib/geo", () => ({
  getRegionById: vi.fn().mockResolvedValue({ nom: "Occitanie", code: "76" }),
  getDepartmentById: vi.fn().mockResolvedValue({ nom: "Haute-Garonne", code: "31" }),
}));

describe("SearchInput", () => {
  beforeEach(() => {
    push.mockReset();

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = new URL(input.toString());

        if (url.pathname === "/regions") {
          return {
            ok: true,
            json: async () => [{ nom: "Occitanie", code: "76" }],
          } as Response;
        }

        if (url.pathname === "/departements") {
          return {
            ok: true,
            json: async () => [{ nom: "Haute-Garonne", code: "31", codeRegion: "76" }],
          } as Response;
        }

        if (url.pathname === "/communes") {
          return {
            ok: true,
            json: async () => [{ nom: "Paris", code: "75056", codeDepartement: "75", codeRegion: "11" }],
          } as Response;
        }

        return {
          ok: true,
          json: async () => [],
        } as Response;
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a location result and navigates to it when selected", async () => {
    const user = userEvent.setup();

    render(<SearchInput />);

    const input = screen.getByPlaceholderText(/Rechercher un marché/i);
    await user.type(input, "paris");

    await waitFor(() => {
      expect(screen.getByText("Paris")).toBeInTheDocument();
    });

    const button = screen.getByText("Paris").closest("button");
    expect(button).not.toBeNull();

    await user.click(button as HTMLButtonElement);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/occitanie/haute-garonne/paris");
    });
  });
});
