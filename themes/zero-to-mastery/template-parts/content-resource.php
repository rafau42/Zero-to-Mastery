<article class="resources__post-content">
	<div class="resources__content-top">
		<h1 class="resources__post-title">
			<?php the_title(); ?>
    </h1>
    
    <?php get_template_part('template-parts/content', 'like'); ?>
    
</div>

 <?php the_content(); ?>

</article>