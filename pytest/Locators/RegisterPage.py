from selenium.webdriver.common.by import By

class Register_locators:
    name_input = (By.XPATH, "//input[@aria-label='First name']")
    surname_input = (By.XPATH, "//input[@aria-label='Last name']")
    parentName_input = (By.XPATH, "//input[@aria-label='Parent name']")
    parentLastName_input = (By.XPATH, "//input[@aria-label='Parent last name']")
    email_input = (By.XPATH,"//input[@aria-label='Email']")
    parentEmail_input = (By.XPATH, "//input[@aria-label='Parent email address']")
    password_input = (By.XPATH,"//input[@aria-label='Password']")
    confirm_pass_inp = (By.XPATH,"//input[@aria-label='Password confirmation']")
    next_button = (By.XPATH, "//span[@class='block']")

    age_picker = (By.XPATH, "//span[normalize-space()='18']")
    who_am_i = (By.XPATH,"//span[normalize-space()='Fan']")
    who_am_i_player = (By.XPATH,"//span[normalize-space()='Player']")
    def role_picker_global(state): 
        return (By.XPATH, "//div[contains(@class,'q-item__label')]//span[contains(text(),'%s')]"% str(state))
    username_input = (By.XPATH, "//input[contains(@aria-label,'Username')]")
    phone_input = (By.XPATH, "//input[@aria-label='Phone']")
    next_fan_finish = (By.CSS_SELECTOR, ".q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-primary.text-white.q-btn--actionable.q-focusable.q-hoverable.q-btn--no-uppercase")

    # delete account
    del_account_btn = (By.XPATH, "//span[normalize-space()='Delete Account']")
    del_confirm_input = (By.XPATH, "//input[@aria-label='Password']")
    del_confirm_btn = (By.XPATH, "(//span[@class='block'][normalize-space()='Delete Account'])[2]")

    progress_filled = (By.XPATH, "//div[@class='c_progress__fill gradient']")
    avatar_img = (By.XPATH, "//div[@class='q-img q-img--menu header__avatarImage']")
    my_profile = (By.XPATH, "//i[normalize-space()='person_outline']")


    # General country
    country_edit = (By.XPATH, "(//i[contains(@role,'img')][normalize-space()='edit'])[4]")
    country_dropdown = (By.XPATH, "(//i[@role='presentation'][normalize-space()='arrow_drop_down'])[1]")
    country_select = (By.XPATH, "//span[normalize-space()='Anguilla']")
    province = (By.XPATH, "//input[@aria-label='Province']")
    address_line = (By.XPATH, "//input[@aria-label='Address line (Optional)']")
    zip_code = (By.XPATH, "//input[@aria-label='Zip code (Optional)']")
    save_country = (By.XPATH, "(//span[@class='block'][normalize-space()='Save'])[3]")

    # General education
    education_edit = (By.XPATH, "(//i[contains(@role,'img')][normalize-space()='edit'])[5]")
    education_institution_dropdown = (By.XPATH, "(//i[@role='presentation'][normalize-space()='arrow_drop_down'])[2]")
    institution_select = (By.XPATH, "//span[normalize-space()='High School']")
    current_school = (By.XPATH, "//input[@aria-label='Current school / university (Optional)']")
    current_club = (By.XPATH, "//input[@aria-label='Current club']")
    agent = (By.XPATH, "//input[@aria-label='Agent (Optional)']")
    save_education = (By.XPATH, "(//span[@class='block'][normalize-space()='Save'])[4]")

    # Details about
    about_edit = (By.XPATH, "(//i[contains(@role,'img')][normalize-space()='edit'])[1]")
    nationality_dropdown = (By.XPATH, "(//i[@role='presentation'][normalize-space()='arrow_drop_down'])[1]")
    nationality_select = (By.XPATH, "//span[normalize-space()='Anguillan']")
    gender_dropdown = (By.XPATH, "(//i[@role='presentation'][normalize-space()='arrow_drop_down'])[2]")
    gender_select = (By.XPATH, "//span[normalize-space()='Male']")
    calendar_picker = (By.XPATH, "//i[normalize-space()='event']")
    year_picker = (By.XPATH, "//span[contains(text(),'2003')]")
    year = (By.XPATH, "//span[contains(text(),'2000')]")
    year_apply = (By.XPATH, "//span[contains(text(),'Apply')]")
    height = (By.XPATH, "//input[@aria-label='Height']")
    weight = (By.XPATH, "//input[@aria-label='Weight']")
    description = (By.XPATH, "//textarea[@aria-label='Description (Optional)']")
    save_about = (By.XPATH, "(//span[@class='block'][normalize-space()='Save'])[1]")

    # Details position
    position_edit = (By.XPATH, "(//i[contains(@role,'img')][normalize-space()='edit'])[2]")
    pref_pos_dropdown = (By.XPATH, "(//i[contains(@role,'presentation')][normalize-space()='arrow_drop_down'])[3]")
    pref_pos_select = (By.XPATH, "//span[normalize-space()='Central Midfielder']")
    sec_pos_dropdown = (By.XPATH, "(//i[contains(@role,'presentation')][normalize-space()='arrow_drop_down'])[4]")
    sec_pos_select = (By.XPATH, "//span[normalize-space()='Centre Attacking Midfielder']")
    pref_foot_dropdown = (By.XPATH, "(//i[contains(@role,'presentation')][normalize-space()='arrow_drop_down'])[5]")
    pref_foot_select = (By.XPATH, "//span[normalize-space()='Right Footed']")
    save_position = (By.XPATH, "(//span[@class='block'][normalize-space()='Save'])[2]")

    # Upload profile photo
    edit_profile_photo = (By.XPATH, "(//i[@role='img'][normalize-space()='edit'])[2]")
    update_profile_photo = (By.XPATH, "//div[@class='q-item__section column q-item__section--main justify-center']")
    upload_input = (By.XPATH, "//input[@type='file']")
    upload_btn = (By.XPATH, "//button[@class='q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase']//span[@class='block'][normalize-space()='Upload']")

    # Upload Cover Photo
    edit_cover_photo = (By.XPATH, "(//i[@role='img'][normalize-space()='edit'])[1]")
    update_cover_photo = (By.XPATH, "//div[@class='q-item__section column q-item__section--main justify-center']")
    upload_input = (By.XPATH, "//input[@type='file']")
    upload_btn = (By.XPATH, "//button[@class='q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase']//span[@class='block'][normalize-space()='Upload']")

    # Photo Upload 
    photo_upload_btn = (By.XPATH, "(//span[contains(text(),'Upload')])[1]")
    upload_input = (By.XPATH, "//input[@type='file']")
    upload_btn_photo = (By.XPATH, "//button[@class='q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase']//span[@class='q-btn__content text-center col items-center q-anchor--skip justify-center row']")

    # Video Upload
    video_upload_btn = (By.XPATH, "(//span[@class='block'][normalize-space()='Upload'])[2]")
    upload_input = (By.XPATH, "//input[@type='file']")
    upload_ready_icon = (By.XPATH, "//i[normalize-space()='published_with_changes']")
    video_title_input = (By.XPATH, "//input[@aria-label='Title']")
    video_description_input = (By.XPATH, "//input[@aria-label='Title']")
    video_publish_btn = (By.XPATH, "//span[contains(text(),'Publish')]")





