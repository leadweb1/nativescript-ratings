"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application = require("tns-core-modules/application");
var Dialogs = require("tns-core-modules/ui/dialogs");
var Utility = require("tns-core-modules/utils/utils");
var ApplicationSettings = require("tns-core-modules/application-settings");
var Ratings = (function () {
    function Ratings(configuration) {
        this.configuration = configuration;
        this.configuration.id = this.configuration.id ? this.configuration.id : "ratings-0";
        this.configuration.showNow = this.configuration.showNow ? this.configuration.showNow : false;
        this.configuration.showOnCount = this.configuration.showOnCount ? this.configuration.showOnCount : 5;
        this.configuration.agreeButtonText = this.configuration.agreeButtonText ? this.configuration.agreeButtonText : "Rate Now";
        this.configuration.remindButtonText = this.configuration.remindButtonText ? this.configuration.remindButtonText : "Remind Me Later";
        this.configuration.declineButtonText = this.configuration.declineButtonText ? this.configuration.declineButtonText : "No Thanks";
    }
    Ratings.prototype.init = function () {
        this.showCount = ApplicationSettings.getNumber(this.configuration.id, 0);
        this.showCount++;
        ApplicationSettings.setNumber(this.configuration.id, this.showCount);
    };
    Ratings.prototype.prompt = function () {
        var _this = this;
        if (!this.hasRated()) {
            if (this.configuration.showNow || this.showCount == this.configuration.showOnCount) {
                setTimeout(function () {
                    Dialogs.confirm({
                        title: _this.configuration.title,
                        message: _this.configuration.text,
                        okButtonText: _this.configuration.agreeButtonText,
                        cancelButtonText: _this.configuration.declineButtonText,
                        neutralButtonText: _this.configuration.remindButtonText
                    }).then(function (result) {
                        if (result == true) {
                            var appStore = "";
                            if (Application.android) {
                                var androidPackageName = _this.configuration.androidPackageId ? _this.configuration.androidPackageId : Application.android.packageName;
                                var uri = android.net.Uri.parse("market://details?id=" + androidPackageName);
                                var myAppLinkToMarket = new android.content.Intent(android.content.Intent.ACTION_VIEW, uri);
                                // Launch the PlayStore
                                Application.android.foregroundActivity.startActivity(myAppLinkToMarket);
                            }
                            else if (Application.ios) {
                                appStore = "itms-apps://itunes.apple.com/en/app/id" + _this.configuration.iTunesAppId;
                            }
                            Utility.openUrl(appStore);
                            //save has rated app
                            ApplicationSettings.setNumber('HAS_RATED_' + _this.configuration.id, 1);
                        }
                        else if (result == false) {
                            // Decline
                        }
                        else {
                            //Remind later
                            ApplicationSettings.setNumber(_this.configuration.id, 0);
                        }
                    });
                });
            }
        }
    };
    Ratings.prototype.hasRated = function () {
        var hasRated = false;
        if (ApplicationSettings.getNumber('HAS_RATED_' + this.configuration.id)) {
            hasRated = true;
        }
        return hasRated;
    };
    Ratings.prototype.reset = function () {
        ApplicationSettings.setNumber(this.configuration.id, 0);
    };
    return Ratings;
}());
exports.Ratings = Ratings;
