<?php get_header(); ?>

<section class="status-tracker">

	<?php
while(have_posts()) {
    the_post(); ?>

	<article class="status-tracker__post-content">
		<h1 class="status-tracker__project-title">
			<?php the_title();?>
		</h1>

		<?php the_content(); ?>

		<div class="status-tracker__progress-bar ldBar label-center" style="width:80%;height:20%" data-preset="line" data-stroke="<?php echo get_field('project_bar_color') ?>"
		 data-value="<?php echo get_field('project_status_%') ?>">
		</div>
		<div class="status-tracker__contributors-wrapper">
			<span class="status-tracker__contributors-headline">Contributors:</span>
			<?php
$relatedContributors = get_field('related_contributors');

if($relatedContributors) {

   foreach($relatedContributors as $contributor){        
?>

			<a class="status-tracker__related-contributor-link" href="<?php the_field('contributor_github', $contributor) ?>">
				<img class="status-tracker__related-contributor-img" src="<?php the_field('contributor_avatar', $contributor) ?>">
			</a>

			<?php }
} ?>

		</div>
	</article>

	<?php } ?>

</section>
<?php
get_footer();

