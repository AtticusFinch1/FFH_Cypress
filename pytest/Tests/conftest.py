import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from Pages.LoginPage import LoginPage
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from Config.config import TestData
from pyvirtualdisplay import Display
import os


@pytest.fixture(autouse=True, scope='function')
def init_driver(request):
    options = Options()
    web_driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()))
    request.cls.driver = web_driver
    login_page = LoginPage(web_driver)
    login_page.do_login(os.getenv('LOGIN_PLAYER'), os.getenv('PASSWORD'))
    yield
    # login_page.do_logout()
    web_driver.quit()



""" display and --headless is used only for github actions """
# @pytest.fixture(autouse=True, scope='function')
# def init_driver(request):    
#     display = Display(visible=0, size=(800, 800))
#     display.start()
#     options = Options()
#     options.add_argument('--headless')
#     options.add_argument('--disable-gpu')
#     web_driver = webdriver.Chrome(
#         service=Service(ChromeDriverManager().install()), options=options)
#     request.cls.driver = web_driver
#     login_page = LoginPage(web_driver)
#     login_page.do_login(os.getenv('LOGIN_PLAYER'), os.getenv('PASSWORD'))
#     yield
#     # login_page.do_logout()
#     web_driver.quit()


""" 
Options for docker and selenium grid 
docker run -d -p 4444:4444 --shm-size=2g selenium/standalone-chrome:3.141.59-20210929
docker run -d -p 4444:4444 --shm-size=2g selenium/standalone-firefox:3.141.59-20210929
docker run -d -p 4444:4444 --shm-size=2g selenium/standalone-edge:3.141.59-20210929
"""
# @pytest.fixture(autouse=True,scope='class')
# def init_driver(request): 
#     web_driver = webdriver.Remote(
#         command_executor='http://127.0.0.1:4444/wd/hub',
#         desired_capabilities=DesiredCapabilities.CHROME)
#     request.cls.driver = web_driver
#     login_page = LoginPage(web_driver)
#     login_page.do_login(os.getenv('LOGIN_PLAYER'), os.getenv('PASSWORD'))
#     yield