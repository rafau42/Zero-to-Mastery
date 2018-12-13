<?php $waypointsId = get_field('waypoints_resources');

if ($waypointsId)  {
$resourceId = $waypointsId;
}
else {
    $resourceId = get_the_ID();
}
?>

<h1 class="resources__headline" id="<?php echo $resourceId ?>">
	<?php the_title(); ?>
</h1>

<?php
$relatedResources = get_field('related_resources');

if ($relatedResources) {

foreach($relatedResources as $resource) { ?>

<article class="resources__post-content">
	<div class="resources__content-top">
		
		<h1 class="resources__post-title">
			<?php echo get_the_title($resource);?>
		</h1>

		<?php get_template_part('template-parts/content', 'like'); ?>

</div>

<?php echo get_post_field('post_content', $resource); ?>

</article>

<?php } } ?>