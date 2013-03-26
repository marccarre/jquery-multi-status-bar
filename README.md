jquery-multi-status-bar
=======================

The ideal bar to monitor the status of multiple objects.

(Originally hosted at: http://code.google.com/p/jquery-multi-status-bar/)

----

**Current features**:
- Shows values for the provided categories with the provided colors in background.
- Fails gracefully by showing 'N/A' with a grey background if:
  - no object is provided;
  - the sum of values in the provided object is zero.
- Does not show categories for which the value is zero.
- Option to show/hide the legend.
- Option to show/hide values in the status bar.
- Option to show/hide values in the legend.

----

**Backlog**:
- Add URLs to have click-able sections on the bar
- Add 'cursor: pointer;' when events or URLs are present
- Add periodical update via function pointer passed
- Option to set the frequency of the update
- Add ability to hook events
- Harmonize width differences caused by ceiling/rounding errors
- Option to automatically pick colors with a good contrast for the text
- Option to set the min width of the bar