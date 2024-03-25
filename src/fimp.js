/**
 * Fancy Inline Moderation Popup
 * @description A jQuery MyBB addon to make inline moderation tool modern and fancy
 * @author effone <effone@mybb.com>
 * @copyright MyBB Group https://mybb.group
 * @license MIT
 */

$(function () {
	if ($('form[action^=moderation]').length) { // Inline moderation exists
		$('body').append('<div id="fimp" class="control-group"><span></span></div>');
		var ica = $('input[id^=inlinemod]'),
			icc = $('form[action^=moderation]:first'),
			ict = '<button class="fimp" title="{t}" data-action="{v}">{l}</button>',
			ico = '<svg class="icon"><use href="jscripts/fimp/fimp.svg#{i}" /></svg>';

		// Build buttons
		icc.hide().find('option').each(function () {
			var iid = $(this).val().replace(/threads|posts/ig, "");
			$('#fimp').append(ict
				.replace('{t}', $(this).text())
				.replace('{v}', $(this).val())
				.replace('{l}', ico.replace('{i}', iid))
			);
		});

		var icf = function (x) {
			$('#fimp').find('span').text(x);
			if (x < 2) {
				$('.fimp[data-action=multimergeposts]').attr("disabled", true);
			} else {
				$('.fimp[data-action=multimergeposts]').removeAttr("disabled");
			}
			if (x > 0) {
				$('#fimp').fadeIn();
			} else {
				$('#fimp').fadeOut();
			};
		};

		// Decide and show/hide FIMP
		icf(ica.filter(':checked').length);

		ica.on('change', function () {
			icf(ica.filter(':checked').length);
		});

		$('.fimp').on('click', function () {
			icc.find('option[value="' + $(this).data('action') + '"]').attr('selected', 'selected').parents('form').trigger('submit');
			$('#fimp>span').html("<span class='loader'>");
		})

		$('#fimp>span').on('click', function () {
			inlineModeration.clearChecked();
			ica.trigger('change');
		})
	}
});