/*
NAME: Ali Sattar Jabbar Qattan, UMass Lowell Computer Science, ali_qattan@student.uml.edu
DATE: 06/16/2024 
GUI Assignment: Creating Your First Web Page 
Copyright (c) 2024 by Qattan.  All rights reserved.  May be freely copied or excerpted for 
educational purposes with credit to the author.
updated by aLI June 16th
*/
$(document).ready(function() {
    // Initialize tabs
    $("#tabs").tabs();

    function syncSliderAndInput(slider, input) {
        $(slider).slider({
            min: -50,
            max: 50,
            slide: function(event, ui) {
                $(input).val(ui.value).trigger('input');
            }
        });

        $(input).on('input', function() {
            $(slider).slider('value', this.value);
        });

        // Initialize slider value
        $(slider).slider('value', $(input).val());
    }

    function generateTable(startRows, endRows, startColumn, endColumn) {
        const table = $('<table></table>');
        const headerRow = $('<tr></tr>');
        const emptyHeader = $('<th></th>');
        headerRow.append(emptyHeader);
        
        for (let i = startRows; i <= endRows; i++) {
            const th = $('<th></th>').text(i);
            headerRow.append(th);
        }
        table.append(headerRow);

        for (let i = startColumn; i <= endColumn; i++) {
            const tr = $('<tr></tr>');
            const rowHeader = $('<th></th>').text(i);
            tr.append(rowHeader);

            for (let j = startRows; j <= endRows; j++) {
                const td = $('<td></td>').text(i * j);
                tr.append(td);
            }
            table.append(tr);
        }

        return table;
    }

    function addTab(label, table) {
        const tabId = "tab-" + Date.now(); // Generate unique tab id
        $("#tabs ul").append(`<li><a href="#${tabId}">${label}</a><span class="ui-icon ui-icon-close" role="presentation"></span></li>`);
        $("#tabs").append(`<div id="${tabId}"></div>`);
        $(`#${tabId}`).append(table);
        $("#tabs").tabs("refresh");
        $("#tabs").tabs("option", "active", -1); // Switch to the newly added tab
    }

    // Generate table on form submission
    $('#tableForm').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate the form
        if ($(this).valid()) {
            const startRows = parseInt($('#startRows').val());
            const endRows = parseInt($('#endRows').val());
            const startColumn = parseInt($('#startColumn').val());
            const endColumn = parseInt($('#endColumn').val());

            if (startRows <= endRows && startColumn <= endColumn) {
                $('#error').text('');
                const table = generateTable(startRows, endRows, startColumn, endColumn);
                const label = `(${startRows}, ${endRows}, ${startColumn}, ${endColumn})`;
                addTab(label, table);
            } else {
                $('#error').text('Start values must be less than or equal to end values.');
            }
        }
    });

    // Delete individual tab
    $("#tabs").on("click", "span.ui-icon-close", function() {
        const panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        $("#tabs").tabs("refresh");
    });

    // Delete all tabs
    $('#deleteAllTabs').on('click', function() {
        $("#tabs ul li").each(function(index) {
            const panelId = $(this).remove().attr("aria-controls");
            $("#" + panelId).remove();
        });
        $("#tabs").tabs("refresh");
    });

    // Initialize sliders
    syncSliderAndInput('#sliderStartRows', '#startRows');
    syncSliderAndInput('#sliderEndRows', '#endRows');
    syncSliderAndInput('#sliderStartColumn', '#startColumn');
    syncSliderAndInput('#sliderEndColumn', '#endColumn');

    // Initialize jQuery Validation Plugin
    $('#tableForm').validate({
        rules: {
            startRows: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            endRows: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            startColumn: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            endColumn: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        messages: {
            startRows: {
                required: "Please enter a starting number for the rows.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            },
            endRows: {
                required: "Please enter an ending number for the rows.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            },
            startColumn: {
                required: "Please enter a starting number for the columns.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            },
            endColumn: {
                required: "Please enter an ending number for the columns.",
                number: "Please enter a valid number.",
                range: "Please enter a number between -50 and 50."
            }
        },
        invalidHandler: function(event, validator) {
            $('#error').text('Please correct the errors and try again.');
        }
    });
});
