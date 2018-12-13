<?php get_header();
while(have_posts()) {
    the_post();
 ?>

<section class="about row" id="about">
	<div class="about__column about__column--screen">
		<article class="about__video-container">
			<iframe src="https://www.youtube.com/embed/sCX_YMPuJGA" class="about__video" frameborder="0" allow="autoplay; encrypted-media"
			 allowfullscreen></iframe>
			<img src="<?php echo get_theme_file_uri('/images/screen.png') ?>" class="about__screen"
			 alt="">
		</article>
	</div>

	<article class="about__column about__column--text">
		<h1 class="about__heading"> Become a Web Developer
			<br>
			<span class="about__heading-span">
				Start Today!
			</span>
		</h1>
		<p class="about__paragraph">
			"The Complete Web Developer in 2018: Zero to Mastery" is a complete full-stack web development course, with the latest and
			most in-demand technologies, for anyone trying to learn web development in 2018. Learn to code with us, join the community
			and practice the skills you gained from the course, build up your portfolio by contributing to projects, and become a
			job ready web developer this year.
		</p>
	</article>
</section>

<?php
     $frontPageReviewsIds = get_posts(array(
        'fields'          => 'ids',
        'posts_per_page'  => 3,
        'post_type' => 'review',
        'category_name' => 'front_page_review'
    ));
				   ?>

<section class="section-reviews">

	<div class="section-reviews__column">
		<div class="section-reviews__review review">
			<blockquote class="review__blockquote">
				<p class="review__content">
					<?php echo get_post_field('post_content',  $frontPageReviewsIds[2]); ?>
				</p>
			</blockquote>
			<cite class="review__cite">
				<?php the_field('review_author',  $frontPageReviewsIds[2]) ?>
			</cite>
		</div>

		<div class="section-reviews__review review">
			<blockquote class="review__blockquote">
				<p class="review__content">
					<?php echo get_post_field('post_content',  $frontPageReviewsIds[1]); ?>
				</p>
			</blockquote>
			<cite class="review__cite">
				<?php the_field('review_author',  $frontPageReviewsIds[1]) ?>
			</cite>
		</div>
	</div>

	<div class="section-reviews__column">
		<div class="section-reviews__review review">
			<blockquote class="review__blockquote">
				<p class="review__content">
					<?php echo get_post_field('post_content',  $frontPageReviewsIds[0]); ?>
				</p>
			</blockquote>
			<cite class="review__cite">
				<?php the_field('review_author',  $frontPageReviewsIds[0]) ?>
			</cite>
		</div>
		<a href="<?php get_post_type_archive_link('review'); ?>" class="section-reviews__btn btn btn--red btn--review">More Reviews</a>
	</div>

</section>

<section class="section-discord">

	<header class="section-discord__header">
	</header>

	<article class="section-discord__row row">

		<div class="section-discord__column section-discord__column--text">
			<h1 class="section-discord__heading">Join Our
				<br>
				<span class="section-discord__heading-span">Discord Community!</span>
			</h1>
			<div class="section-discord__text-box">
				<p class="section-discord__paragraph">
					We have created a Discord server for all the students of The Complete Web Developer in 2018, where you can:
				</p>
				<ul class="section-discord__list">
					<li class="section-discord__item">Introduce yourself</li>
					<li class="section-discord__item">Ask the community questions </li>
					<li class="section-discord__item">Get help with exercises </li>
					<li class="section-discord__item">Meet other students around the world </li>
					<li class="section-discord__item">Learn how to answer questions </li>
					<li class="section-discord__item">Learn from each other</li>
				</ul>
				<p class="section-discord__paragraph">
					I am very excited about this but it will only work if everybody helps each other out. I know it isn't for everybody, but
					being able to ask questions and help others when they have questions is the best way to learn. The Q&amp;A section in
					the course will still be available and I will still answer every question. However, the Discord server should give you
					faster replies from the community.</p>
			</div>
			<div class="section-discord__btn-wrap">
			<button class="section-discord__btn btn btn--discord" type="button" aria-label="open popup" aria-controls="open popup" title ="open popup">
				<span class="sr-only">Open popup</span>
				Join Discord</button>
			</div>

		</div>

		<!-- popup inside for accessibility -->
		<article class="popup" id="popup">
			<div class="popup__content">
				<div class="popup__content-top">
					<h1 class="popup__heading">Installing Discord</h1>
					<button class="popup__close" type="button" aria-label="close popup" aria-controls="close popup" title="close popup">
					<span class="sr-only">Close popup</span>
						<i class="popup__icon fa fa-window-close" aria-hidden="true"></i>
					</button>
				</div>
				<div class="popup__content-bottom">
					<div class="popup__content-bottom--column">
						<ul class="popup__list">
							<li class="popup__list-item">
								<span class="popup__list-span--red">Step 1</span> - Head over to
								<a href="discordapp.com" class="popup__link">discordapp.com</a> and download the version for your OS.</li>
							<li class="popup__list-item">
								<span class="popup__list-span--blue">Step 2</span> - Run the download, either create a new account or login.</li>
							<li class="popup__list-item">
								<span class="popup__list-span--red">Step 3</span> - Select 'Join Server' and enter https:discord.io/zerotomastery</li>
						</ul>
					</div>
					<div class="popup__content-bottom--column">
						<img src="<?php echo get_theme_file_uri('/images/discordgif.gif') ?>" class="popup__gif"
						 alt="discord-animation">
					</div>
				</div>
			</div>
		</article>
		<!-- end of popup -->

		<div class="section-discord__column section-discord__column--discord-widget">
			<iframe class="section-discord__discord-widget embed-responsive-item" src="https://discordapp.com/widget?id=423464391791476747&theme=dark"
			 allowtransparency="true" frameborder="0"></iframe>
		</div>

	</article>
</section>

<section class="section-projects" id="projects">

	<header class="section-projects__header-projects header-projects">
		<h1 class="header-projects__heading heading">Become part of our
			<br>
			<span class="header-projects__heading-span">Open source Projects!</span>
		</h1>
		<div class="header-projects__wrap-image">
			<img src="<?php echo get_theme_file_uri('/images/contribute-open-source-community.png') ?>"
			 class="header-projects__image" alt="working-programmists">
		</div>
	</header>

	<div class="section-projects__projects-container">

		<?php
            $homepageProjects = new WP_Query(array(
              'posts_per_page' => -1,
              'post_type' => 'project',
            ));
  
            while($homepageProjects->have_posts()) {
			  $homepageProjects->the_post();
			  get_template_part('template-parts/content', 'project-front');
} ?>

	</div>

	<div class="progress">
		<h2 class="progress__heading">See the progress of our Projects</h2>
		<a href="<?php get_post_type_archive_link('project'); ?>" class="btn btn--red">Progress</a>
	</div>

</section>

<?php } get_footer(); 