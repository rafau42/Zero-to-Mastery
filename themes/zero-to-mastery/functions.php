<?php
require get_theme_file_path('/inc/like-route.php');
require get_theme_file_path('/inc/search-route.php');

function zero_to_mastery_files() {
wp_enqueue_script('main-js', get_template_directory_uri() .'/js/scripts-bundled.js', array('jquery'), null, true);
wp_localize_script('main-js', 'data', array(
  'root_url' => get_site_url(),
  'nonce' => wp_create_nonce('wp_rest'),
));
  wp_enqueue_style('custom-google-fonts', 'https://fonts.googleapis.com/css?family=Titillium+Web');
  wp_enqueue_style('font awesome', 'https://use.fontawesome.com/releases/v5.5.0/css/all.css');
  wp_enqueue_style('css-main', get_stylesheet_uri());
}

add_action('wp_enqueue_scripts', 'zero_to_mastery_files');

function zero_to_mastery_features() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_image_size('projectSize', 600, 437, true);
  add_image_size('contributorAvatar', 40, 40, true);
  set_post_thumbnail_size(300, 200, true);
  register_nav_menu( 'primary', esc_html__( 'Main Navigation', 'zero_to_mastery' ) );
  register_nav_menu( 'resources', esc_html__( 'Resources Navigation', 'zero_to_mastery' ) );
  register_nav_menu( 'blog', esc_html__( 'Blog Navigation', 'zero_to_mastery' ) );
}

add_action('after_setup_theme', 'zero_to_mastery_features');

function atg_menu_classes($classes, $item, $args) {
  if($args->theme_location == 'primary' || $args->theme_location == 'resources' || $args->theme_location == 'blog') {
    $classes[] = 'navigation__item';
  }
  
  return $classes;
}
add_filter('nav_menu_css_class','atg_menu_classes',1,3);

function add_link_atts($atts) {
  $atts['class'] = "navigation__link";
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'add_link_atts');

function zero_to_mastery_adjust_queries($query) {

  if (!is_admin() AND is_post_type_archive('resource_category') AND $query->is_main_query()) {
    $query->set('posts_per_page', -1);
    $query->set('orderby', 'menu_order');
    $query->set('order', 'ASC');
  }
  if (!is_admin() AND is_post_type_archive('review') AND $query->is_main_query()) {
    $query->set('posts_per_page', -1);
    $query->set('category_name', 'reviews_column_one');
  }
}

add_action('pre_get_posts', 'zero_to_mastery_adjust_queries');

function searchHeadline($headline = NULL) {
  
  if (get_post_type() == 'post') {
    $headline = 'General Information';
  }

  if (get_post_type() == 'resource') {
    $headline = 'Resources';
  }

  if (get_post_type() == 'project') {
    $headline = 'Projects';
  } 
?>

<h2 class="search-overlay__section-title">
	<?php echo $headline; ?>
</h2>

<?php } 

function noResults($headline) { ?>

<div class="search-overlay__column">

	<h2 class="search-overlay__section-title">
		<?php echo $headline; ?>
	</h2>

	<span class = "search-overlay__span">No results.</span>
</div>

<?php } ?>
