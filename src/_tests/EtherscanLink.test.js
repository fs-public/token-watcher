import { waitFor } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EtherscanLink from "../components/EtherscanLink";

describe("EtherscanLink Component", () => {
    const randomInteractingAddress =
        "0xAF0B0000f0210D0f421F0009C72406703B50506B";

    Object.assign(navigator, {
        clipboard: {
            text: "",
            writeText: async (newText) => {
                navigator.clipboard.text = newText;
                return new Promise((res, rej) => {
                    res();
                });
            },
        },
    });

    it("renders copy button", () => {
        render(
            <EtherscanLink hex={randomInteractingAddress} type={"address"} />
        );
        const copyButton = screen.getByRole("img");

        expect(copyButton).toBeInTheDocument();
        expect(copyButton.src).not.toBe(undefined);
    });

    it("replaces image on click", async () => {
        render(
            <EtherscanLink hex={randomInteractingAddress} type={"address"} />
        );

        const copyButton = screen.getByRole("img");
        const firstSource = copyButton.src;

        userEvent.click(copyButton);

        await waitFor(async () => {
            const secondSource = screen.getByRole("img").src;
            expect(secondSource).not.toBe(firstSource);
        });

        expect(screen.getByRole("img").src).not.toBe(undefined);
    });

    it("copies to clipboard", async () => {
        render(
            <EtherscanLink hex={randomInteractingAddress} type={"address"} />
        );

        const copyButton = screen.getByRole("img");
        const firstSource = copyButton.src;

        await navigator.clipboard.writeText("");

        expect(navigator.clipboard.text).toBe("");

        userEvent.click(copyButton);

        await waitFor(async () => {
            const secondSource = screen.getByRole("img").src;
            expect(secondSource).not.toBe(firstSource);
        });

        expect(navigator.clipboard.text).toBe(randomInteractingAddress);
    });
});
