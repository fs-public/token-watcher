import { waitFor, cleanup } from "@testing-library/react"
import { render, screen } from "@testing-library/react"
import App from "../App"

afterEach(cleanup)

describe("App E2E", () => {
  it("fetches 100 transfers", async () => {
    render(<App />)

    const tableBody = screen.getByRole("table")

    expect(tableBody).toBeInTheDocument()

    await waitFor(
      () => {
        expect(screen.getAllByRole("row").length).toBeGreaterThanOrEqual(101)
      },
      { timeout: 10000 }
    )
  })
})
