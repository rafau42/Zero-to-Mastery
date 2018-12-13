<?php $image = get_field('project_image'); ?>

<article class="project-single">
	<div class="project-single__image-wrap">
		<img class="project-single__image" src="<?php echo $image['url'] ?>" alt ="<?php echo $image['alt'] ?>" title="<?php echo $image['title'] ?>">

	</div>
	<div class="project-single__text">
		<h1 class="project-single__project-title">
			<?php the_title();?>
		</h1>
		<?php the_content(); ?>
		<div class="project-single__progress-bar ldBar label-center" style="width:80%;height:20%" data-preset="line" data-stroke="<?php echo get_field('project_bar_color') ?>"
		 data-value="<?php echo get_field('project_status_%') ?>">
		</div>

	</div>
	<div class="project-single__contributors-wrapper">
		<span class="project-single__contributors-headline">Contributors:</span>
		<?php
$relatedContributors = get_field('related_contributors');

if($relatedContributors) {

   foreach($relatedContributors as $contributor){        
?>

		<a class="project-single__related-contributor-link" href="<?php the_field('contributor_github', $contributor) ?>">
			<img class="project-single__related-contributor-img" src="<?php the_field('contributor_avatar', $contributor) ?>">
		</a>
		<?php
    }
} 
?>
	</div>
</article>