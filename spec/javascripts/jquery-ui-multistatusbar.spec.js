describe("jQuery multi-status bar plugin", function () {

    it("should show values for the provided categories with the provided colors in background.", function () {
        loadFixtures("multistatusbar.html");
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(3);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("2");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").css('background-color')).toBeColor("#D5E5FF");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").css('background-color')).toBeColor("#FFFF84");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(3)").css('background-color')).toBeColor("#00CC33");
    });

    it("should have a legend corresponding to the provided categories and colors.", function () {
        loadFixtures("multistatusbar.html");
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > div > table > tbody").children().length).toEqual(3);

        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").text()).toEqual("NEW");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text()).toEqual("IN PROGRESS");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(2)").text()).toEqual("FINISHED");

        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div").css('background-color')).toBeColor("#D5E5FF");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div").css('background-color')).toBeColor("#FFFF84");
        expect($("#multiStatusBar > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div").css('background-color')).toBeColor("#00CC33");
    });

    it("should show the legend when user moves the mouse over the status bar, and should hide the legend when the mouse leaves the status bar.", function () {
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

    it("should show 'N/A' with a grey background by default.", function () {
        loadFixtures("multistatusbar.html");
        $("#multiStatusBar").multistatusbar();

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(1);
        expect($("#multiStatusBar > table > tbody > tr:first-child").text()).toEqual("N/A");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child").css('background-color')).toBeColor("#DDDDDD");
        expect($("#multiStatusBar").children("div").length).toEqual(0); // Legend should be created at all.
    });

    it("should show 'N/A' with a grey background when the sum of values in the provided object is zero.", function () {
        loadFixtures("multistatusbar.html");
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 0, "IN PROGRESS": 0, "FINISHED": 0},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(1);
        expect($("#multiStatusBar > table > tbody > tr:first-child").text()).toEqual("N/A");
        expect($("#multiStatusBar > table > tbody > tr > td:first-child").css('background-color')).toBeColor("#DDDDDD");
        expect($("#multiStatusBar").children("div").length).toEqual(0); // Legend should be created at all.
    });

    it("should not show categories for which the value is zero.", function () {
        loadFixtures("multistatusbar.html");
        $("#multiStatusBar").multistatusbar({
            payload: {"NEW": 0, "IN PROGRESS": 5, "FINISHED": 10},
            colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
        });

        expect($("#multiStatusBar > table > tbody > tr").children().length).toEqual(2);

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").text()).toEqual("5");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").text()).toEqual("10");

        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(1)").css('background-color')).toBeColor("#FFFF84");
        expect($("#multiStatusBar > table > tbody > tr > td:nth-child(2)").css('background-color')).toBeColor("#00CC33");
    });
});