<?php

function zero_to_mastery_post_types() {

  register_post_type('review', array(
    'supports' => array('title', 'editor', 'page-attributes'),
    'rewrite' => array('slug' => 'Reviews'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Reviews',
      'add_new_item' => 'add Review',
      'edit_item' => 'edit Reviev',
      'all_items' => 'all Revievs',
      'singular_name' => 'Reviews'
    ),
    'menu_icon' => 'dashicons-welcome-write-blog',
    'taxonomies'  => array( 'category' )
  ));

  register_post_type('project', array(
    'supports' => array('title', 'editor'),
    'rewrite' => array('slug' => 'Projects'),
    'rewrite' => array('slug' => 'Projects'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Projects',
      'add_new_item' => 'add Project',
      'edit_item' => 'edit Project',
      'all_items' => 'all Projects',
      'singular_name' => 'Project'
    ),
    'menu_icon' => 'dashicons-welcome-learn-more'
  ));

  register_post_type('contributor', array(
    'supports' => array('title', 'thumbnail'),
    'rewrite' => array('slug' => 'Contributors'),
    'has_archive' => false,
    'public' => true,
    'labels' => array(
      'name' => 'Contributors',
      'add_new_item' => 'add Contributor',
      'edit_item' => 'edit Contributos',
      'all_items' => 'all Contributors',
      'singular_name' => 'Contributor'
    ),
    'menu_icon' => 'dashicons-admin-users'
  ));

  register_post_type('resource_category', array(
    'supports' => array('title', 'page-attributes'),
    'rewrite' => array('slug' => 'Resources Category'),
    'has_archive' => true,
    'public' => true,
    'labels' => array(
      'name' => 'Resources Category',
      'add_new_item' => 'add Resources Category',
      'edit_item' => 'edit Resources Category',
      'all_items' => 'all Resources Categories',
      'singular_name' => 'Resources Category'
    ),
    'menu_icon' => 'dashicons-admin-links'
  ));

  register_post_type('resource', array(
    'supports' => array('title', 'editor', 'page-attributes'),
    'rewrite' => array('slug' => 'Resources'),
    'has_archive' => false,
    'public' => true,
    'labels' => array(
      'name' => 'Resources',
      'add_new_item' => 'add Resource',
      'edit_item' => 'edit Resource',
      'all_items' => 'all Resources',
      'singular_name' => 'Resource'
    ),
    'menu_icon' => 'dashicons-admin-links',
    'taxonomies'  => array( 'category' )
  ));

  register_post_type('like', array(
    'supports' => array('title'),
    'public' => false,
    'show_ui' => true,
    'labels' => array(
      'name' => 'Likes',
      'add_new_item' => 'Add New Like',
      'edit_item' => 'Edit Like',
      'all_items' => 'All Likes',
      'singular_name' => 'Like'
    ),
    'menu_icon' => 'dashicons-heart'
  ));

}

add_action('init', 'zero_to_mastery_post_types');

?>