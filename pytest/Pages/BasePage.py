from subprocess import TimeoutExpired
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementNotVisibleException, StaleElementReferenceException, TimeoutException
import time
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from contextlib import contextmanager

from Config.config import TestData
class BasePage(TestData):
    load_dotenv()
    def __init__(self,driver):
        self.driver=driver

    def do_click(self,by_locator):
        try:
            element=WebDriverWait(self.driver, 20).until(
                    EC.visibility_of_element_located(by_locator)  
            )
            return element.click()
        except NoSuchElementException:
            print("No such element detected")

    def do_clear(self,by_locator):
        try:
            element=WebDriverWait(self.driver, 20).until(
                    EC.visibility_of_element_located(by_locator)
                )
            return element.clear()
        except NoSuchElementException:
            print("No such element detected")

    def do_send_keys(self,by_locator,text):
        try:
            element=WebDriverWait(self.driver, 40).until(
                    EC.visibility_of_element_located(by_locator)
                )
            return element.send_keys(text)
        except NoSuchElementException:
            print("No such element detected")

    def get_element_text(self,by_locator):
        element=WebDriverWait(self.driver,10).until(EC.visibility_of_element_located(by_locator))
        return element.text

    def is_visible(self,by_locator):
        try:
            element=WebDriverWait(self.driver,20).until(EC.visibility_of_element_located(by_locator))
            return bool(element)
        except ElementNotVisibleException:
            print("Element is not visible")

    def do_find_elements(self, by_locator):
        try:
            elements = WebDriverWait(self.driver, 20).until(EC.presence_of_all_elements_located(by_locator))
            return elements
        except ElementNotVisibleException:
            print("Element is not visible")


    def get_title(self,title):
        try:
            WebDriverWait(self.driver,10).until(EC.title_is(title))
            return self.driver.title
        except StaleElementReferenceException:
            print("Title is not detected")

    def do_get_text(self,by_locator):
        try:
            element=WebDriverWait(self.driver,10).until(EC.visibility_of_element_located(by_locator))
            return element.get_attribute("value")
        except ElementNotVisibleException:
            print("Element is not visible")

    def do_hover(self,by_locator):
        actions = ActionChains(self.driver)
        element=WebDriverWait(self.driver,10).until(EC.visibility_of_element_located(by_locator))
        actions.move_to_element(element).perform()
    
    def do_get_attribute(self, by_locator, attribute):
        try:
            element=WebDriverWait(self.driver, 20).until(
                    EC.visibility_of_element_located(by_locator))
            return element.get_attribute(attribute)
        except ElementNotVisibleException:
            print("Element is not visible")



    @contextmanager
    def wait_for_page_load(self, element, timeout=20):
        try:
            element_present = EC.presence_of_element_located(element)
            WebDriverWait(self.driver, timeout).until(element_present)
        except TimeoutException:
            print("Timeout waiting for page to load")

    def scroll_down(self, n):
        for i in range(0,n):
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)
        
