<?php

add_action('rest_api_init', 'registerSearch');

function registerSearch() {
  register_rest_route('rest_route', 'search', array(
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'searchResults'
  ));
}

function searchResults($data) {
  $mainQuery = new WP_Query(array(
    'post_type' => array('post', 'resource', 'project'),
    's' => sanitize_text_field($data['term'])
  ));

  $results = array(
    'generalInfo' => array(),
    'resource' => array(),
    'project' => array(),
  );

  while($mainQuery->have_posts()) {
    $mainQuery->the_post();

    if (get_post_type() == 'post') {
      array_push($results['generalInfo'], array(
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
        'postType' => get_post_type(),
        'authorName' => get_the_author()
      ));
    }

    if (get_post_type() == 'resource') {
      array_push($results['resource'], array(
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
        'postType' => get_post_type(),
      ));
    }

    if (get_post_type() == 'project') {
      array_push($results['project'], array(
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
        'postType' => get_post_type(),
      ));
    }
  }

  return $results;
}