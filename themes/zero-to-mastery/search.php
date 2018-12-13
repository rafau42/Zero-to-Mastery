<?php get_header(); ?>

<div class="search-page">
	<div class="search-page__form-wrap">
		<?php get_search_form(); ?>
	</div>
	<div class="search-overlay__results">
		<div class="search-overlay__row row">

			<?php if (have_posts() && get_post_type() == 'post' ) { 
	get_template_part('template-parts/search-result', 'success'); 
	
} else {
      noResults('General information');
  } ?>


			<?php if (have_posts() && get_post_type() == 'resource' ) { 
    get_template_part('template-parts/search-result', 'success');

} else {
  noResults('Resources');
} ?>

			<?php if (have_posts() && get_post_type() == 'project' ) { 
    get_template_part('template-parts/search-result', 'success');

} else {
  noResults('Projects');
} ?>

		</div>
	</div>

</div>

<?php get_footer(); 