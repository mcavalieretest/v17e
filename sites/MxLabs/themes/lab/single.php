<?php get_header(); ?>

	       <div id="ibm-access-cntr" role="main">
                <!-- <div id="ibm-leadspace-head" class="ibm-container ibm-ribbon"> -->
                <div id="ibm-leadspace-head" class="ibm-container"></div>
                <div id="ibm-pcon">
                    <!-- CONTENT_BEGIN -->
                    <div id="ibm-content">
                        <!-- CONTENT_BODY -->
                        <div id="ibm-content-body">
                            <section id="ibm-content-main">

								<?php if (have_posts()): while (have_posts()) : the_post(); ?>

								<!-- article -->
								<article id="post-<?php the_ID(); ?>" <?php post_class('ibm-columns'); ?>>
									<div class="ibm-col-1-1">	
									<!-- post title -->
									<h1>
										<!-- <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a> -->
										<?php the_title(); ?>
									</h1>
									<!-- /post title -->

									<!-- post details -->
									<h4 class="post-details">
										<?php echo get_avatar( get_the_author_email(), '128', '/images/no_images.jpg', get_the_author() ); ?>  By <span class="author"><?php the_author(); ?></span> on <span class="date"><?php the_time('F j, Y'); ?></span>
									</h4>
									<!-- /post details -->

									<!-- post thumbnail -->
									<?php if ( has_post_thumbnail()) : // Check if thumbnail exists ?>
										<!-- <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"> -->
											<?php the_post_thumbnail(array(940,529)); // Declare pixel size you need inside the array ?>
										<!-- </a> -->
									<?php endif; ?>
									<!-- /post thumbnail -->		

									<?php the_content(); ?>
									</div>
								</article>
								<!-- /article -->
								<?php endwhile; ?>

								<?php else: ?>

									<!-- article -->
									<article>

										<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

									</article>
									<!-- /article -->

								<?php endif; ?>

								</section>
                        </div>
                        <!-- CONTENT_BODY_END -->
                    </div>
                    <!-- CONTENT_END -->
                </div>
            </div>
<?php get_footer(); ?>
