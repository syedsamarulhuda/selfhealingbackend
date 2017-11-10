function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: false
    });
}

exports.responseStatus = {};
define(exports.responseStatus, "SHOW_DATA", 100);
define(exports.responseStatus, "PARAMETER_MISSING", 101);
define(exports.responseStatus, "SHOW_ERROR_MESSAGE", 101);
define(exports.responseStatus, "INVALID_ACCESS_TOKEN", 102);
define(exports.responseStatus, "USER_NAME_ALREADY_EXIST", 103);
define(exports.responseStatus, "SUCCESSFUL_ORDER_PACE", 104);
define(exports.responseStatus, "INVALID_JSON_STRUCTURE", 105);
define(exports.responseStatus, "UN_AUTHORIZED_ACCESS", 106);
define(exports.responseStatus, "FB_ID_NOT_EXISTS", 109);


GENERAL_ERROR_STATUS = 101;
GENERAL_ERROR_MSG = "Something went wrong";

USERNAME_EXISTS_ERROR_ID = 103;


TEXT_NO_ACTION = 100;

TEXT_ONE_ACTION = 200;

TEXT_TWO_ACTION = 300;

IMAGE_NO_ACTION = 400;

IMAGE_ONE_ACTION = 500;

IMAGE_TWO_ACTION = 600;

CAROUSAL_NON_ANIMATED = 700;

CAROUSAL_ANIMATED = 800;

RENT_DRESS = 900;

CANCEL_ORDER = 1000;


PN_TEXT_NO_ACTION = "text_no_action";

PN_TEXT_ONE_ACTION = "text_one_action";

PN_TEXT_TWO_ACTION = "text_two_action";

PN_IMAGE_NO_ACTION = "image_no_action";

PN_IMAGE_ONE_ACTION = "image_one_action";

PN_IMAGE_TWO_ACTION = "image_two_action";

PN_CANCEL_ORDER = "cancel_order";

PN_RENT_DRESS = "rent_dress";

PN_CAROUSAL_NON_ANIMATED = "carousal_non_animated";

PN_CAROUSAL_ANIMATED = "carousal_animated";
