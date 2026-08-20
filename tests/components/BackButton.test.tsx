import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BackButton from "@/components/ui/BackButton";

const back = vi.fn();
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back, push }),
}));

describe("BackButton", () => {
  beforeEach(() => {
    back.mockReset();
    push.mockReset();
  });

  it("uses router.back when browser history exists", async () => {
    const user = userEvent.setup();
    const lengthGetter = vi.spyOn(window.history, "length", "get").mockReturnValue(2);

    render(<BackButton />);
    await user.click(screen.getByRole("button", { name: /retour/i }));

    expect(back).toHaveBeenCalledTimes(1);
    lengthGetter.mockRestore();
  });

  it("falls back to the provided href when there is no browser history", async () => {
    const user = userEvent.setup();
    const lengthGetter = vi.spyOn(window.history, "length", "get").mockReturnValue(1);

    render(<BackButton fallbackHref="/accueil" />);
    await user.click(screen.getByRole("button", { name: /retour/i }));

    expect(push).toHaveBeenCalledWith("/accueil");
    lengthGetter.mockRestore();
  });
});
