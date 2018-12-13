<?php get_header(); ?>

<section class="resources">

	<?php while(have_posts()) {
    the_post(); 
    get_template_part('template-parts/content', 'resource');
} ?>

</section>

<?php get_footer(); ?>
