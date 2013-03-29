describe("jQuery multi-status bar plugin", function () {

    it("should show values for the provided categories with the provided colors in background", function () {
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
        $("#multiStatusBar").multistatusbar();

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(1);
        expect($("#multiStatusBar > table > tbody > tr:first-child").text()).toEqual("N/A");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHaveBackgroundColorEqualTo("#DDDDDD");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child")).toHavePixelWidthOf(200);
        expect($("#multiStatusBar").children("div").length).toEqual(0); // Legend should NOT be created at all.
    });

    it("should show 'N/A' with a grey background when the sum of values in the provided object is zero", function () {
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
        loadFixtures("multistatusbar.html");
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
});