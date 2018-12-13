<?php

add_action('rest_api_init', 'likeRoutes');

function likeRoutes() {
  register_rest_route('rest_route', 'manageLike', array(
    'methods' => 'POST',
    'callback' => 'createLike'
  ));

  register_rest_route('rest_route', 'manageLike', array(
    'methods' => 'DELETE',
    'callback' => 'deleteLike'
  ));
}

function createLike($data) {
  if (is_user_logged_in()) {
    $resource = sanitize_text_field($data['resourceId']);
    $data['error'] = false;

    $existQuery = new WP_Query(array(
      'author' => get_current_user_id(),
      'post_type' => 'like',
      'meta_query' => array(
        array(
          'key' => 'liked_resource_id',
          'compare' => '=',
          'value' => $resource
        )
      )
    ));

    if ($existQuery->found_posts == 0 AND get_post_type($resource) == 'resource_category') {
      return wp_insert_post(array(
        'post_type' => 'like',
        'post_status' => 'publish',
        'post_title' => '2nd PHP Test',
        'meta_input' => array(
          'liked_resource_id' => $resource
        )
      ));
    } else {
      die("Invalid resource id");
    }

    
  } else {
$data['error'] = true;
    return $error;
    die("Only logged in users can create a like.");
  
  }

  
}

function deleteLike($data) {
  $likeId = sanitize_text_field($data['like']);
  if (get_current_user_id() == get_post_field('post_author', $likeId) AND get_post_type($likeId) == 'like') {
    wp_delete_post($likeId, true);
    return 'Congrats, like deleted.';
  } else {
    die("You do not have permission to delete that.");
  }
}