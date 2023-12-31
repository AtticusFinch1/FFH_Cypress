const clubLocators = {
    avatarIcon                          : 'div[class="q-img q-img--menu header__avatarImage"]',
    notificationIcon                    : 'div[class="flex-shrink q-gutter-x-sm"] button:nth-child(2)',
    notificationBody                    : '.q-list.q-list--separator',
    // club create
    emailInput                          : 'input[aria-label="Email"]',
    passwordInput                       : 'input[aria-label="Password"]',
    clubTabsLong                        : '.q-tabs__content.scroll--mobile.row.no-wrap.items-center.self-stretch.hide-scrollbar.relative-position.q-tabs__content--align-left',
    clubTab                             : '.q-tab.relative-position.self-stretch.flex.flex-center.text-center.q-tab--active.text-primary.q-tab--no-caps.q-focusable.q-hoverable.cursor-pointer.q-router-link--exact-active.q-router-link--active.q-px-xl',
    clubLogoUpload                      : '.q-card.q-card--shadowed.photoUpload.full-width.absolute-fit.column.no-wrap',
    clubCreateButton                    : 'button[class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded bg-white text-white q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-ml-auto q-px-32 gradient"] span[class="q-btn__content text-center col items-center q-anchor--skip justify-center row"]',
    clubCreateName                      : 'input[aria-label="Club name"]',
    clubCreateTitle                     : '.text-subtitle1.text-weight-medium.ellipsis.ellipsis-2-lines.text-pre-wrap.text-break-all',
    clubCreateEmail                     : 'input[aria-label="Email"]',
    clubCreateFlag                      : '.phoneInput__flag',
    clubCreateOption                    : "div[role='option']",
    clubCreateErr                       : 'div[role="alert"]',
    clubCreatePhone                     : 'input[type="number"]',
    clubCountryCode                     : '.text-no-wrap.q-ml-xs',
    clubCreateSite                      : 'input[aria-label="Website (Optional)"]',
    clubCreateContent                   : '.q-editor__content',
    // club body
    clubPageTabs                        : '.q-tab.relative-position.self-stretch.flex.flex-center.text-center.q-tab--active.text-primary.q-tab--no-caps.q-focusable.q-hoverable.cursor-pointer.q-router-link--exact-active.q-router-link--active.q-px-xl',
    clubCard                            : '.clubBlock.block.text-color.text-no-underline',
    clubCardImage                       : 'img.q-img__image.q-img__image--with-transition.q-img__image--loaded',
    clubCardTitle                       : '.text-h6.text-weight-medium.full-width.ellipsis',
    clubCardFollowers                   : '.text-secondary.text-weight-regular.text-body2',
    clubFollowButton                    : 'button[type="button"] span[class="block"]',
    
    clubLimitOff                        : '.q-card.q-card--shadowed.full-width',
    clubChangePlan                      : '.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.q-btn--rounded.q-btn--actionable.q-focusable.q-hoverable.q-btn--no-uppercase.q-btn--gradient.gradient',
    clubSingleLogo                      : 'div[class="q-avatar bg-white q-pa-xs"] img[class="q-img__image q-img__image--with-transition q-img__image--loaded"]',
    
    clubSingleFollow                    : 'div[class="row q-gap-md"]',
    clubFollowText                      : 'div[class="row q-gap-md"]',
    clubFollowCount                     : '.row.q-gap-md.text-weight-medium',
    clubFollowLabel                     : '.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.q-btn--rounded.bg-white.text-primary.q-btn--actionable.q-focusable.q-hoverable.q-btn--no-uppercase',
    clubSocialLinks                     : '.row.items-start.q-gap-md.q-ml-auto.justify-end',
    clubSingleTabsWrapper               : '.q-tabs__content.scroll--mobile.row.no-wrap.items-center.self-stretch.hide-scrollbar.relative-position.q-tabs__content--align-left',
    clubPageTab                         : 'a[class="q-tab relative-position self-stretch flex flex-center text-center q-tab--active text-primary q-tab--no-caps q-focusable q-hoverable cursor-pointer q-router-link--exact-active q-router-link--active q-px-xl"] div[class="q-tab__label"]',
    clubTabs                            : '.q-tab__label',
    clubPlayersCardWrapper              : '.scrollable.row.q-gap-sm.full-width',
    clubPlayerCardSingle                : 'staff relative-position bg-white row no-wrap cursor-pointer rounded-12 bordered-light full-width q-pa-sm q-gap-sm staff--hoverable',
    clubEditSection                     : '.q-card__section.q-card__section--vert.column.q-pa-lg.q-gap-md',
    clubEditBtn                         : "a[class='q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle q-btn--rounded q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase q-btn--gradient gradient text-h6 text-weight-medium q-py-sm full-width'] span[class='block']",
    clubWaitModeration                  : 'span.text-weight-medium',
    clubDescription                     : 'div[class="q-card q-card--shadowed club__description"] div[class="q-card__section q-card__section--vert q-pa-lg"]',
    clubAddPlayersSection               : '.q-card.q-card--shadowed.club__staff',
    clubSectionTitle                    : '.row.items-center.q-mb-sm',
    clubAdminTitle                      : '.club__members > .q-card__section > .q-mb-sm',
    clubMembersSection                  : '.q-card.q-card--shadowed.club__members',
    playerSectionWrapper                : '.q-card__section.q-card__section--vert.q-pa-lg',
    clubNoResults                       : 'noResults column flex flex-center text-center full-width text-grey-6 text-h6 noResults--dense',
    clubPlayerAdd                       : 'span.text-underline.text-secondary.text-weight-medium.cursor-pointer',
    playerAddPopup                      : '.q-card.q-card--shadowed.reviewApply.full-width.q-pt-xl.q-pb-lg.q-px-xl',
    playerAddTitle                      : '.text-h5.text-weight-medium.text-center.q-mb-md.justify-center',
    playerAddBottom                     : '.q-card__section.q-card__section--vert.row.no-padding.q-mt-lg',
    playerAddInput                      : 'input[aria-label="Search by name or email address"]',
    playerAddSuggestion                 : 'div[class="q-card q-card--shadowed"] div[class="q-list"]',
    playerAddRow                        : '.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable',
    staffAddClose                       : 'button[class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round q-btn--actionable q-focusable q-hoverable q-btn--no-uppercase absolute-top-right q-ma-md"] i[role="img"]',
    staffPendingRow                     : '.text-weight-medium.row.items-center.q-gap-y-xs.q-gap-x-sm.full-width.no-wrap',
    staffPendingRowBottom               : 'span.text-lighten',
    adminAddSection                     : '.q-card.q-card--shadowed.club__members',
    adminLogo                           : 'div.q-img.q-img--menu.fit',
    adminName                           : 'span.q-mr-auto.ellipsis.full-width',

    teamCard                            : '.q-card__section.q-card__section--vert.profileCard__details.column.items-center.q-pa-lg',
    teamCardAvatar                      : 'q-avatar profileCard__avatar bg-light q-pa-xs',
    teamCardBottom                      : 'text-h6 text-weight-medium row items-center q-mt-md',


  };
  
  export default clubLocators