<?php $image = get_field('project_image'); ?>
<article class="section-projects__project project">
	<h1 class="project__title">
		<?php the_title();?>
	</h1>
	<div class="project__wrap-image" tabindex="0">
		<img class="project__image" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" title ="<?php echo $image['title']; ?>">
		<i class="project__icon fa fa-plus-circle"></i>
		<div class="project__wrap-text">
			<?php the_content(); ?>
		</div>
	</div>
	<a href="#" class="project__btn btn btn--red btn--project">Contribute Now</a>
</article>