<article class="blog-post">
	<a class="blog-post__link" href="<?php the_permalink(); ?>">
		<h1 class="blog-post__title">
			<?php the_title(); ?>
		</h1>
    </a>
    
    <?php the_excerpt(); ?>
    
	<a class="blog-post__read-more" href="<?php the_permalink(); ?>">Read More&raquo;</a>
</article>