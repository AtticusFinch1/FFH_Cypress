import pytest
from Tests.test_base import BaseTest
from Pages.LoginPage import LoginPage
from Config.config import TestData
from Locators.LoginPage import Login_locators
import time
import os
from dotenv import load_dotenv

class Test_LoginPage(BaseTest):
    load_dotenv()
    @pytest.mark.parametrize('username, password, expected', 
    [
        # pytest.param('', '', TestData.LOGIN_PAGE_ERROR_MESSAGE),
        # pytest.param('', TestData.PASSWORD, TestData.LOGIN_PAGE_ERROR_MESSAGE),
        # pytest.param(TestData.PLAYER_USERNAME, '', TestData.LOGIN_PAGE_ERROR_MESSAGE),
        pytest.param('test', TestData.PASSWORD, TestData.LOGIN_PAGE_ERROR_MESSAGE),
        pytest.param(TestData.PLAYER_USERNAME, 'test', TestData.LOGIN_PAGE_ERROR_MESSAGE),
        pytest.param('test', 'test', TestData.LOGIN_PAGE_ERROR_MESSAGE),
    ])
    def test_invalid_login(self, username, password, expected):
        self.loginPage = LoginPage(self.driver)
        self.loginPage.do_login(username, password)
        assert self.loginPage.get_element_text(Login_locators.login_error_message) == expected

    def test_valid_login_fan(self):
        self.loginPage=LoginPage(self.driver)
        self.loginPage.do_login(os.getenv('LOGIN_FAN'), os.getenv('PASSWORD'))
    def test_valid_login_player(self):
        self.loginPage=LoginPage(self.driver)
        self.loginPage.do_login(os.getenv('LOGIN_PLAYER'), os.getenv('PASSWORD'))
