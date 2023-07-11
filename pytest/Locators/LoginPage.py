from selenium.webdriver.common.by import By

class Login_locators:
    user_inputs = (By.CSS_SELECTOR, ".q-field__native")[0]
    login_input = (By.XPATH, "//input[@aria-label='Email']")
    password_input = (By.XPATH, "//input[@aria-label='Password']")
    register_login_button = (By.XPATH, "//span[@class='block']")

    avatar_icon = (By.XPATH, "//div[@class='q-avatar text-white q-chip--colored']")
    logout_btn = (By.XPATH, "//*[text()='Logout']")
    
    login_error_message = (By.XPATH, "//div[@class='q-banner__content col text-body2']")