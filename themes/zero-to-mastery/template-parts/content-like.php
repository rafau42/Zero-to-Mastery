<?php

$likeCount = new WP_Query(array(
  'post_type' => 'like',
  'meta_query' => array(
    array(
      'key' => 'liked_resource_id',
      'compare' => '=',
      'value' => get_the_ID()
    )
  )
));

$existStatus = 'no';

if (is_user_logged_in()) {
  $existQuery = new WP_Query(array(
    'author' => get_current_user_id(),
    'post_type' => 'like',
    'meta_query' => array(
      array(
        'key' => 'liked_resource_id',
        'compare' => '=',
        'value' => get_the_ID()
      )
    )
  ));

  if ($existQuery->found_posts) {
    $existStatus = 'yes';
  }
}
?>

		<div class="resource__like-box like-box" data-like="<?php echo $existQuery->posts[0]->ID; ?>"
		 data-resource="<?php the_ID(); ?>" data-exists="<?php echo $existStatus; ?>">
			<i class="like-box__icon fa fa-heart-o" aria-hidden="true"></i>
			<i class="like-box__icon fa fa-heart" aria-hidden="true"></i>
			<span class="like-box__like-count">
				<?php echo $likeCount->found_posts; ?>
			</span>
			<div class="like-box__error">
				<span>Only logged users can like post</span>
			</div>
		</div>
