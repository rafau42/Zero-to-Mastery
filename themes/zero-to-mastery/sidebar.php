<aside id="sidebar" class="sidebar" role="complementary">

	<section class="widget-resources">

		<h1 class="widget-resources__headline">Featured Page:
			<a class="widget-resources__link" href="<?php echo get_page_link(85); ?>">Resources</a>
		</h1>
		<img class="widget-resources__image" src="<?php echo get_the_post_thumbnail_url(85); ?>"  alt = "developer" title ="developer">
		<h2 class="widget-resources__headline">Random Resource:</h2>

		<?php
$randomResourcesQuery = new WP_query(array(
	'post_type' => 'resource',
	'posts_per_page' => '1',
	'category_name' => 'avaiable_in_sidebar',
 'orderby' => 'rand'
));

while($randomResourcesQuery->have_posts()) {
	$randomResourcesQuery->the_post(); ?>

		<article class="widget-resources__post-resource">
			<?php the_content(); ?>
		</article>

		<?php } ?>

	</section>

</aside>