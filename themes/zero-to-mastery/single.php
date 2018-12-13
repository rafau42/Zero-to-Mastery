<?php get_header(); ?>

<div class="blog-container">
	<section class="blog-content" id="blog-content">

		<?php
while(have_posts()) {
    the_post();
    get_template_part('template-parts/content', 'post');
} ?>

    </section>
    
    <?php get_sidebar(); ?>
    
</div>

<?php get_footer();?>

