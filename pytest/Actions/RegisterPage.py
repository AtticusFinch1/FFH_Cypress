from Pages.BasePage import BasePage
from Config.config import TestData
from Storage.path import GetPath
from Locators.RegisterPage import Register_locators
from Actions.GeneralActions import generalActions
from selenium.webdriver.common.by import By
from dotenv import load_dotenv 
import os 
import requests
from time import sleep as s
import json

class ActionsPageRegister(BasePage):
    load_dotenv()

    def fill_fan_field(self, username, phone):
        self.do_send_keys(Register_locators.username_input, username)
        self.do_click(Register_locators.next_fan_finish)

    def visit_profile(self):
        BasePage.do_click(self, Register_locators.avatar_img)
        BasePage.do_click(self, Register_locators.my_profile)

    def fill_completeness_bar_profile(self):
        data = generalActions.fake_data()
        self.do_click(Register_locators.country_edit)
        self.do_click(Register_locators.country_dropdown)
        self.do_click(Register_locators.country_select)
        self.do_send_keys(Register_locators.province, data['fake_name'])
        self.do_send_keys(Register_locators.address_line, data['fake_address'][1:10])
        self.do_send_keys(Register_locators.zip_code, data['fake_name'])
        self.do_click(Register_locators.save_country)
        s(5)
        self.do_click(Register_locators.education_edit)
        self.do_click(Register_locators.education_institution_dropdown)
        self.do_click(Register_locators.institution_select)
        self.do_send_keys(Register_locators.current_school, data['company_name'])
        self.do_send_keys(Register_locators.current_club, data['company_name'])
        self.do_send_keys(Register_locators.agent, data['company_name'])
        self.do_click(Register_locators.save_education)
        s(5)
        self.driver.get(TestData.BASE_URL + "settings/details")
        self.do_click(Register_locators.about_edit)
        self.do_click(Register_locators.nationality_dropdown)
        self.do_click(Register_locators.nationality_select)
        self.do_click(Register_locators.gender_dropdown)
        self.do_click(Register_locators.gender_select)
        self.do_click(Register_locators.calendar_picker)
        self.do_click(Register_locators.year_picker)
        self.do_click(Register_locators.year)
        self.do_click(Register_locators.year_apply)
        self.do_send_keys(Register_locators.height, "180")
        self.do_send_keys(Register_locators.weight, "80")
        self.do_send_keys(Register_locators.description, data['company_name'])
        self.do_click(Register_locators.save_about)
        s(5)
        self.do_click(Register_locators.position_edit)
        self.do_click(Register_locators.pref_pos_dropdown)
        self.do_click(Register_locators.pref_pos_select)
        self.do_click(Register_locators.sec_pos_dropdown)
        self.do_click(Register_locators.sec_pos_select)
        self.do_click(Register_locators.pref_foot_dropdown)
        self.do_click(Register_locators.pref_foot_select)
        self.do_click(Register_locators.save_position)

    def fill_completeness_bar_avatar(self):
        self.do_click(Register_locators.edit_profile_photo)
        self.do_click(Register_locators.update_profile_photo)
        s(5) # while the element can not be visible
        waitless = self.driver.find_element(By.XPATH, "//input[@type='file']")
        s(5)
        waitless.send_keys(GetPath.file_example_global('avatar.jpg'))
        s(5)
        self.do_click(Register_locators.upload_btn)

    def fill_completeness_bar_cover(self):
        self.do_click(Register_locators.edit_cover_photo)
        self.do_click(Register_locators.update_cover_photo)
        s(5) # while the element can not be visible
        waitless = self.driver.find_element(By.XPATH, "//input[@type='file']")
        s(5)
        waitless.send_keys(GetPath.file_example_global('cover.jpg'))
        s(15)
        self.do_click(Register_locators.upload_btn)
    
    def fill_completeness_bar_photo(self):
        BasePage.do_click(self, Register_locators.photo_upload_btn)
        waitless = self.driver.find_element(By.XPATH, "//input[@type='file']")
        s(5)
        waitless.send_keys(GetPath.file_example_global('cover.jpg'))
        s(5)
        BasePage.do_click(self, Register_locators.upload_btn_photo)

    def fill_completeness_bar_video(self):
        BasePage.scroll_down(self, 1)
        BasePage.do_click(self, Register_locators.video_upload_btn)
        waitless = self.driver.find_element(By.XPATH, "//input[@type='file']")
        s(5)
        waitless.send_keys(GetPath.file_example_global('video.mp4'))
        s(15)
        BasePage.do_send_keys(self, Register_locators.video_title_input, "video title") 
        BasePage.do_send_keys(self, Register_locators.video_description_input, "video description")
        s(2)
        BasePage.do_click(self, Register_locators.video_publish_btn)


    
