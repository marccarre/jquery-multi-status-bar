describe("jQuery multi-status bar plugin", function () {

    beforeEach(function () {
        // Simple div with id=multiStatusBar
        loadFixtures("multistatusbar.html");
    });

    it("should show values for the provided categories with the provided colors in background", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("2");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*2);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*5);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHavePixelWidthOf(200/17*10);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#D5E5FF");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#FFFF84");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveBackgroundColorEqualTo("#00CC33");

        expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
    });

    it("should have a legend corresponding to the provided categories and colors", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > div > table > tbody").children().length).toEqual(3);

        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").text()).toEqual("NEW");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()).toEqual("IN PROGRESS");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()).toEqual("FINISHED");

        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#D5E5FF");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#FFFF84");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#00CC33");
    });

    it("should show the legend when user moves the mouse over the status bar, and should hide the legend when the mouse leaves the status bar", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > div").css("display")).toEqual("none");

        $("#multiStatusBar > table").mouseover();
        expect($("#multiStatusBar > div").css("display")).toEqual("block");

        $("#multiStatusBar > table").mouseleave();
        expect($("#multiStatusBar > div").css("display")).toEqual("none");
    });

    it("should show 'N/A' with a grey background by default", function () {
        $("#multiStatusBar").multistatusbar();

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(1);
        expect($("#multiStatusBar > table > tbody > tr:first-child").text()).toEqual("N/A");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHaveBackgroundColorEqualTo("#DDDDDD");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHavePixelWidthOf(200);
        expect($("#multiStatusBar").children("div").length).toEqual(0); // Legend should NOT be created at all.
    });

    it("should show 'N/A' with a grey background when the sum of values in the provided object is zero", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 0, "IN PROGRESS": 0, "FINISHED": 0},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(1);
        expect($("#multiStatusBar > table > tbody > tr:first-child").text()).toEqual("N/A");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHaveBackgroundColorEqualTo("#DDDDDD");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHavePixelWidthOf(200);
        expect($("#multiStatusBar").children("div").length).toEqual(0); // Legend should NOT be created at all.
    });

    it("should not show categories for which the value is zero", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 0, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(2);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/15*5);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/15*10);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#FFFF84");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#00CC33");
    });

    it("should not create any legend if configured accordingly", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"],
            showLegend: false
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("2");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*2);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*5);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHavePixelWidthOf(200/17*10);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#D5E5FF");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#FFFF84");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveBackgroundColorEqualTo("#00CC33");

        expect($("#multiStatusBar").children("div").length).toEqual(0); // Legend should NOT be created at all.
    });

    it("should not show values in the status bar if configured accordingly", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"],
            showValuesInBar: false
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveHtml("&nbsp;");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveHtml("&nbsp;");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveHtml("&nbsp;");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*2);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*5);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHavePixelWidthOf(200/17*10);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#D5E5FF");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#FFFF84");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveBackgroundColorEqualTo("#00CC33");

        expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
    });

    it("should show values in the legend if configured accordingly", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"],
            showValuesInLegend: true
        });

        expect($("#multiStatusBar > div > table > tbody").children().length).toEqual(3);

        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").text()).toEqual("NEW: 2/17");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()).toEqual("IN PROGRESS: 5/17");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()).toEqual("FINISHED: 10/17");

        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#D5E5FF");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#FFFF84");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#00CC33");
    });

    it("should be able to map an URL to each provided category, and clicking on the corresponding section of the status bar would open a new tab pointing to configured URL", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            urls: {"NEW": "http://github.com", "IN PROGRESS": "http://jquery.com", "FINISHED": "http://pivotal.github.com/jasmine"},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1) > a").text()).toEqual("2");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2) > a").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3) > a ").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1) > a").attr("href")).toEqual("http://github.com");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2) > a").attr("href")).toEqual("http://jquery.com");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3) > a").attr("href")).toEqual("http://pivotal.github.com/jasmine");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1) > a").attr("target")).toEqual("_blank");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2) > a").attr("target")).toEqual("_blank");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3) > a").attr("target")).toEqual("_blank");
    });

    it("should be able to map an URL to some categories, based on the category name, and regardless of missing URL for some other categories", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            urls: {"NEW": "http://github.com", "FINISHED": "http://pivotal.github.com/jasmine"},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1) > a").text()).toEqual("2");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3) > a ").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1) > a").attr("href")).toEqual("http://github.com");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2) > a").attr("href")).toEqual(undefined);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3) > a").attr("href")).toEqual("http://pivotal.github.com/jasmine");
    });

    it("should clean after itself when destroy() is called", function () {
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        // Un-bind widget:
        $("#multiStatusBar").multistatusbar("destroy");
        expect($("#multiStatusBar").children().length).toEqual(0);

        // Re-bind widget:
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("2");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*2);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*5);
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHavePixelWidthOf(200/17*10);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#D5E5FF");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#FFFF84");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveBackgroundColorEqualTo("#00CC33");

        expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
    });

    describe("should be able to automatically refresh the values of the status bar when an URL and a refresh frequency are provided:", function() {

        var request;

        beforeEach(function () {
            jasmine.Ajax.installJquery();
            jasmine.Ajax.useMock();

            $("#multiStatusBar").multistatusbar({
                colors: ["#D5E5FF", "#FFFF84", "#00CC33"],
                refreshUrl: "http://host:port/webservice/status",
                refreshFrequencyInMillis: 10
            });

            // Widget should currently be in default mode (showing 'N/A'):
            expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(1);
            expect($("#multiStatusBar > table > tbody > tr:first-child").text()).toEqual("N/A");
            expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHaveBackgroundColorEqualTo("#DDDDDD");
            expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHavePixelWidthOf(200);
            expect($("#multiStatusBar").children("div").length).toEqual(0); // Legend should NOT be created at all.

            // Ajax request should match what has been configured on the widget:
            request = mostRecentAjaxRequest();
            expect(request.url).toBe('http://host:port/webservice/status');
            expect(request.method).toBe('GET');
        });

        describe("on success, it should show signs of progress, e.g. jQuery multi-status bar plugin", function () {

            var state = {NEW: 2, IN_PROGRESS: 5, FINISHED: 10};

            beforeEach(function () {
                // Simulate progress:
                function updateStateAndSerializeToJson() {
                    if (state.NEW > 0) { --state.NEW; ++state.IN_PROGRESS };
                    if (state.NEW < 5 && state.IN_PROGRESS > 0) { --state.IN_PROGRESS; ++state.FINISHED };
                    return JSON.stringify({"NEW": state.NEW, "IN PROGRESS": state.IN_PROGRESS, "FINISHED": state.FINISHED});
                };

                // Return mock response:
                var response = updateStateAndSerializeToJson();
                request.response({
                    status: 200,
                    responseText: response
                });
            });

            it("should render latest values retrieved from remote web service, i.e. {'NEW':1,'IN PROGRESS':5,'FINISHED':11}", function() {
                expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("1");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("5");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").text()).toEqual("11");

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*1);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*5);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHavePixelWidthOf(200/17*11);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#D5E5FF");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#FFFF84");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveBackgroundColorEqualTo("#00CC33");

                expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
            });

            it("should render latest values retrieved from remote web service, i.e. {'NEW':0,'IN PROGRESS':5,'FINISHED':12}", function() {
                expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(2);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("5");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("12");

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*5);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*12);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#FFFF84");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#00CC33");

                expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
            });

            it("should render latest values retrieved from remote web service, i.e. {'NEW':0,'IN PROGRESS':4,'FINISHED':13}", function() {
                expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(2);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("4");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("13");

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*4);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*13);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#FFFF84");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#00CC33");

                expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
            });

            it("should render latest values retrieved from remote web service, i.e. {'NEW':0,'IN PROGRESS':3,'FINISHED':14}", function() {
                expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(2);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("3");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("14");

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*3);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*14);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#FFFF84");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#00CC33");

                expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
            });

            it("should render latest values retrieved from remote web service, i.e. {'NEW':0,'IN PROGRESS':2,'FINISHED':15}", function() {
                expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(2);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("2");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("15");

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*2);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*15);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#FFFF84");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#00CC33");

                expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
            });

            it("should render latest values retrieved from remote web service, i.e. {'NEW':0,'IN PROGRESS':1,'FINISHED':16}", function() {
                expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(2);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("1");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("16");

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*1);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*16);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#FFFF84");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#00CC33");

                expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
            });

            it("should render latest values retrieved from remote web service, i.e. {'NEW':0,'IN PROGRESS':0,'FINISHED':17}", function() {
                expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(1);

                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("17");
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200);
                expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#00CC33");

                expect($("#multiStatusBar").children("div").length).toEqual(1); // Legend should have been created.
            });
        });
    });

    describe("should still be configurable after creation", function () {
        beforeEach(function () {
            $("#multiStatusBar").multistatusbar({
                payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
                colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
            });
        });

        it("should be possible to update width", function () {
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(200/17*2);
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(200/17*5);
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHavePixelWidthOf(200/17*10);

            $("#multiStatusBar").multistatusbar('option', 'width', 300);

            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHavePixelWidthOf(300/17*2);
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHavePixelWidthOf(300/17*5);
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHavePixelWidthOf(300/17*10);
        });

        it("should be possible to update values", function () {
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("2");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("5");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").text()).toEqual("10");

            $("#multiStatusBar").multistatusbar('option', 'payload', {"NEW": 3, "IN PROGRESS": 6, "FINISHED": 11});

            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("3");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("6");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").text()).toEqual("11");
        });

        it("should be possible to update urls", function () {
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1) > a").attr("href")).toEqual(undefined);
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2) > a").attr("href")).toEqual(undefined);
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3) > a").attr("href")).toEqual(undefined);

            $("#multiStatusBar").multistatusbar('option', 'urls', {"NEW": "http://github.com", "FINISHED": "http://pivotal.github.com/jasmine"});

            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1) > a").attr("href")).toEqual("http://github.com");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2) > a").attr("href")).toEqual(undefined);
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3) > a").attr("href")).toEqual("http://pivotal.github.com/jasmine");
        });

        it("should be possible to update colors", function () {
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#D5E5FF");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#FFFF84");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveBackgroundColorEqualTo("#00CC33");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#D5E5FF");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#FFFF84");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#00CC33");

            $("#multiStatusBar").multistatusbar('option', 'colors', ["#FF0000", "#00FF00", "#0000FF"]);

            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveBackgroundColorEqualTo("#FF0000");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveBackgroundColorEqualTo("#00FF00");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveBackgroundColorEqualTo("#0000FF");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#FF0000");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#00FF00");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div")).toHaveBackgroundColorEqualTo("#0000FF");
        });

        it("should be possible to update visibility of the legend", function () {
            expect($("#multiStatusBar").children("div").length).toEqual(1);

            $("#multiStatusBar").multistatusbar('option', 'showLegend', false);

            expect($("#multiStatusBar").children("div").length).toEqual(0);
        });

        it("should be possible to update visibility of values in the legend", function () {
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").text()).toEqual("NEW");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()).toEqual("IN PROGRESS");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()).toEqual("FINISHED");

            $("#multiStatusBar").multistatusbar('option', 'showValuesInLegend', true);

            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").text()).toEqual("NEW: 2/17");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()).toEqual("IN PROGRESS: 5/17");
            expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()).toEqual("FINISHED: 10/17");
        });

        it("should be possible to update visibility of values in the bar", function () {
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveHtml("2");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveHtml("5");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveHtml("10");

            $("#multiStatusBar").multistatusbar('option', 'showValuesInBar', false);

            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)")).toHaveHtml("&nbsp;");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)")).toHaveHtml("&nbsp;");
            expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)")).toHaveHtml("&nbsp;");
        });
    });
});