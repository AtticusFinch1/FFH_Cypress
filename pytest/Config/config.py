import os
from selenium.webdriver.chrome.service import Service
from dotenv import load_dotenv

class TestData:
    load_dotenv()
    s = Service(os.path.join(os.path.dirname(__file__), '..', 'Drivers', os.getenv("APP_PATH")))
    
    BASE_URL = (os.getenv('BASE_URL'))
    BASE_URL_REGISTER = (os.getenv('BASE_URL_REGISTER'))
    BASE_URL_LOGIN = (os.getenv('BASE_URL_LOGIN'))
    AVATARS_PATH = (os.getenv('AVATARS_PATH'))
    FILE_PATH = (os.getenv('FILE_PATH'))

    USERNAME_PLAYER = os.getenv("USERNAME_PLAYER")
    PLAYER = os.getenv("PLAYER")
    USERNAME_FAN = os.getenv('FAN_USERNAME')
    PLAYER_USERNAME = os.getenv("PLAYER_USERNAME")
    PASSWORD = os.getenv("PASSWORD")
    PASSWORD_ADMIN = os.getenv("PASSWORD_ADMIN")

    LOGIN_ADMIN=os.getenv("LOGIN_ADMIN")
    LOGIN_MODERATOR=os.getenv("LOGIN_MODERATOR")

    PASSWORD=os.getenv("PASSWORD")

    LOGIN_PAGE_ERROR_MESSAGE = "Invalid email or password."
    TEST_MESSAGE = "Test Message"


    HOME_PAGE_TITLE = "Website for soccer players, agents and fans | FootHunters"

