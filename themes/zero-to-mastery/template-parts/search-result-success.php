<div class="search-overlay__column">

    <?php searchHeadline(); ?>

  <ul class="search-overlay__list">

    <?php while(have_posts()) {
the_post();
?>
    <li class="search-overlay__item">
      <a class="search-overlay__link" href="<?php the_permalink(); ?>">
        <?php the_title(); ?>
      </a>
    </li>

    <?php } ?>

  </ul>
</div>