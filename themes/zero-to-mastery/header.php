<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png">
    <link rel="manifest" href="icons/manifest.json">
    <link rel="mask-icon" href="icons/safari-pinned-tab.svg" color="#fff">
	<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/icons/favicon.ico" />
    <meta name="msapplication-config" content="icons/browserconfig.xml">
    <meta name="theme-color" content="#222">
    <meta name="msapplication-navbutton-color" content="#222">
    <meta name="apple-mobile-web-app-status-bar-style" content="#222">
    <meta itemprop="url" content="http://zerotomastery.freeko.pl/">
    <meta name="description" content="Zero to Mastery">
    <meta name="dcterms.description" lang="eng" content="Zero to Mastery">
    <meta name="keywords" content="Zero to Mastery; udemy; course; bootcamp">
    <meta name="dcterms.subject" lang="eng" content="Zero to Mastery; udemy; course; bootcamp">
    <meta name="application-name" content="Zero to Mastery">
    <meta property="og:site_name" content="Zero to Mastery">
    <meta property="og:url" content="http://zerotomastery.freeko.pl/">
    <meta property="og:title" content="Zero to Mastery">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

	<div class="container">

		<div class="navigation" id="main-navigation-wrap">
			<nav class="navigation__nav" id="main-navigation" role="navigation">
				<a class="navigation__link navigation__link--no-border" href="<?php echo site_url(); ?>">
					<h1 class="navigation__site-title">Zero to Mastery</h1>
				</a>
				<div class="navigation__right-wrap">
					<?php
						// Display Main Navigation.
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'container' => false,
							'menu_class' => 'navigation__list navigation__list--main',
							'echo' => true,
							)
						);
					?>
					<button class="navigation__toggle-main" type="button" aria-label ="Toggle Menu" aria-controls="Main Menu" aria-expanded="false" title="Toggle Menu">
					<span class = "sr-only sr-target">Open</span>
					<span class = "sr-only">Menu</span>
						<i class="navigation__icon navigation__icon--menu fa fa-bars" aria-hidden="true"></i>
					</button>

					<a href="<?php echo esc_url(site_url('/search')); ?>" class="navigation__search-trigger js-search-trigger "
					role="button" aria-label="js search overlay popup" aria-controls ="search popup" title ="js search overlay popup">
						<i class="navigation__icon fa fa-search" aria-hidden="true"></i>
					</a>
					<a href="<?php echo wp_login_url(); ?>" class="navigation__login" aria-label="login" title ="login">
						<i class="navigation__icon fa fa-sign-in-alt"></i>
					</a>
				</div>
			</nav>

		</div>

		<?php
if (is_page( 'About' ) ):
  ?>
		<header class="header-main">
			<div class="header-main__text-box">
				<h1 class="header-main__heading">Zero to
					<br>
					<span class="header-main__span">Mastery</span>
				</h1>
				<p class="header-main__sub-heading">The best and most complete course in
					<br> UDEMY to become a web developer
					<br> today!</p>
				<a href="#" class="btn btn--red">Enroll Now!</a>
			</div>
		</header>
		<?php
elseif (is_post_type_archive('resource_category') || is_singular('resource_category') || is_singular('resource') ) :
  ?>
		<header class="header-resources">
			<img class="header-resources__image" src="<?php echo get_theme_file_uri('/images/vector.jpg') ?>" alt = "developer" title ="developer">
			<h1 class="header-resources__headline">Resources for Web Development</h1>

			<?php	if(is_post_type_archive('resource_category')):
	?>
			<div class="navigation navigation--sub" id="resources-navigation-wrap">
				<nav class="navigation__nav navigation__nav--sub" id="resources-navigation" role="navigation">
					<?php
						// Display Main Navigation.
						wp_nav_menu( array(
							'theme_location' => 'resources',
							'container' => false,
							'menu_class' => 'navigation__list navigation__list--sub',
							'echo' => true,
							)
						);
					?>
				</nav>
			</div>

			<?php elseif(is_singular('resource_category') || is_singular('resource')): ?>

			<div class="back-to-archive">
				<div class="back-to-archive__wrap">
					<a class="back-to-archive__link" href="<?php echo get_post_type_archive_link('resource_category'); ?>">
						<i class="back-to-archive__icon fa fa-arrow-left"></i>Back to Resources</a>
				</div>
			</div>
			<?php endif; ?>
		</header>

		<?php
elseif (is_home() || is_post_type_archive('post') || is_category( array('announcement', 'projects_status', 'resources', 'uncategorized') ) ||is_singular('post') ) :
?>

		<header class="header-blog">
			<img srcset="<?php echo get_theme_file_uri('/images/blogsmall.jpg') ?> 600w, 
		<?php echo get_theme_file_uri('/images/blogmedium.jpg') ?> 900w" sizes="(max-width: 900px) 100vw, (max-width: 600px) 100vw, 1280px"
			 alt="Blog" title = "Blog" class="header-blog__image" src="<?php echo get_theme_file_uri('/images/blog.jpg') ?>">
		</header>

		<div class="navigation navigation--sub" id="blog-navigation-wrap">
			<nav class="navigation__nav navigation__nav--sub" id="blog-navigation" role="navigation">
				<?php
						// Display Main Navigation.
						wp_nav_menu( array(
							'theme_location' => 'blog',
							'container' => false,
							'menu_class' => 'navigation__list navigation__list--sub',
							'echo' => true,
							)
						);
					?>
			</nav>
		</div>

		<?php endif; 