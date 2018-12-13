<?php get_header(); ?>

<section class="section-reviews">
	<div class="section-reviews__column">

		<?php while(have_posts()) {
    the_post(); 
    get_template_part('template-parts/content', 'review');
} ?>

	</div>

	<div class="section-reviews__column">

		<?php
$reviewsColumnTwoQuery = new WP_query(array(
'post_type' => 'review',
'category_name' => 'reviews_column_two',
'poste_per_page' => -1
));

while($reviewsColumnTwoQuery->have_posts()) {
    $reviewsColumnTwoQuery->the_post();
     get_template_part('template-parts/content', 'review');
} ?>

	</div>
</section>

<?php get_footer(); ?>