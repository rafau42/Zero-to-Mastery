<?php get_header();

  while(have_posts()) {
    the_post(); ?>
    
    <div class="search-page">
      <div class = "search-page__form-wrap">
      <?php get_search_form(); ?>
      </div>
    </div>

  <?php } 
  get_footer(); ?>