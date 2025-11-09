from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Set viewport to a mobile size
    page.set_viewport_size({"width": 375, "height": 667})

    # Navigate to the local server
    page.goto("http://localhost:8000")

    # Click the hamburger menu
    hamburger_button = page.locator("#hamburger-menu")
    hamburger_button.click()

    # Wait for the nav links to have the 'active' class.
    # This confirms the JS has run before we check for visibility.
    nav_links = page.locator("#nav-links.active")
    expect(nav_links).to_be_attached() # Wait for the class to be added

    # Now, check for visibility
    expect(nav_links).to_be_visible()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)