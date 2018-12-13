<form class="search-form" method="get" action="<?php echo esc_url(site_url('/')); ?>">
	<label class="search-form__label" for="s">Perform a New Search:</label>
	<div class="search-form__wrap">
		<input placeholder="What are you looking for?" class="search-form__placeholder" id="s" type="search" name="s" aria-label="Submit Search" aria-controls="search form" title="Submit search">
		<input class="search-form__submit" type="submit" value="Search">
	</div>
</form>