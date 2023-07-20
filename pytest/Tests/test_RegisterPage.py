from Tests.test_base import BaseTest
from Pages.RegisterPage import RegisterPage
from Pages.LoginPage import LoginPage
from Tests.conftest import TestData
from Pages.BasePage import BasePage
from Actions.GeneralActions import generalActions
from Actions.RegisterPage import ActionsPageRegister
from googleApi import GoogleApi
from time import sleep as s
import pytest
import requests
import time
import os

class Test_RegisterPage(BaseTest):
    # @pytest.mark.parametrize('age, role, expected', 
    # [
    #     pytest.param(21, 'Manager', '10'),
    #     # pytest.param(10, 'Player', '10'),
    #     # pytest.param(23, 'Coach', '10'),
    #     # pytest.param(16, 'Player', '10'),
    #     # pytest.param(22, 'CEO', '10'),
    #     # pytest.param(22, 'Agent', '10'),
    #     # pytest.param(10, 'Fan', '10')
    # ])
    # def test_valid_register_global(self, age, role, expected):
    #     self.registerPage = RegisterPage(self.driver)
    #     self.registerPage.select_role(age, role)
    #     if age < 13 and role == 'Player':
    #         parent_first_name = 'parent_first_name'
    #         last_name = 'parent_last_name'
    #         kid_first_name = parent_first_name + 'sKid'
    #         email = os.getenv("GOOGLE_MAIL")
    #         password = os.getenv("PASSWORD")
    #         self.registerPage.valid_register_parental(parent_first_name, last_name, kid_first_name, email, password)
    #     else:
    #         first_name = 'first_name'
    #         last_name = 'last_name'
    #         email = os.getenv("GOOGLE_MAIL")
    #         password = os.getenv("PASSWORD")
    #         self.registerPage.valid_register_general(first_name, last_name, email, password)
    #     googleapi = GoogleApi()
    #     service = googleapi.gmail_authenticate()
    #     results = googleapi.search_messages(service, "FootHunters")
    #     letter = googleapi.read_message(service, results[0])
    #     self.driver.get(letter)
    #     s(2)


    def test_fill_completeness_bar(self):
        self.registerPage = RegisterPage(self.driver)
        self.actionsPageRegister = ActionsPageRegister(self.driver)
        self.registerPage.select_role(20, 'Player')
        request = generalActions.create_new_email()
        first_name = request['first_name']
        last_name = request['last_name']
        email = request['email']
        password = os.getenv("PASSWORD")
        self.registerPage.valid_register_general( first_name, last_name, email, password )
        inbox = generalActions.get_inbox()
        self.driver.get(inbox[0])
        # time.sleep(10)
        # result1 = self.registerPage.fill_completeness_bar_profile()
        # assert result1['progress_initial'] == 'width: 16.6667%;' and result1['progress_second'] == 'width: 33.3333%;'
        # s(2)
        # result2 = self.registerPage.upload_fill_complit_bar(self.actionsPageRegister.fill_completeness_bar_avatar)
        # assert result2['progress_global'] == 'width: 33.3333%;'
        # s(2)
        # result3 = self.registerPage.upload_fill_complit_bar(self.actionsPageRegister.fill_completeness_bar_cover)
        # assert result3['progress_global'] == 'width: 50%;'
        # s(2)
        # result4 = self.registerPage.upload_fill_complit_bar(self.actionsPageRegister.fill_completeness_bar_photo)
        # assert result4['progress_global'] == 'width: 66.6667%;'
        # s(2)
        # result5 = self.registerPage.upload_fill_complit_bar(self.actionsPageRegister.fill_completeness_bar_video)
        # assert result5['progress_global'] == 'width: 100%'