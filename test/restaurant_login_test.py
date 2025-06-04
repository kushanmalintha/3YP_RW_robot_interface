from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Edge WebDriver path
EDGE_DRIVER_PATH = "msedgedriver.exe"

# Login details
url = "http://54.79.197.251:5001/"
email = "fireplate@gmail.com"
password = "P@ssw0rd!"

# Setup WebDriver
options = Options()
service = EdgeService(executable_path=EDGE_DRIVER_PATH)
driver = webdriver.Edge(service=service, options=options)

try:
    driver.get(url)

    # Click the "Restaurant Login" card
    wait = WebDriverWait(driver, 10)
    restaurant_card = wait.until(EC.element_to_be_clickable(
        (By.XPATH, "//div[contains(@class, 'role-selection')]//h2[text()='Restaurant Login']/ancestor::div[contains(@class, 'role-card')]")
    ))
    restaurant_card.click()

    # Wait for the form and enter email
    wait.until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Restaurant Email']"))).send_keys(email)

    # Enter password
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys(password)

    # Submit the form
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    time.sleep(5)  # Wait to observe result (or validate dashboard)

finally:
    driver.quit()
