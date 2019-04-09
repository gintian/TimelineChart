(function ($) {
    $.fn.timeline = function (options) {

        let settings = $.extend({
            data: [],
            classes: null,
            config: {
                showToday: false
            },
            labels: false
        }, options);

        const PRIVATE = {};

        PRIVATE.containerSelector = null;
        PRIVATE.minDate = null;
        PRIVATE.maxDate = null;
        PRIVATE.curDate = null;

        PRIVATE.setLabels = function () {
            if (settings.labels) {
                $('<input type="checkbox" id="toggle-labels" value="0" />').insertBefore(PRIVATE.containerSelector);
                $('<label for="toggle-labels" id="toggle-labels-lbl">Toggle labels</label>').
                    insertBefore('#toggle-labels');
            } else {
                $('#toggle-labels, #toggle-labels-lbl').remove();
            }
        };

        PRIVATE.setConfig = function (config) {
            Object.keys(config).forEach(function (key, index) {
                settings.config.key = config.key;
            });
        };

        PRIVATE.getDateBoundaries = function () {
            PRIVATE.maxDate = new Date('1970-01-01');
            PRIVATE.minDate = new Date('2038-01-19');
            for (let i = 0; i < settings.data.length; i++) {
                for (let j = 0; j < settings.data[i].single.length; j++) {
                    PRIVATE.curDate = new Date(settings.data[i].single[j].date);
                    if (PRIVATE.curDate < PRIVATE.minDate) {
                        PRIVATE.minDate = PRIVATE.curDate;
                    }
                    if (PRIVATE.curDate > PRIVATE.maxDate) {
                        PRIVATE.maxDate = PRIVATE.curDate;
                    }
                }
                for (let j = 0; j < settings.data[i].range.length; j++) {
                    PRIVATE.curDate = new Date(settings.data[i].range[j].start);
                    if (PRIVATE.curDate < PRIVATE.minDate) {
                        PRIVATE.minDate = PRIVATE.curDate;
                    }
                    if (PRIVATE.curDate > PRIVATE.maxDate) {
                        PRIVATE.maxDate = PRIVATE.curDate;
                    }
                    PRIVATE.curDate = new Date(settings.data[i].range[j].end);
                    if (PRIVATE.curDate < PRIVATE.minDate) {
                        PRIVATE.minDate = PRIVATE.curDate;
                    }
                    if (PRIVATE.curDate > PRIVATE.maxDate) {
                        PRIVATE.maxDate = PRIVATE.curDate;
                    }
                }
            }
            PRIVATE.maxDate = new Date(PRIVATE.maxDate.getUTCFullYear() + '-12-31');
            PRIVATE.minDate = new Date(PRIVATE.minDate.getUTCFullYear() + '-01-01');
        };

        PRIVATE.createLayout = function () {
            $(PRIVATE.containerSelector).append(PRIVATE.createLayoutHTML);
        };

        PRIVATE.createLayoutHTML = function () {
            return '' +
                '<div class="row no-gutter">' +
                '<div class="col-xs-2"></div>' +
                '<div class="col-xs-10 timeline-container-header"></div>' +
                '</div>';
        };

        PRIVATE.createHeader = function () {
            let startYear = PRIVATE.minDate.getUTCFullYear();
            let endYear = PRIVATE.maxDate.getUTCFullYear();
            let containeWidth = $(
                PRIVATE.containerSelector + ' .timeline-container-header').
                width();
            let yearWidth = containeWidth / (endYear - startYear + 1);
            let quarterWidth = yearWidth / 4;
            let monthWidth = yearWidth / 12;
            let html = '<table class="timeline-header">';
            html += '<tr>';
            for (let i = startYear; i <= endYear; i++) {
                html += '<td width="' + yearWidth + '" colspan="12">' + i +
                    '</td>';
            }
            html += '</tr>';
            html += '<tr>';
            if (endYear - startYear <= 10) {
                for (let i = startYear; i <= endYear; i++) {
                    let startQuarter = 1;
                    let endQuarter = 4;
                    for (let j = startQuarter; j <= endQuarter; j++) {
                        html += '<td width="' + quarterWidth +
                            '" colspan="3">Q' + j + '</td>';
                    }
                }
                html += '</tr>';
            }
            if (endYear - startYear <= 3) {
                html += '<tr>';
                for (let i = startYear; i <= endYear; i++) {
                    let startMonth = 1;
                    let endMonth = 12;
                    for (let j = startMonth; j <= endMonth; j++) {
                        html += '<td width="' + monthWidth + '">' + j + '</td>';
                    }
                }
                html += '</tr>';
                html += '</table>';
            }
            $(PRIVATE.containerSelector + ' .timeline-container-header').
                append(html);
        };

        PRIVATE.createSwimlanes = function () {
            for (let i = 0; i < settings.data.length; i++) {
                let html = '<div class="row no-gutter" id="swimlane_' + i +
                    '">';
                html += '<div class="col-xs-2 swimlane-title" style="background-color: ' +
                    settings.data[i].color +
                    ';height:' + settings.data[i].height + 'px">';
                html += settings.data[i].title;
                html += '</div>';
                html += '<div class="col-xs-10 swimlane-content" style="height:' +
                    settings.data[i].height + 'px">';
                html += '</div>';
                html += '</div>';
                $(PRIVATE.containerSelector).append(html);
            }
        };

        PRIVATE.populateSwimlanes = function () {
            let minDateTs = PRIVATE.getTimestamp(PRIVATE.minDate);
            let maxDateTs = PRIVATE.getTimestamp(PRIVATE.maxDate);
            for (let i = 0; i < settings.data.length; i++) {
                let swimlane = $('#swimlane_' + i + ' .swimlane-content');
                let swimlaneWidth = swimlane.width();
                let swimlaneHeight = swimlane.height();
                let top = Math.round(settings.data[i].height / 2);
                for (let j = 0; j < settings.data[i].single.length; j++) {
                    top += 30;
                    if (top > settings.data[i].height - 20) {
                        top = Math.round(settings.data[i].height / 2);
                    }
                    PRIVATE.curDate = new Date(settings.data[i].single[j].date);
                    let curDateTs = PRIVATE.getTimestamp(PRIVATE.curDate);
                    let positionPercent = (curDateTs - minDateTs) /
                        (maxDateTs - minDateTs);
                    let positionPixel = Math.round(
                        swimlaneWidth * positionPercent);
                    let html = '<div class="swimlane-item-single"' +
                        ' style="left:' + positionPixel + 'px;top:' + top +
                        'px;">';
                    html += '</div>';
                    html = $(html);
                    let cls = settings.classes[settings.data[i].single[j].class];
                    html.css('width', cls.width + 'px');
                    html.css('height', cls.height + 'px');
                    html.css('background-image', 'url(' + cls.image + ')');
                    swimlane.append(html);
                }
                top = 0;
                for (let j = 0; j < settings.data[i].range.length; j++) {
                    top += 30;
                    if (top > settings.data[i].height / 2) {
                        top = 0;
                    }
                    let curStartDate = new Date(
                        settings.data[i].range[j].start);
                    let curEndDate = new Date(settings.data[i].range[j].end);
                    let curStartDateTs = PRIVATE.getTimestamp(curStartDate);
                    let curEndDateTs = PRIVATE.getTimestamp(curEndDate);
                    let positionPercentStart = (curStartDateTs - minDateTs) /
                        (maxDateTs - minDateTs);
                    let positionPercentEnd = (curEndDateTs - minDateTs) /
                        (maxDateTs - minDateTs);
                    let positionPixelStart = Math.round(
                        swimlaneWidth * positionPercentStart);
                    let positionPixelEnd = Math.round(
                        swimlaneWidth * positionPercentEnd);
                    let width = positionPixelEnd - positionPixelStart;
                    let cls = settings.classes[settings.data[i].range[j].class];
                    let html = '<div class="swimlane-item-single" style="left:' + positionPixelStart + 'px;width:' +
                        width + 'px;top:' +
                        top + 'px;height:' + cls.patternHeight + 'px;">';
                    if (width > 30) {
                        html += '<div style="display: inline-block;height: ' + cls.beforeHeight + 'px;width: ' +
                            cls.beforeWidth +
                            'px;background-image: url(' + cls.before +
                            ')"></div>';
                        html += '<div style="display: inline-block;height: ' + cls.patternHeight + 'px;width: ' +
                            (width - 30) +
                            'px;background-image: url(' + cls.pattern +
                            ')"></div>';
                        html += '<div style="display: inline-block;height: ' + cls.afterHeight + 'px;width: ' +
                            cls.afterWidth +
                            'px;background-image: url(' + cls.after +
                            ')"></div>';
                        html += '</div>';
                    } else {
                        html += '<div style="display: inline-block;height: ' + cls.patternHeight + 'px;width: ' +
                            width +
                            'px;background-image: url(' + cls.pattern +
                            ')"></div>';
                    }
                    swimlane.append(html);
                }
            }
            PRIVATE.dragMe();
        };

        PRIVATE.showToday = function () {
            let today = '<div class="today"></div>';
            today = $(today);
            let todayHeight = 0;
            let swimlaneContent = $('.swimlane-content');
            swimlaneContent.each(function () {
                todayHeight += $(this).outerHeight();
            });
            today.css('height', todayHeight + 'px');
            today.css('top', $('.timeline-container-header').height() + 'px');
            let minDateTs = PRIVATE.getTimestamp(PRIVATE.minDate);
            let maxDateTs = PRIVATE.getTimestamp(PRIVATE.maxDate);
            let todayTs = PRIVATE.getTimestamp(new Date());
            let swimlaneWidth = swimlaneContent.width();
            let swimlaneTitleWidth = $('.swimlane-title').outerWidth();
            let positionPercent = (todayTs - minDateTs) /
                (maxDateTs - minDateTs);
            let positionPixel = Math.round(swimlaneWidth * positionPercent) +
                swimlaneTitleWidth;
            today.css('left', positionPixel + 'px');
            $(PRIVATE.containerSelector).css('position', 'relative');
            $(PRIVATE.containerSelector).append(today);
        };

        PRIVATE.getTimestamp = function (date) {
            return Math.round(date.getTime() / 1000);
        };

        PRIVATE.dragMe = function () {
            let startPosition = null;
            $('.swimlane-item-single').draggable({
                start: function (e, ui) {
                    startPosition = $(e.target).position();
                },
                stop: function (e, ui) {
                    let stopPosition = $(e.target).position();
                    $(e.target).css('left', startPosition.left);
                    let swimlaneHeight = $(e.target).
                        closest('.swimlane-content').
                        height();
                    let itemHeight = $(e.target).height();
                    if (stopPosition.top < 0) {
                        $(e.target).css('top', 0);
                    }
                    if (stopPosition.top > swimlaneHeight - itemHeight) {
                        $(e.target).css('top', swimlaneHeight - itemHeight);
                    }
                }
            });
        };

        PRIVATE.render = function () {
            PRIVATE.createLayout();
            PRIVATE.createHeader();
            PRIVATE.createSwimlanes();
            PRIVATE.populateSwimlanes();
            PRIVATE.showToday();
        };

        PRIVATE.createChart = function () {
            PRIVATE.setConfig(settings.config);
            PRIVATE.getDateBoundaries();
            PRIVATE.render();
        };

        return this.each(function () {
            PRIVATE.containerSelector = '#' + this.id;
            PRIVATE.createChart();
            PRIVATE.setLabels();
        });
    };
}(jQuery));